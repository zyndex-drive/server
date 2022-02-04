// Models
import { Credentials, Tokens, ServiceAccs } from '@models';

// Others
import { generateAccessToken as generateNormalAccessToken } from '@plugins/google/handlers/nac/generate-token';
import { generateAccessToken as generateServiceAccessToken } from '@plugins/google/handlers/sac/generate-token';
import { objectID } from '@plugins/misc';

// Types
import type { TGoogleApiScope } from '@plugins/google/helpers/types';
import type {
  ICredentials,
  ICredentialsDoc,
  ITokenDoc,
  IServiceAccDoc,
} from '@models/types';
import type { Error as MongoError } from 'mongoose';
import type {
  ITokenResolverDetailed,
  ITokenResolverSimple,
  IGetAllTokens,
} from '@plugins/google/helpers/types';

/**
 * Fetches all the Data in the Database Related to a Credential ID
 *
 * @param {string} credentialID - Credential ID from the Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGetAllTokens>} - Data Related to Credential ID
 */
async function getAllTokens(
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
): Promise<IGetAllTokens> {
  const credential = await Credentials.findById(credentialID);
  if (credential) {
    const response: IGetAllTokens = { credential };
    const serviceAccs = await ServiceAccs.find({
      related_to: credential._id,
    }).exec();
    response.serviceAcc = serviceAccs;
    const serviceAccountIds = serviceAccs.map((account) => account._id);
    const tokenFindParam = {
      $or: [
        { related_to: credential._id, scopes },
        ...serviceAccountIds.map((id) => ({ related_to: id, scopes })),
      ],
    };
    const tokens = await Tokens.find(tokenFindParam).exec();
    if (tokens.length > 0) {
      const normalAccessTokens = tokens.filter(
        (token) => token.type === 'access' && token.ref_model === 'Credential',
      );
      const serviceAccessTokens = tokens.filter(
        (token) =>
          token.type === 'access' && token.ref_model === 'ServiceAccount',
      );
      const refreshTokens = tokens.filter((token) => token.type === 'refresh');
      response.tokens = {
        access: {
          normal: normalAccessTokens,
          service: serviceAccessTokens,
        },
        refresh: refreshTokens,
      };
      return response;
    } else {
      throw new Error('Refresh Tokens not Found in the Database !');
    }
  } else {
    throw new Error('Credentials ID Not Found in the Database');
  }
}

interface IValidityCheck {
  token: ITokenDoc;
  validity: boolean;
}

/**
 * Checks Validity of Tokens
 *
 * @param {ITokenDoc[]} tokens - Array of Token Documents from Database
 * @returns {IValidityCheck} - tokens Array with Validity
 */
function checkValidity(tokens: ITokenDoc[]): IValidityCheck[] {
  const validityArray = tokens.map((token) => {
    /** To be future proof, Checking all Tokens which are Expiring within 15 minutes */
    const currentTime = Date.now() + 15 * 60 * 1000;
    const tokenTime = token.expires_at;
    const response: IValidityCheck = {
      token,
      validity: false,
    };
    if (tokenTime > currentTime) {
      response.validity = true;
    }
    return response;
  });
  return validityArray;
}

/**
 * Deletes Tokens from Database
 *
 * @param {ITokenDoc[]} tokens - Array of Token Documents from Database
 */
async function deleteInvalidTokens(tokens: ITokenDoc[]): Promise<void> {
  const tokenDeleteParam = tokens.map((token) => token._id);
  await Tokens.deleteMany({ _id: { $in: tokenDeleteParam } });
}

/**
 * Generates a Access Token for the Particular Credentials and Saves it to Database
 *
 * @async
 * @param {ICredentialsDoc} credentials - Credentials from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @param {ITokenDoc} refreshToken - Refresh Token Document from Database
 * @returns {Promise<ITokenDoc>} - Generated Access Token
 */
async function generateNormalTokenSave(
  credentials: ICredentialsDoc,
  scopes: TGoogleApiScope[],
  refreshToken: ITokenDoc,
): Promise<ITokenDoc> {
  const response = await generateNormalAccessToken(
    credentials,
    refreshToken.token,
  );
  const [uid, now] = [objectID(), Date.now()];
  const token = {
    _id: uid,
    token: response.access_token,
    type: 'access',
    related_to: credentials._id,
    scopes,
    ref_model: 'Credential',
    expires_at: now + response.expires_in * 1000,
    website: 'google.com',
  };
  const tokenDoc = await Tokens.create(token);
  return tokenDoc;
}

/**
 * Generates a Access Token for Service Account and Saves it to Database
 *
 * @async
 * @param {IServiceAccDoc} account - Service Account Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<ITokenDoc>} - Generated Access Token
 */
async function generateServiceTokenSave(
  account: IServiceAccDoc,
  scopes: TGoogleApiScope[],
): Promise<ITokenDoc> {
  const response = await generateServiceAccessToken(account, scopes);
  const [uid, now] = [objectID(), Date.now()];
  const token = {
    _id: uid,
    token: response.access_token,
    type: 'access',
    related_to: account._id,
    scopes,
    ref_model: 'ServiceAccount',
    expires_at: now + response.expires_in * 1000,
    website: 'google.com',
  };
  const tokenDoc = await Tokens.create(token);
  return tokenDoc;
}

/**
 * Handles Access Token Generation for Service Account Accounts
 *
 * @param {IGetAllTokens} tokenData - Response from GetallTokens Function
 * @param {TGoogleApiScope} scopes - Google Oauth API Scopes
 * @returns {Promise<ITokenDoc | false>} - Access Token for Each Service Account
 */
