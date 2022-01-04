export { default as encrypt } from './encrypt';
export { default as decrypt } from './decrypt';

import Encrypt from './encrypt';
import Decrypt from './decrypt';

export default {
  encrypt: Encrypt,
  decrypt: Decrypt,
};
