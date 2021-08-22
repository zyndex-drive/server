import { customAlphabet } from 'nanoid';
import { Types } from 'mongoose';

const ALPHANUMS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SYMBOLS = '&%^()!@#$*<>?/][}{<>,.|:;';
const CUSTOM_ALPHA = `${ALPHANUMS}${SYMBOLS}`;

const LONG_LENGTH = 10;
const SHORT_LENGTH = 8;

const longid = customAlphabet(CUSTOM_ALPHA, LONG_LENGTH);
const shortid = customAlphabet(ALPHANUMS, SHORT_LENGTH);

/**
 * Generates a Long Unique ID with the Given Hash Algorithm
 *
 * @param {string} prefix - Prefix to be Added before the UID
 * @returns {string} uid - Long UID
 */
function longID(prefix?: string): string {
  const prefixCheck = prefix ? (prefix.length > 1 ? false : true) : true;
  if (prefixCheck) {
    try {
      const id = longid();
      const pre = prefix ? `${prefix}@` : '';
      const uid = `${pre}${id}`;
      return uid;
    } catch {
      throw new Error('Unable to Generate UID');
    }
  } else {
    throw new Error('Prefix Cant be more than one Character');
  }
}

export default longID;

/**
 * Generates a Mongo Reference ID
 *
 * @param {string} prefix - prefix to be attached
 * @returns {Types.ObjectId} - Mongo Object ID
 */
export function objectID(prefix?: string): Types.ObjectId {
  try {
    const id = Types.ObjectId(longID(prefix));
    return id;
  } catch (e) {
    throw new Error(e);
  }
}

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
