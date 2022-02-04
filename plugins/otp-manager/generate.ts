import { objectID, generateOTP } from '@plugins/misc';
import { Otps } from '@models';

import type { IOtpDoc, IPendingUserDoc, IUserDoc } from '@models/types';

/**
 * Generates a OTP and Saves it to Database for Future Verification
 *
 * @param {IUserDoc | IPendingUserDoc} user - User to whom Otp Should be Generated
 * @returns {Promise<IOtpDoc>} - Promise Resolving to OTP Document
 */
export default async function (
  user: IUserDoc | IPendingUserDoc,
): Promise<IOtpDoc> {
  const otpId = objectID();
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
  const otpDoc = await newOtp.save();
  return otpDoc;
}
