import bcrypt from 'bcrypt';

import type { IUserDoc } from './types';

/**
 * Verifies the Given Password with that of the Document
 *
 * @async
 * @param {IUserDoc} this - Current User Document
 * @param {string} password - Password Entered by the User
 * @returns {Promise<boolean>} - Password Matches or not
 */
export async function verifyPassword(
  this: IUserDoc,
  password: string,
): Promise<boolean> {
  if (this.password) {
    const docPassword = this.password;
    const verifyBool = await bcrypt.compare(password, docPassword);
    return verifyBool;
  } else {
    throw new Error(
      'Password Not found in the Database, Use Oauth Methods to Log in',
    );
  }
}
