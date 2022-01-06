import { Sessions } from '@models';
import { verifyJWT } from '@plugins/json-web-token';

import type { Error as MongoError } from 'mongoose';

/**
 * Verifies the Session Document and also Verifies the JWT
 *
 * @param {string} sessionId - Session ID Received from Frontend
 * @param {string} sessionToken - Session Token Received from Frontend
 * @returns {Promise<boolean>} - Promise Resolving to True/False
 */
export default function (
  sessionId: string,
  sessionToken: string,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    Sessions.findById(sessionId)
      .then((sessionDoc) => {
        if (sessionDoc) {
          const { token_secret: savedToken } = sessionDoc;
          if (savedToken === sessionToken) {
            verifyJWT(sessionToken)
              .then((decryptedResult) => {
                const payload = decryptedResult.payload;
                if (
                  payload.user_id === String(sessionDoc.user_id) &&
                  payload.frontend === String(sessionDoc.frontend)
                ) {
                  resolve(true);
                } else {
                  reject(new Error('Payload is Wrong in the JWT'));
                }
              })
              .catch((err: string) => {
                reject(new Error(err));
              });
          } else {
            reject(
              new Error(
                'Session Token not Matching with the Saved Token in Database',
              ),
            );
          }
        } else {
          reject(new Error('Session Document not Found in the Database'));
        }
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
