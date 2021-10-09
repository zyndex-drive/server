import type { IDriveFileAdvancedSearch } from './types';

const inValue = (value: string, handler: string): string =>
  `${handler} contains '${value}'`;
const notinValue = (value: string, handler: string): string =>
  `not ${handler} contains '${value}'`;
const numberValue = (value: string, handler: string) => `${handler} ${value}`;

const arrayHandler = (
  queryArray: string[],
  handler: string,
  func: (v: string, h: string) => string,
): string => {
  let query = '';
  for (let i = 0; i < queryArray.length; i++) {
    if (i < queryArray.length - 1) {
      query += `${func(queryArray[i], handler)} and `;
    } else {
      query += func(queryArray[i], handler);
    }
  }
  return query;
};

const checknHandle = (
  handler: string,
  func: (v: string, h: string) => string,
  prop?: string | string[],
): string => {
  if (prop) {
    if (Array.isArray(prop)) {
      const query = arrayHandler(prop, handler, inValue);
      return query;
    } else {
      const query = func(prop, handler);
      return query;
    }
  }
  return '';
};

const andHandler = (arrays: string[][]): string => {
  let mainQuery = '';
  arrays.forEach((mainArr, mainIndex) => {
    mainArr.forEach((subArray, subIndex) => {
      if (mainIndex < arrays.length - 1 && subIndex < mainArr.length - 1) {
        mainQuery += `${subArray} and `;
      } else {
        mainQuery += `${subArray}`;
      }
    });
  });
  return mainQuery;
};

/**
 * Constructs a Advanced Drive Search Parameter
 *
 * @param {IDriveFileAdvancedSearch} query - Query Options
 * @returns {string} - Constructed Query String
 */
export default function (query: IDriveFileAdvancedSearch): string {
  const positiveArray: string[] = [];
  const negativeArray: string[] = [];
  if (query.positive) {
    const { positive } = query;
    const nameQuery = checknHandle('name', inValue, positive.name);
    const mimeQuery = checknHandle('mimeType', inValue, positive.mimeType);
    const fileExtQuery = checknHandle(
      'fileExtension',
      inValue,
      positive.fileExtension,
    );
    const sizeQuery = positive.size ? numberValue(positive.size, 'size') : '';
    positiveArray.push(nameQuery, mimeQuery, fileExtQuery, sizeQuery);
  }
  if (query.negative) {
    const { negative } = query;
    const nameQuery = checknHandle('name', notinValue, negative.name);
    const mimeQuery = checknHandle('mimeType', notinValue, negative.mimeType);
    const fileExtQuery = checknHandle(
      'fileExtension',
      notinValue,
      negative.fileExtension,
    );
    negativeArray.push(nameQuery, mimeQuery, fileExtQuery);
  }
  const mainQuery = andHandler([positiveArray, negativeArray]);
  return mainQuery;
}
