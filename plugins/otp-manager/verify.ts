import { Otps } from '@models';

/**
 * Verifies the OTP with the Database
 *
 * @param {string} userInput - OTP input of User
 * @param {string} userEmail - Email of the User
 * @returns {Promise<boolean>} - Promise Resolving to True/False
 */
export default async function (
  userInput: string,
  userEmail: string,
): Promise<boolean> {
  const otpDoc = await Otps.findOne({ user_email: userEmail }).lean().exec();
  if (otpDoc) {
    const otp = otpDoc.otp;
    if (userInput === otp) {
      await Otps.updateOne({ _id: otpDoc._id }, { verified: true });
      return true;
    } else {
      throw new Error("OTP Doesn't Match with the Records");
    }
  } else {
    throw new Error('No OTP Document found in the Database');
  }
}
