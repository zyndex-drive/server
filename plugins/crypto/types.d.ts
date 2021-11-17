export interface ICryptoObjData<T> {
  data: T;
}

/**
 * Crypto - Encrypt Helpers
 */
export interface IEncryptFunction {
  /**
   * Encrypt a String using AES Algorithm
   *
   * @param {string} str - String to Encrypt
   * @returns {string} - Encrypted String
   */
  str: (str: string) => string;

  /**
   * Encrypts Data with AES Method
   *
   * @param {string | object} data - Data to be Encrypted
   * @returns { string } - Encrypted Data
   */
  obj: <T>(data: ICryptoObjData<T>) => string;
}

/**
 * Crypto - Decrypt Helpers
 */
export interface IDecryptFunction {
  /**
   * Decrypt String Encrypted with AES Algorithm
   *
   * @param {string} encryptedStr - Data to be Decrypted
   * @returns { string } - Decrypted String
   */
  str: (encryptedStr: string) => string;

  /**
   * Decrypt Object Encrypted with AES Algorithm
   *
   * @param {string} cryptText - Data to be Decrypted
   * @returns { string } - Decrypted Object
   */
  obj: <T>(cryptText: string) => ICryptoObjData<T>;
}
