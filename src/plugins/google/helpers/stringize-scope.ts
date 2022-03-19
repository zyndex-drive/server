import type { TGoogleApiScope } from '@plugins/google/helpers/types';

/**
 * Converts the Array of Scopes to a Scope Parameter
 *
 * @param {TGoogleApiScope} scopes - Array of Google API Scopes
 * @returns {string} - Space Delimited Scopes
 */
export default function (scopes: TGoogleApiScope[]): string {
  let scopeString = '';
  scopes.forEach((scope, index) => {
    if (index === scopes.length - 1) {
      scopeString += `${scope}`;
    } else {
      scopeString += `${scope} `;
    }
  });
  return scopeString;
}
