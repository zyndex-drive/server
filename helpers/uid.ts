import { customAlphabet } from 'nanoid';
import md5 from 'md5';
import sha1 from 'sha1';

const ALPHANUMS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SYMBOLS = '&%^()!@#$*<>?/][}{<>,.|:;';
const CUSTOM_ALPHA = `${ALPHANUMS}${SYMBOLS}`;

const LONG_LENGTH = 20;
const SHORT_LENGTH = 10;

const longid = customAlphabet(CUSTOM_ALPHA, LONG_LENGTH);
const shortid = customAlphabet(ALPHANUMS, SHORT_LENGTH);

/**
 * Generates a Long Unique ID with the Given Hash Algorithm
 *
 * @param {string} seeder - String to be Hashed along with ID
 * @param {string} algo - Hash Algorithm to be Used (Accepts md5 or sha1 only). Defaults to md5
 * @param {string} prefix - Prefix to be Added before the UID
 * @returns {string} uid - Long UID
 */
export default (
  seeder: string,
  algo?: string,
  prefix?: string,
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    try {
      const id = longid();
      const timeStamp = Date.now();
      const pre = prefix ? `${prefix}@` : '';
      let hash: string;
      if (algo && algo === 'sha1') {
        hash = sha1(`${seeder}-${timeStamp}-${id}`);
      } else {
        hash = md5(`${seeder}-${timeStamp}-${id}`);
      }
      const uid = `${pre}${hash}`;
      resolve(uid);
    } catch {
      reject(new Error('Unable to Generate UID'));
    }
  });

/**
 * Generates a Short Unique ID
 *
 * @param {string} prefix - Prefix to be Added before the UID
 * @returns {string} uid - Short UID
 */
export function shortuid(prefix?: string): string {
  const id = shortid();
  const pre = prefix ? `${prefix}@` : '';
  const uid = `${pre}${id}`;
  return uid;
}
