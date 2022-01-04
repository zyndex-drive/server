import { Otps } from '@models';

import type { Error as MongoError } from 'mongoose';

/**
 * Verifies the OTP with the Database
 *
 * @param {string} userInput - OTP input of User
 * @param {string} userEmail - Email of the User
 * @returns {Promise<boolean>} - Promise Resolving to True/False
 */
export default function (
  userInput: string,
  userEmail: string,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    Otps.findOne({ user_email: userEmail })
      .then((otpDoc) => {
        if (otpDoc) {
          const otp = otpDoc.otp;
          if (userInput === otp) {
            Otps.updateOne({ _id: otpDoc._id }, { verified: true })
              .then(() => resolve(true))
              .catch((err: MongoError) => {
                reject(new Error(`${err.name}: ${err.message}`));
              });
          } else {
            reject(new Error("OTP Doesn't Match with the Records"));
          }
        } else {
          reject(new Error('No OTP Document found in the Database'));
        }
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
