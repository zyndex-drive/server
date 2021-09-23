// Models
import { Credentials, Tokens, ServiceAccs } from '@models';

// Others
import { generateAccessToken } from '../generate-token';
import { objectID } from '@/helpers/uid';

// Types
import type { TGooGScope } from '../types';
import type { ICredentials, ICredentialsDoc } from '@models/credential/types';
import type { IToken, ITokenDoc } from '@models/tokens/types';
// import type { IServiceAccDoc } from '@models/service-account/types';
import type { Error as MongoError } from 'mongoose';
import type { ITokenResolver, IGetAllTokens } from './types';

/**
 * Fetches all the Data in the Database Related to a Credential ID
 *
 * @param { string } credentialID - Credential ID from the Database
 * @returns { IGetAllTokens } - Data Related to Credential ID
 */
function getAllTokens(
  credentialID: ICredentials['_id'],
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
              const tokenFindParam = [
                { related_to: credential._id },
                ...serviceAccs.map((account) => ({ related_to: account._id })),
              ];
              Tokens.find({
                $or: tokenFindParam,
              })
                .then((tokens) => {
                  if (tokens.length > 0) {
                    const accessTokens = tokens.filter(
                      (token) => token.type === 'access',
                    );
                    const refreshTokens = tokens.filter(
                      (token) => token.type === 'refresh',
                    );
                    response.tokens = {
                      access: accessTokens,
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
    /** To be in Advance, Checking all Tokens which are Expiring within 15 minutes */
    const currentTime = Date.now() + 15 * 60 * 1000;
    const tokenTime = token.expires_at;
    const response: { token: ITokenDoc; validity: boolean } = {
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
 * Generates a Access Token for the Particular Credentials and Saves it Database
 *
 * @param {ICredentialsDoc} credentials - Credentials from Database
 * @param {TGooGScope[]} scopes - Google Oauth API Scopes
 * @param {ITokenDoc} refreshToken - Refresh Token Document from Database
 * @returns {Promise<ITokenDoc>} - Generated Access Token
 */
function generateTokenSave(
  credentials: ICredentialsDoc,
  scopes: TGooGScope[],
  refreshToken: ITokenDoc,
): Promise<ITokenDoc> {
  return new Promise<ITokenDoc>((resolve, reject) => {
    generateAccessToken(credentials, refreshToken.token)
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
        Tokens.createDoc(token)
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

// interface IServiceAccountTokenHandler {
//   serviceAcc: IServiceAccDoc;
//   token: ITokenDoc;
// }

// function serviceAccountTokenHandler(serviceAccs: IServiceAccDoc[]): IServiceAccountTokenHandler[] {

// }

/**
 * Checks Validity of Access Tokens and Refreshes it
 *
 * @param { IGetAllTokens } tokenData - Response from GetallTokens Function
 * @param { TGooGScope[] } scopes - Google Oauth API Scopes
 * @returns { IGetAllTokens } - Active Tokens
 */
function checkTokenRefreshit(
  tokenData: IGetAllTokens,
  scopes: TGooGScope[],
): Promise<IGetAllTokens> {
  return new Promise<IGetAllTokens>((resolve, reject) => {
    const { success, credential, tokens } = tokenData;
    if (success && credential && tokens) {
      const { access, refresh } = tokens;
      if (refresh.length > 0) {
        const response: IGetAllTokens = {
          success: false,
          credential,
        };
        if (access.length === 0) {
          generateTokenSave(credential, scopes, refresh[0])
            .then((savedToken) => {
              response.success = false;
              response.tokens = {
                refresh,
                access: [savedToken],
              };
              resolve(response);
            })
            .catch((err: string) => {
              reject(new Error(err));
            });
        } else {
          const validityArray = checkValidity(access);
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
                  access: validTokens,
                };
                resolve(response);
              } else {
                generateTokenSave(credential, scopes, refresh[0])
                  .then((savedToken) => {
                    response.tokens = {
                      refresh,
                      access: [savedToken],
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
 * Resolves a Access Token for the Respective Google Credential ID
 *
 * @param { string } credentialID - Credentials ID From Database
 * @param { TGooGScope[] } scopes - Google OAuth API Scopes
 * @returns { Promise<ITokenResolver> } - Resolves a Token to use in Google API
 */
export default function (
  credentialID: ICredentials['_id'],
  scopes: TGooGScope[],
): Promise<ITokenResolver> {
  return new Promise<ITokenResolver>((resolve, reject) => {
    getAllTokens(credentialID)
      .then((credentialData) => {
        checkTokenRefreshit(credentialData, scopes)
          .then((validTokens) => {
            if (validTokens.tokens) {
              const response: ITokenResolver = {
                success: true,
                tokens: validTokens.tokens.access,
              };
              resolve(response);
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
