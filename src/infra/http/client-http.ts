import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {}

export interface Response<T = any> extends AxiosResponse<T> {}

export class ClientHttp {
  constructor (private readonly request = axios) {}

  public async get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return await this.request.get<T, Response<T>>(url, config)
  }

  public async post<T>(url: string, data: any, config: RequestConfig = {}): Promise<Response<T>> {
    return await this.request.post<T, Response<T>>(url, data, config)
  }

  public static isRequestError (error: AxiosError): boolean {
    return !!(error?.response && error?.response?.status)
  }
}
