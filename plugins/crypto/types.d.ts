export interface ICryptoObjData<T> {
  data: T;
}

/**
 * Crypto - Encrypt Helpers
 */
export interface IEncryptFunction {
  aes: {
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
     * @returns {string} - Encrypted Data
     */
    obj: <T>(data: ICryptoObjData<T>) => string;
  };
  rsa: {
    /**
     * Encrypt a String using RSA Algorithm
     *
     * @param {string} str - String to Encrypt
     * @returns {Promise<string>} - Encrypted String
     */
    str: (str: string) => Promise<string>;

    /**
     * Encrypts Data with RSA Method
     *
     * @param {string | object} data - Data to be Encrypted
     * @returns {Promise<string>} - Encrypted Data
     */
    obj: <T>(data: ICryptoObjData<T>) => Promise<string>;
  };
}

/**
 * Crypto - Decrypt Helpers
 */
export interface IDecryptFunction {
  aes: {
    /**
     * Decrypt String Encrypted with AES Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Promise<string>} - Decrypted String
     */
    str: (encryptedStr: string) => string;

    /**
     * Decrypt Object Encrypted with AES Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Object} - Decrypted Object
     */
    obj: <T>(encryptedStr: string) => T;
  };
  rsa: {
    /**
     * Decrypt String Encrypted with RSA Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Promise<string>} - Decrypted String
     */
    str: (encryptedStr: string) => Promise<string>;

    /**
     * Decrypt Object Encrypted with RSA Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Promise<Object>} - Decrypted Object
     */
    obj: <T>(encryptedStr: string) => Promise<T>;
  };
}
