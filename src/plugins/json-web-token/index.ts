import GenerateKeys from './generate-keys';
import GenerateJWT from './generate-token';
import VerifyJWT from './verify';

export const generateKeys = GenerateKeys;
export const generateJWT = GenerateJWT;
export const verifyJWT = VerifyJWT;

export default {
  generateKeys: GenerateKeys,
  generateJWT: GenerateJWT,
  verifyJWT: VerifyJWT,
};
