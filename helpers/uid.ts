import { customAlphabet } from 'nanoid';
import md5 from 'md5';

const CUSTOM_ALPHA =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&%^()!@#$*<>?/][}{<>,.|:;';

const LENGTH = 20;

const nanoid = customAlphabet(CUSTOM_ALPHA, LENGTH);

export default (seeder: string, prefix?: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    try {
      const id = nanoid();
      const timeStamp = Date.now();
      const pre = prefix ? `${prefix}` : '';
      const hash = md5(`${seeder}-${timeStamp}-${id}`);
      const uid = `${pre}@${hash}`;
      resolve(uid);
    } catch {
      reject(new Error('Unable to Generate UID'));
    }
  });
