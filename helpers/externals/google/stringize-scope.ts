import type { TGooGScope } from './types';

/**
 * Converts the Array of Scopes to a Scope Parameter
 *
 * @param {TGooGScope} scopes - Array of Google API Scopes
 * @returns {string} - Space Delimited Scopes
 */
export default function (scopes: TGooGScope[]): string {
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
