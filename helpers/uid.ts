import { customAlphabet } from 'nanoid';
import md5 from 'md5';
import sha1 from 'sha1';

const CUSTOM_ALPHA =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&%^()!@#$*<>?/][}{<>,.|:;';

const LENGTH = 20;

const nanoid = customAlphabet(CUSTOM_ALPHA, LENGTH);

export default (
  seeder: string,
  algo?: string,
  prefix?: string,
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    try {
      const id = nanoid();
      const timeStamp = Date.now();
      const pre = prefix ? `${prefix}` : '';
      let hash: string;
      if (algo && algo === 'sha1') {
        hash = sha1(`${seeder}-${timeStamp}-${id}`);
      } else {
        hash = md5(`${seeder}-${timeStamp}-${id}`);
      }
      const uid = `${pre}@${hash}`;
      resolve(uid);
    } catch {
      reject(new Error('Unable to Generate UID'));
    }
  });
