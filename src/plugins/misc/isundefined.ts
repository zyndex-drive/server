/**
 * Checks the Given Variables whether it is Properly Defined
 *
 * @param {Array} props - Array of Variables to Check for Undefined
 * @returns {boolean} - returns true if all the Variables are properly Defined
 */
export function isUndefined(props: unknown[]): boolean {
  const resultArr: boolean[] = [];
  props.forEach((prop) => {
    if (prop) {
      if (prop !== null || prop !== undefined) {
        resultArr.push(true);
      } else {
        resultArr.push(false);
      }
    } else {
      resultArr.push(false);
    }
  });
  if (resultArr.includes(false)) {
    return true;
  }
  return false;
}
