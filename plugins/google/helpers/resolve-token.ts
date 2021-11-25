// Models
import { Credentials, Tokens, ServiceAccs } from '@models';

// Others
import { generateAccessToken as generateNormalAccessToken } from '@plugins/google/handlers/nac/generate-token';
import { generateAccessToken as generateServiceAccessToken } from '@plugins/google/handlers/sac/generate-token';
import { objectID } from '@plugins/misc';

// Types
import type { TGoogleApiScope } from '@plugins/google/helpers/types';
import type { ICredentials, ICredentialsDoc } from '@models/credential/types';
import type { IToken, ITokenDoc } from '@models/tokens/types';
import type { IServiceAccDoc } from '@models/service-account/types';
import type { Error as MongoError } from 'mongoose';
import type {
  ITokenResolver,
  IGetAllTokens,
} from '@plugins/google/helpers/types';

/**
 * Fetches all the Data in the Database Related to a Credential ID
 *
 * @param { string } credentialID - Credential ID from the Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns { IGetAllTokens } - Data Related to Credential ID
 */
function getAllTokens(
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
): Promise<IGetAllTokens> {
  return new Promise<IGetAllTokens>((resolve, reject) => {
    const response: IGetAllTokens = {
      success: false,
    };
    Credentials.findById(credentialID)
      .then((credential) => {
        if (credential) {
          response.credential = credential;
          ServiceAccs.find({ related_to: credential._id })
            .then((serviceAccs) => {
              response.serviceAcc = serviceAccs;
              const serviceAccountIds = serviceAccs.map(
                (account) => account._id,
              );
              const tokenFindParam = [
                { related_to: credential._id, scopes },
                ...serviceAccountIds.map((id) => ({ related_to: id, scopes })),
              ];
              Tokens.find({
                $or: tokenFindParam,
              })
                .then((tokens) => {
                  if (tokens.length > 0) {
                    const normalAccessTokens = tokens.filter(
                      (token) =>
                        token.type === 'access' &&
                        token.ref_model === 'Credential',
                    );
                    const serviceAccessTokens = tokens.filter(
                      (token) =>
                        token.type === 'access' &&
                        token.ref_model === 'ServiceAccount',
                    );
                    const refreshTokens = tokens.filter(
                      (token) => token.type === 'refresh',
                    );
                    response.tokens = {
                      access: {
                        normal: normalAccessTokens,
                        service: serviceAccessTokens,
                      },
                      refresh: refreshTokens,
                    };
                    response.success = true;
                    resolve(response);
                  } else {
                    response.success = false;
                    resolve(response);
                  }
                })
                .catch((error: MongoError) => {
                  reject(new Error(`${error.name}: ${error.message}`));
                });
            })
            .catch((error: MongoError) => {
              reject(new Error(`${error.name}: ${error.message}`));
            });
        }
      })
      .catch((error: MongoError) => {
        reject(new Error(`${error.name}: ${error.message}`));
      });
  });
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
function deleteInvalidTokens(tokens: ITokenDoc[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const tokenDeleteParam = tokens.map((token) => token._id);
    Tokens.deleteMany({ _id: { $in: tokenDeleteParam } })
      .then(() => resolve())
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}

/**
 * Generates a Access Token for the Particular Credentials and Saves it to Database
 *
 * @param {ICredentialsDoc} credentials - Credentials from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @param {ITokenDoc} refreshToken - Refresh Token Document from Database
 * @returns {Promise<ITokenDoc>} - Generated Access Token
 */
function generateNormalTokenSave(
  credentials: ICredentialsDoc,
  scopes: TGoogleApiScope[],
  refreshToken: ITokenDoc,
): Promise<ITokenDoc> {
  return new Promise<ITokenDoc>((resolve, reject) => {
    generateNormalAccessToken(credentials, refreshToken.token)
      .then((response) => {
        const uid = objectID('t');
        const now = Date.now();
        const token: IToken = {
          _id: uid,
          token: response.access_token,
          type: 'access',
          related_to: credentials._id,
          scopes,
          ref_model: 'Credential',
          expires_at: now + response.expires_in * 1000,
          website: 'google.com',
        };
        Tokens.create(token)
          .then((savedToken) => {
            resolve(savedToken);
          })
          .catch((err: MongoError) => {
            reject(new Error(`${err.name}: ${err.message}`));
          });
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
}

/**
 * Generates a Access Token for Service Account and Saves it to Database
 *
 * @param {IServiceAccDoc} account - Service Account Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<ITokenDoc>} - Generated Access Token
 */
function generateServiceTokenSave(
  account: IServiceAccDoc,
  scopes: TGoogleApiScope[],
): Promise<ITokenDoc> {
  return new Promise<ITokenDoc>((resolve, reject) => {
    generateServiceAccessToken(account, scopes)
      .then((response) => {
        const uid = objectID('t');
        const now = Date.now();
        const token: IToken = {
          _id: uid,
          token: response.access_token,
          type: 'access',
          related_to: account._id,
          scopes,
          ref_model: 'ServiceAccount',
          expires_at: now + response.expires_in * 1000,
          website: 'google.com',
        };
        Tokens.create(token)
          .then((savedToken) => {
            resolve(savedToken);
          })
          .catch((err: MongoError) => {
            reject(new Error(`${err.name}: ${err.message}`));
          });
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
}

/**
 * Handles Access Token Generation for Service Account Accounts
 *
 * @param {IGetAllTokens} tokenData - Response from GetallTokens Function
 * @param {TGoogleApiScope} scopes - Google Oauth API Scopes
 * @returns {Promise<ITokenDoc | false>} - Access Token for Each Service Account
 */
function serviceAccountTokenHandler(
  tokenData: IGetAllTokens,
  scopes: TGoogleApiScope[],
): Promise<ITokenDoc[] | false> {
  return new Promise<ITokenDoc[] | false>((resolve, reject) => {
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
        deleteInvalidTokens(invalidTokens)
          .then(() => {
            if (validTokens.length > 0) {
              resolve(validTokens);
            } else {
              const tokenArray: ITokenDoc[] = [];
              serviceAcc.forEach((account) => {
                generateServiceTokenSave(account, scopes)
                  .then((serviceToken) => {
                    tokenArray.push(serviceToken);
                  })
                  .catch((err: MongoError) => {
                    reject(new Error(`${err.name}: ${err.message}`));
                  });
              });
              if (tokenArray.length > 1) {
                resolve(tokenArray);
              } else {
                resolve(false);
              }
            }
          })
          .catch((err: string) => {
            reject(new Error(err));
          });
      } else {
        const tokenArray: ITokenDoc[] = [];
        serviceAcc.forEach((account) => {
          generateServiceTokenSave(account, scopes)
            .then((serviceToken) => {
              tokenArray.push(serviceToken);
            })
            .catch((err: MongoError) => {
              reject(new Error(`${err.name}: ${err.message}`));
            });
        });
        if (tokenArray.length > 1) {
          resolve(tokenArray);
        } else {
          resolve(false);
        }
      }
    } else {
      resolve(false);
    }
  });
}

/**
 * Checks Validity of Access Tokens and Refreshes it
 *
 * @param { IGetAllTokens } tokenData - Response from GetallTokens Function
 * @param { TGoogleApiScope[] } scopes - Google Oauth API Scopes
 * @returns { IGetAllTokens } - Active Tokens
 */
function checkTokenRefreshit(
  tokenData: IGetAllTokens,
  scopes: TGoogleApiScope[],
): Promise<IGetAllTokens> {
  return new Promise<IGetAllTokens>((resolve, reject) => {
    const { success, credential, serviceAcc, tokens } = tokenData;
    if (success && credential && tokens) {
      const { access, refresh } = tokens;
      if (refresh.length > 0) {
        const response: IGetAllTokens = {
          success: false,
          credential,
          serviceAcc,
        };
        if (access.normal.length === 0) {
          generateNormalTokenSave(credential, scopes, refresh[0])
            .then((savedToken) => {
              response.success = false;
              response.tokens = {
                refresh,
                access: {
                  normal: [savedToken],
                },
              };
              resolve(response);
            })
            .catch((err: string) => {
              reject(new Error(err));
            });
        } else {
          const validityArray = checkValidity(access.normal);
          const validTokens = validityArray
            .filter((token) => token.validity)
            .map((token) => token.token);
          const invalidTokens = validityArray
            .filter((token) => !token.validity)
            .map((token) => token.token);
          deleteInvalidTokens(invalidTokens)
            .then(() => {
              response.success = true;
              if (validTokens.length > 0) {
                response.tokens = {
                  refresh,
                  access: {
                    normal: validTokens,
                  },
                };
                resolve(response);
              } else {
                generateNormalTokenSave(credential, scopes, refresh[0])
                  .then((savedToken) => {
                    response.tokens = {
                      refresh,
                      access: {
                        normal: [savedToken],
                      },
                    };
                    resolve(response);
                  })
                  .catch((err: string) => {
                    reject(new Error(err));
                  });
              }
            })
            .catch((err: MongoError) => {
              reject(new Error(`${err.name}: ${err.message}`));
            });
        }
      } else {
        const response: IGetAllTokens = {
          success: false,
        };
        resolve(response);
      }
    } else {
      const response: IGetAllTokens = {
        success: false,
      };
      resolve(response);
    }
  });
}

/**
 * Resolves a Access Token for the Respective Google Credential ID (Incl. Service Accounts)
 *
 * @param { string } credentialID - Credentials ID From Database
 * @param { TGoogleApiScope[] } scopes - Google OAuth API Scopes
 * @returns { Promise<ITokenResolver> } - Resolves a Token to use in Google API
 */
export default function (
  credentialID: ICredentials['_id'],
  scopes: TGoogleApiScope[],
): Promise<ITokenResolver> {
  return new Promise<ITokenResolver>((resolve, reject) => {
    getAllTokens(credentialID, scopes)
      .then((credentialData) => {
        checkTokenRefreshit(credentialData, scopes)
          .then((validTokens) => {
            if (validTokens.tokens) {
              serviceAccountTokenHandler(credentialData, scopes)
                .then((serviceTokens) => {
                  if (validTokens.tokens) {
                    if (serviceTokens) {
                      const response: ITokenResolver = {
                        success: true,
                        tokens: [
                          ...validTokens.tokens.access.normal,
                          ...serviceTokens,
                        ],
                      };
                      resolve(response);
                    } else {
                      const response: ITokenResolver = {
                        success: true,
                        tokens: validTokens.tokens.access.normal,
                      };
                      resolve(response);
                    }
                  } else {
                    reject(new Error('No Possible Tokens Found or Generated'));
                  }
                })
                .catch(() => {
                  reject(
                    new Error('Error While Fetching Service Account Tokens'),
                  );
                });
            } else {
              reject(new Error('No Tokens Found'));
            }
          })
          .catch((err: string) => {
            reject(new Error(err));
          });
      })
      .catch((err: string) => {
        reject(err);
      });
  });
}
