/* eslint-disable quote-props */

// Import Axios
import axios from '@helpers/axios';

// Others
import serialize from 'query-string';

// Types
import type { TDriveUrlType, IDriveResponse, IDriveRequest } from './types';
import type { AxiosError } from 'axios';
import type { ITokenDoc } from '@models/tokens/types';

/**
 * Constructs a Drive API Request URL with Params
 *
 * @param { string } type - get or post Request
 * @param { TDriveUrlType } url - API URL
 * @param { Object } params - Query Params for the Route
 * @returns { string } - Constructed URL
 */
function constructURL(
  type: 'get' | 'post',
  url: TDriveUrlType,
  params?: Record<string, string | number | boolean>,
): string {
  if (type === 'get' && params) {
    const serialisedParam = serialize.stringify(params);
    return `${url}?${serialisedParam}`;
  } else {
    return `${url}`;
  }
}

/**
 * Constructs Header Object for Drive Api Request
 *
 * @param { string } type - get or post Request
 * @param {ITokenDoc} token - Token Document from Database
 * @param {object} headers - Other Headers to be Included
 * @returns {object} - Header Object
 */
function constructHeaders(
  type: 'get' | 'post',
  token: ITokenDoc,
  headers?: Record<string, string>,
): Record<string, string> {
  if (type === 'get') {
    return {
      Authorization: `Bearer ${token.token}`,
      Accept: 'application/json',
      ...headers,
    };
  } else {
    return {
      Authorization: `Bearer ${token.token}`,
      'Content-Type': 'application/json',
      ...headers,
    };
  }
}

export const driveRequest: IDriveRequest = {
  /**
   * Makes a GET Drive API Request
   *
   * @param {TDriveUrlType} api - Drive API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} params - Data to be Embedded in Request
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IDriveResponse>} - Response from the API
   */
  get: (
    api: TDriveUrlType,
    token: ITokenDoc,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<IDriveResponse> =>
    new Promise<IDriveResponse>((resolve, reject) => {
      const url = constructURL('get', api, params);
      const getHeaders = constructHeaders('get', token, headers);
      axios
        .get<IDriveResponse>(url, {
          headers: getHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            const funcResponse: IDriveResponse = {
              success: true,
              data: response.data,
              error: null,
            };
            resolve(funcResponse);
          } else {
            const funcResponse: IDriveResponse = {
              success: false,
              data: null,
              error: null,
            };
            resolve(funcResponse);
          }
        })
        .catch((error: AxiosError) => {
          reject(new Error(`${error.name}: ${error.message}`));
        });
    }),

  /**
   * Makes a POST Drive API Request
   *
   * @param {TDriveUrlType} api - Drive API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} data - Data to be sent in Request
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IDriveResponse>} - Response from the API
   */
  post: (
    api: TDriveUrlType,
    token: ITokenDoc,
    data?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<IDriveResponse> =>
    new Promise<IDriveResponse>((resolve, reject) => {
      const url = constructURL('post', api);
      const getHeaders = constructHeaders('post', token, headers);
      axios
        .post<IDriveResponse>(url, data, {
          headers: getHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            const funcResponse: IDriveResponse = {
              success: true,
              data: response.data,
              error: null,
            };
            resolve(funcResponse);
          } else {
            const funcResponse: IDriveResponse = {
              success: false,
              data: null,
              error: null,
            };
            resolve(funcResponse);
          }
        })
        .catch((error: AxiosError) => {
          reject(new Error(`${error.name}: ${error.message}`));
        });
    }),
};
