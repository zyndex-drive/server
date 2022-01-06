import { objectID, generateOTP } from '@plugins/misc';
import { Otps } from '@models';

import type { Error as MongoError } from 'mongoose';
import type { IUserDoc } from '@models/user/types';
import type { IPendingUserDoc } from '@models/pending-user/types';
import type { IOtpDoc } from '@models/otp/types';

/**
 * Generates a OTP and Saves it to Database for Future Verification
 *
 * @param {IUserDoc | IPendingUserDoc} user - User to whom Otp Should be Generated
 * @returns {Promise<IOtpDoc>} - Promise Resolving to OTP Document
 */
export default function (user: IUserDoc | IPendingUserDoc): Promise<IOtpDoc> {
  return new Promise<IOtpDoc>((resolve, reject) => {
    const otpId = objectID('o');
    const grantTime = Date.now();
    const expiryTime = grantTime + 15 * 60 * 1000;
    const otp = generateOTP();
    const newOtp = new Otps({
      _id: otpId,
      user_id: user._id,
      user_email: user.email,
      verified: false,
      otp,
      issued_at: grantTime,
      expires_at: expiryTime,
    });
    newOtp
      .save()
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}