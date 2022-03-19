/**
 * Constructs Fields Parameter for Google Requests
 *
 * @param {string[]} fields - Array of Fields
 * @param {string} prefix - Prefix to be added to each field
 * @returns {string} - Constructed Field Parameter
 */
export default function (fields: string[], prefix?: string): string {
  let constructedField = '';
  if (prefix) {
    for (let i = 0; i < fields.length; i++) {
      if (i < fields.length - 1) {
        constructedField += `${prefix}/${fields[i]},`;
      } else {
        constructedField += `${prefix}/${fields[i]}`;
      }
    }
    return constructedField;
  } else {
    for (let i = 0; i < fields.length; i++) {
      if (i < fields.length - 1) {
        constructedField += `${fields[i]},`;
      } else {
        constructedField += `${fields[i]}`;
      }
    }
    return constructedField;
  }
}
