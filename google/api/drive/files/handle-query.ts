import type { IDriveFileAdvancedQuery } from './types';

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
    if (i === queryArray.length - 1) {
      query += func(queryArray[i], handler);
    } else {
      query += `${func(queryArray[i], handler)} and `;
    }
  }
  return query;
};

const checknHandle = (
  handler: string,
  func: (v: string, h: string) => string,
  prop?: string | string[],
): string | false => {
  if (prop) {
    if (Array.isArray(prop)) {
      const query = arrayHandler(prop, handler, func);
      return query;
    } else {
      const query = func(prop, handler);
      return query;
    }
  }
  return false;
};

const boolChecker = (arrays: (string | false)[]): string[] => {
  const allowedValues: string[] = [];
  arrays.forEach((value) => {
    if (value) {
      allowedValues.push(value);
    }
  });
  return allowedValues;
};

const arrayChecker = (arrays: string[][]): string[][] => {
  const allowedArrays: string[][] = [];
  arrays.forEach((arr) => {
    if (arr.length > 0) {
      allowedArrays.push(arr);
    }
  });
  return allowedArrays;
};

const andHandler = (arrays: string[][]): string => {
  let mainQuery = '';
  arrays.forEach((mainArr, mainIndex) => {
    mainArr.forEach((subArray, subIndex) => {
      if (arrays.length === 1 && mainArr.length === 1) {
        mainQuery = `${subArray}`;
      } else if (
        mainIndex === arrays.length - 1 &&
        subIndex === mainArr.length - 1
      ) {
        mainQuery += `${subArray}`;
      } else {
        mainQuery += `${subArray} and `;
      }
    });
  });
  return mainQuery;
};

/**
 * Constructs a Advanced Drive Search Parameter
 *
 * @param {IDriveFileAdvancedQuery} query - Query Options
 * @returns {string} - Constructed Query String
 */
export default function (query: IDriveFileAdvancedQuery): string {
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
    positiveArray.push(
      ...boolChecker([nameQuery, mimeQuery, fileExtQuery, sizeQuery]),
    );
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
    negativeArray.push(...boolChecker([nameQuery, mimeQuery, fileExtQuery]));
  }
  const mainQuery = andHandler(arrayChecker([positiveArray, negativeArray]));
  return mainQuery;
}
