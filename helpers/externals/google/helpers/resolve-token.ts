// Models
import { Credentials, Tokens, ServiceAccs } from '@models';

// Types
import type { ICredentials } from '@models/credential/types';
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
                    response.tokens = tokens;
                    resolve(response);
                  } else {
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

/**
 * Resolves a Access Token for the Respective Google Credential ID
 *
 * @param { string } credentialID - Credentials ID From Database
//  * @param { boolean } err - Whether the use of token ends in Error (for recursive calls)
//  * @param { ITokenResolver } oldResponse - if error, Pass the Old Response from this function
 * @returns { Promise<ITokenResolver> } - Resolves a Token to use in Google API
 */
export default function (
  credentialID: ICredentials['_id'],
  // err?: boolean,
  // oldResponse?: ITokenResolver,
): Promise<ITokenResolver> {
  return new Promise<ITokenResolver>((resolve, reject) => {
    getAllTokens(credentialID)
      .then((credentialData) => {
        const response: ITokenResolver = {
          success: true,
          token: credentialData.tokens && credentialData.tokens[0],
          index: 0,
          available: true,
          cred_data: credentialData,
        };
        resolve(response);
      })
      .catch((err: string) => {
        reject(err);
      });
  });
}
