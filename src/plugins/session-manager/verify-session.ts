import { Sessions } from '@models';
import { verifyJWT } from '@plugins/json-web-token';

interface ISessionCheckResponse {
  exists: boolean;
  userid: string;
}

/**
 * Verifies the Session Document and also Verifies the JWT
 *
 * @param {string} sessionId - Session ID Received from Frontend
 * @param {string} sessionToken - Session Token Received from Frontend
 * @returns {Promise<boolean>} - Promise Resolving to True/False
 */
export default async function (
  sessionId: string,
  sessionToken: string,
): Promise<ISessionCheckResponse> {
  const sessionDoc = await Sessions.findById(sessionId).lean().exec();
  if (sessionDoc) {
    const { token_secret: savedToken } = sessionDoc;
    if (savedToken === sessionToken) {
      const decryptedResult = await verifyJWT(sessionToken);
      const payload = decryptedResult.payload;
      if (
        payload.user_id === String(sessionDoc.user_id) &&
        payload.frontend === String(sessionDoc.frontend)
      ) {
        return {
          userid: String(sessionDoc.user_id),
          exists: true,
        };
      } else {
        throw new Error('Payload is Wrong in the JWT');
      }
    } else {
      throw new Error(
        'Session Token not Matching with the Saved Token in Database',
      );
    }
  } else {
    throw new Error('Session Document not Found in the Database');
  }
}
