// Models
import { Tokens, ServiceAccs } from '@models';

// Others
import { objectID } from '@plugins/misc';
import { encrypt } from '@plugins/crypto';
import { generateAccessToken } from '@plugins/google/handlers/sac/generate-token';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IToken, ITokenDoc, IServiceAccLeanDoc } from '@models/types';
import type {
  IGoogTokenResponse,
  TGoogleApiScope,
} from '@plugins/google/helpers/types';

/**
 * Saves the Access Token in the Database for Long Term Use
 *
 * @param {IServiceAccLeanDoc} account - Credentials Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @param {IGoogTokenResponse} accessToken - Access Token Response
 * @returns {Promise<ITokenDoc[]>} - Saved Token Documents
 */
function handleTokenSaving(
  account: IServiceAccLeanDoc,
  scopes: TGoogleApiScope[],
  accessToken: IGoogTokenResponse,
): Promise<ITokenDoc> {
  return new Promise<ITokenDoc>((resolve, reject) => {
    const now = Date.now();
    const uid = objectID('t');
    const tokenGen: IToken = {
      _id: uid,
      token: encrypt.str(accessToken.access_token),
      type: 'access',
      related_to: account._id,
      scopes,
      ref_model: 'ServiceAccount',
      expires_at: now + accessToken.expires_in * 1000,
      website: 'google.com',
    };
    Tokens.create(tokenGen)
      .then((tokenDoc) => {
        resolve(tokenDoc);
      })
      .catch((error: MongoError) => {
        reject(new Error(`${error.name}: ${error.message}`));
      });
  });
}

/**
 * Generate Oauth Token for a Google Service Account
 *
 * @param {string} account - Service Account ID from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Promise Resolving to Access Token
 */
export default function (
  account: string,
  scopes: TGoogleApiScope[],
): Promise<ITokenDoc> {
  return new Promise<ITokenDoc>((resolve, reject) => {
    ServiceAccs.findById(account)
      .lean()
      .exec()
      .then((serviceAccDoc) => {
        if (serviceAccDoc) {
          generateAccessToken(serviceAccDoc, scopes)
            .then((accessToken) =>
              handleTokenSaving(serviceAccDoc, scopes, accessToken),
            )
            .then(resolve)
            .catch((err: unknown) => {
              reject(new Error(String(err)));
            });
        } else {
          reject(new Error('Unable to Find Service Account in the Database'));
        }
      })
      .catch((error: MongoError) => {
        reject(new Error(`${error.name}: ${error.message}`));
      });
  });
}
