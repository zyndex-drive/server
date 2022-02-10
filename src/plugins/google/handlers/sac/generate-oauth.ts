// Models
import { Tokens, ServiceAccs } from '@models';

// Others
import { objectID } from '@plugins/misc';
import { encrypt } from '@plugins/crypto';
import { generateAccessToken } from '@plugins/google/handlers/sac/generate-token';

// Types
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
async function handleTokenSaving(
  account: IServiceAccLeanDoc,
  scopes: TGoogleApiScope[],
  accessToken: IGoogTokenResponse,
): Promise<ITokenDoc> {
  const now = Date.now();
  const uid = objectID();
  const encryptedToken = encrypt.aes.str(accessToken.access_token);
  const tokenGen: IToken = {
    _id: uid,
    token: encryptedToken,
    type: 'access',
    related_to: account._id,
    scopes,
    ref_model: 'ServiceAccount',
    expires_at: now + accessToken.expires_in * 1000,
    website: 'google.com',
  };
  const tokenDoc = await Tokens.create(tokenGen);
  return tokenDoc;
}

/**
 * Generate Oauth Token for a Google Service Account
 *
 * @param {string} account - Service Account ID from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Promise Resolving to Access Token
 */
export default async function (
  account: string,
  scopes: TGoogleApiScope[],
): Promise<ITokenDoc> {
  const serviceAccDoc = await ServiceAccs.findById(account).exec();
  if (serviceAccDoc) {
    const leanServiceAccDoc = serviceAccDoc.toObject();
    const accessToken = await generateAccessToken(leanServiceAccDoc, scopes);
    const tokenDoc = await handleTokenSaving(
      leanServiceAccDoc,
      scopes,
      accessToken,
    );
    return tokenDoc;
  } else {
    throw new Error('Unable to Find Service Account in the Database');
  }
}
