import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  meta: {
    requestStartedAt: number;
    requestEndedAt: number;
  };
}

export interface IAxiosResponse extends AxiosResponse {
  config: IAxiosRequestConfig;
  responsetime: number;
}
