/* eslint-disable quote-props */

// Import Axios
import { axios } from '@plugins';
import got from 'got';

// Others
import serialize from 'query-string';

// Types
import type { IGoogleRequest, IGoogleResponse } from './types';
import type { AxiosResponse } from 'axios';
import type { GotReturn } from 'got';
import type { ITokenDoc } from '@models/types';

/**
 * Constructs a Google API Request URL with Params
 *
 * @param { string } url - API URL
 * @param { Object } params - Query Params for the Route
 * @returns { string } - Constructed URL
 */
function constructURL<T extends string>(
  url: T,
  params?: Record<string, string | number | boolean>,
): string {
  if (params) {
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
function handleResponse<U = Record<string, unknown>>(
  response: AxiosResponse,
): IGoogleResponse<U> {
  if (response.status === 200) {
    const funcResponse: IGoogleResponse<U> = {
      success: true,
      data: response.data,
      error: null,
    };
    return funcResponse;
  } else {
    const funcResponse: IGoogleResponse<U> = {
      success: false,
      data: undefined,
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
  get: async <T extends string, U = Record<string, unknown>>(
    api: T,
    token: ITokenDoc,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse<U>> => {
    const url = constructURL<T>(api, params);
    const getHeaders = constructHeaders('get', token, headers);
    const response = await axios.get<U>(url, {
      headers: getHeaders,
    });
    return handleResponse<U>(response);
  },

  /**
   * Makes a POST Google API Request
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} data - Data to be sent in Request
   * @param {Record<string, string | number | boolean>} params - params to be attached to URL
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IGoogleResponse>} - Response from the API
   */
  post: async <
    T extends string,
    U = Record<string, unknown>,
    V = Record<string, unknown>,
  >(
    api: T,
    token: ITokenDoc,
    data?: U,
    params?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse<V>> => {
    const url = constructURL<T>(api, params);
    const getHeaders = constructHeaders('post', token, headers);
    const response = await axios.post<V>(url, data, {
      headers: getHeaders,
    });
    return handleResponse<V>(response);
  },

  /**
   * Makes a POST Google API Request
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} data - Data to be sent in Request
   * @param {Record<string, string | number | boolean>} params - params to be attached to URL
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IGoogleResponse>} - Response from the API
   */
  patch: async <
    T extends string,
    U = Record<string, unknown>,
    V = Record<string, unknown>,
  >(
    api: T,
    token: ITokenDoc,
    data?: U,
    params?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse<V>> => {
    const url = constructURL<T>(api, params);
    const getHeaders = constructHeaders('post', token, headers);
    const response = await axios.patch<V>(url, data, {
      headers: getHeaders,
    });
    return handleResponse<V>(response);
  },

  /**
   * Makes a DELETE Google API Request
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} data - Data to be sent in Request
   * @param {Record<string, string>} headers - Additional Headers to be Sent
   * @returns {Promise<IGoogleResponse>} - Response from the API
   */
  delete: async <T extends string, U = Record<string, unknown>>(
    api: T,
    token: ITokenDoc,
    data?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<IGoogleResponse<U>> => {
    const url = constructURL<T>(api);
    const getHeaders = constructHeaders('post', token, headers);
    const response = await axios.delete<U>(url, {
      headers: getHeaders,
      data,
    });
    return handleResponse<U>(response);
  },

  /**
   * Makes a Streaming Request to Google API
   *
   * @param {string} api - Google API URL
   * @param {ITokenDoc} token - Relevant Token Document from Database
   * @param {Record<string, string | number | boolean>} params - params to be attached to URL
   * @returns {GotReturn} - Response from the API
   */
  stream: <T extends string>(
    api: T,
    token: ITokenDoc,
    params?: Record<string, string>,
  ): GotReturn => {
    const url = constructURL<T>(api, params);
    const getHeaders = constructHeaders('get', token);
    return got.stream(url, {
      headers: getHeaders,
    });
  },
};
export default googleRequest;
