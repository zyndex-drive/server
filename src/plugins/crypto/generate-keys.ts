import { randomBytes } from 'crypto';

interface IRandomKeys {
  iv: string;
  secret: string;
}

/**
 * Generates a Random IV and Secret
 *
 * @returns {Object} - Contains iv and secret key
 */
export default function (): IRandomKeys {
  const iv = randomBytes(16);
  const secret = randomBytes(32);
  return {
    iv: iv.toString('hex'),
    secret: secret.toString('hex'),
  };
}