async function serviceAccountTokenHandler(
  tokenData: IGetAllTokens,
  scopes: TGoogleApiScope[],
): Promise<ITokenDoc[] | false> {
  const { serviceAcc } = tokenData;
  if (serviceAcc) {
    const { tokens } = tokenData;
    if (tokens && tokens.access.service) {
      const validityArray = checkValidity(tokens.access.service);
      const validTokens = validityArray
        .filter((token) => token.validity)
        .map((token) => token.token);
      const invalidTokens = validityArray
        .filter((token) => !token.validity)
        .map((token) => token.token);
      await deleteInvalidTokens(invalidTokens);
      if (validTokens.length > 0) {
        return validTokens;
      } else {
        const tokenArray: ITokenDoc[] = [];
        const promises = serviceAcc.map(
          (account) =>
            new Promise<void>((resolve, reject) => {
              generateServiceTokenSave(account, scopes)
                .then((serviceToken) => {
                  tokenArray.push(serviceToken);
                  resolve();
                })
                .catch((err: MongoError) => {
                  reject(new Error(`${err.name}: ${err.message}`));
                });
            }),
        );
        await Promise.all(promises);
        if (tokenArray.length > 1) {
          return tokenArray;
        } else {
          return false;
        }
      }
    } else {
      const tokenArray: ITokenDoc[] = [];
      const promises = serviceAcc.map(
        (account) =>
          new Promise<void>((resolve, reject) => {
            generateServiceTokenSave(account, scopes)
              .then((serviceToken) => {
                tokenArray.push(serviceToken);
                resolve();
              })
              .catch((err: MongoError) => {
                reject(new Error(`${err.name}: ${err.message}`));
              });
          }),
      );
      await Promise.all(promises);
      if (tokenArray.length > 1) {
        return tokenArray;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

/**
 * Checks Validity of Access Tokens and Refreshes it
 *
 * @param {IGetAllTokens} tokenData - Response from GetallTokens Function
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {IGetAllTokens} - Active Tokens
 */
async function checkTokenRefreshit(
  tokenData: IGetAllTokens,
  scopes: TGoogleApiScope[],
): Promise<IGetAllTokens> {
  const { credential, serviceAcc, tokens } = tokenData;
  if (credential && tokens) {
    const { access, refresh } = tokens;
    if (refresh.length > 0) {
      const response: IGetAllTokens = {
        credential,
        serviceAcc,
      };
      if (access.normal.length === 0) {
        const savedToken = await generateNormalTokenSave(
          credential,
          scopes,
          refresh[0],
        );
        response.tokens = {
          refresh,
          access: {
            normal: [savedToken],
          },
        };
        return response;
      } else {
        const validityArray = checkValidity(access.normal);
        const validTokens = validityArray
          .filter((token) => token.validity)
          .map((token) => token.token);
        const invalidTokens = validityArray
          .filter((token) => !token.validity)
          .map((token) => token.token);
        await deleteInvalidTokens(invalidTokens);
        if (validTokens.length > 0) {
          response.tokens = {
            refresh,
            access: {
              normal: validTokens,
            },
          };
          return response;
        } else {
          const savedToken = await generateNormalTokenSave(
            credential,
            scopes,
            refresh[0],
          );
          response.tokens = {
            refresh,
            access: {
              normal: [savedToken],
            },
          };
          return response;
        }
      }
    } else {
      throw new Error('Refresh Tokens not Found in the Database !');
    }
  } else {
    throw new Error('Cannot find Credentials and Tokens in the Database');
  }
}

async function resolveTokens(
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
): Promise<ITokenResolverSimple>;
async function resolveTokens(
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
  detailed: false,
): Promise<ITokenResolverSimple>;
async function resolveTokens(
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
  detailed: true,
): Promise<ITokenResolverDetailed>;
/**
 * Resolves a Access Token for the Respective Google Credential ID (Incl. Service Accounts)
 *
 * @async
 * @param {string} credentialID - Credentials ID From Database
 * @param {TGoogleApiScope[]} scopes - Google OAuth API Scopes
 * @param {boolean} detailed - Whether you Require the Return Object to be Detailed
 * @returns {Promise<ITokenResolverDetailed | ITokenResolverSimple>} - Resolves a Token to use in Google API
 */
async function resolveTokens(
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
  detailed?: boolean,
): Promise<ITokenResolverDetailed | ITokenResolverSimple> {
  const credentialData = await getAllTokens(credentialID, scopes);
  const [validTokens, serviceTokens] = await Promise.all([
    checkTokenRefreshit(credentialData, scopes),
    serviceAccountTokenHandler(credentialData, scopes),
  ]);
  if (validTokens.tokens) {
    if (serviceTokens) {
      if (detailed) {
        const response: ITokenResolverDetailed = {
          credentials: validTokens.credential,
          tokens: {
            refresh: validTokens.tokens.refresh,
            access: [...validTokens.tokens.access.normal, ...serviceTokens],
          },
          service_account: validTokens.serviceAcc,
        };
        return response;
      } else {
        const response: ITokenResolverSimple = {
          credentials: validTokens.credential,
          tokens: [...validTokens.tokens.access.normal, ...serviceTokens],
        };
        return response;
      }
    } else {
      if (detailed) {
        const response: ITokenResolverDetailed = {
          credentials: validTokens.credential,
          tokens: {
            refresh: validTokens.tokens.refresh,
            access: validTokens.tokens.access.normal,
          },
          service_account: validTokens.serviceAcc,
        };
        return response;
      } else {
        const response: ITokenResolverSimple = {
          credentials: validTokens.credential,
          tokens: validTokens.tokens.access.normal,
        };
        return response;
      }
    }
  } else {
    throw new Error('No Tokens Found');
  }
}

export default resolveTokens;
