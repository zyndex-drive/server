/* eslint-disable quote-props */

// Import Axios
import axios from '@helpers/axios';

// Others
import serialize from 'query-string';

// Types
import type { IGoogleRequest, IGoogleResponse } from './types';
import type { AxiosError, AxiosResponse } from 'axios';
import type { ITokenDoc } from '@models/tokens/types';

/**
 * Constructs a Google API Request URL with Params
 *
 * @param { string } type - get or post Request
 * @param { string } url - API URL
 * @param { Object } params - Query Params for the Route
 * @returns { string } - Constructed URL
 */
function constructURL<T extends string>(
  type: 'get' | 'post' | 'delete',
  url: T,
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
 * Constructs Header Object for Google Api Request
 *
 * @param { string } type - get or post Request
 * @param {ITokenDoc} token - Token Document from Database
 * @param {object} headers - Other Headers to be Included
 * @returns {object} - Header Object
 */
function constructHeaders(
  type: 'get' | 'post' | 'delete',
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

/**
 * Handles API Response from Google API Request
 *
 * @param {AxiosResponse} response - API Response from the Request
 * @returns {IGoogleResponse} - Modified Response
 */
function handleResponse(response: AxiosResponse): IGoogleResponse {
  if (response.status === 200) {
    const funcResponse: IGoogleResponse = {
      success: true,
      data: response.data,
      error: null,
    };
    return funcResponse;
  } else {
    const funcResponse: IGoogleResponse = {
      success: false,
      data: null,
      error: null,
    };
    return funcResponse;
  }
}

/**
 * Google API Requester and Response Handlers
 */
const googleRequest: IGoogleRequest = {
  /**
   * Makes a GET Google API Request
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} params - Data to be Embedded in Request
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IGoogleResponse>} - Response from the API
   */
  get: <T extends string>(
    api: T,
    token: ITokenDoc,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse> =>
    new Promise<IGoogleResponse>((resolve, reject) => {
      const url = constructURL<T>('get', api, params);
      const getHeaders = constructHeaders('get', token, headers);
      axios
        .get<IGoogleResponse>(url, {
          headers: getHeaders,
        })
        .then((response) => {
          const resp = handleResponse(response);
          resolve(resp);
        })
        .catch((error: AxiosError) => {
          reject(new Error(`${error.name}: ${error.message}`));
        });
    }),

  /**
   * Makes a POST Google API Request
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} data - Data to be sent in Request
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IGoogleResponse>} - Response from the API
   */
  post: <T extends string>(
    api: T,
    token: ITokenDoc,
    data?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse> =>
    new Promise<IGoogleResponse>((resolve, reject) => {
      const url = constructURL<T>('post', api);
      const getHeaders = constructHeaders('post', token, headers);
      axios
        .post<IGoogleResponse>(url, data, {
          headers: getHeaders,
        })
        .then((response) => {
          const resp = handleResponse(response);
          resolve(resp);
        })
        .catch((error: AxiosError) => {
          reject(new Error(`${error.name}: ${error.message}`));
        });
    }),

  /**
   * Makes a DELETE Google API Request
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} data - Data to be sent in Request
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IGoogleResponse>} - Response from the API
   */
  delete: <T extends string>(
    api: T,
    token: ITokenDoc,
    data?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse> =>
    new Promise<IGoogleResponse>((resolve, reject) => {
      const url = constructURL<T>('post', api);
      const getHeaders = constructHeaders('post', token, headers);
      axios
        .delete<IGoogleResponse>(url, {
          headers: getHeaders,
          data,
        })
        .then((response) => {
          const resp = handleResponse(response);
          resolve(resp);
        })
        .catch((error: AxiosError) => {
          reject(new Error(`${error.name}: ${error.message}`));
        });
    }),
};

export default googleRequest;
