/** Google OAUTH APIS */
export default {
  /** Authorization API */
  authorize: 'https://accounts.google.com/o/oauth2/v2/auth',

  /** Refresh/Access Token Generation API */
  generateToken: 'https://oauth2.googleapis.com/token',

  /** Token Validity Checker API */
  checkToken: 'https://oauth2.googleapis.com/tokeninfo',

  /** Token Revoke API */
  revokeToken: 'https://oauth2.googleapis.com/revoke',
};
