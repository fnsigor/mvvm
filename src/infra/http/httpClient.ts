import axios, { AxiosError, type AxiosInstance } from "axios";
import type { HttpRequest, IHttpClient } from "./httpClientContract";

export class HttpClient implements IHttpClient {

  private constructor(
    private api: AxiosInstance = axios,
    private baseUrl: string = 'http://localhost:8080/api',
  ) {

  }

  static create(baseUrl?: string) {
    return new HttpClient(axios, baseUrl)
  }

  async sendRequest<TResponse, TBody>(props: HttpRequest<TBody>) {
    const { method, endpoint, body, headers } = props
    try {

      const { data } = await this.api.request<TResponse>({
        url: `${this.baseUrl}${endpoint}`,
        method,
        data: body,
        headers
      })
      return data
    } catch (err) {
      const error = err as AxiosError
      const status = error.response?.status || 500
      const message = error.response?.data || error.message
      throw new Error(`Request failed with status ${status}: ${message}`, {
        cause: err
      })
    }
  };

}