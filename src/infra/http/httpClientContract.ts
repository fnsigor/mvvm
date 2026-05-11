export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export interface HttpRequest<Tbody> {
  endpoint: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: Tbody;
}

export interface IHttpClient {
  sendRequest: <TResponse, TBody = unknown>(
    request: HttpRequest<TBody>,
  ) => Promise<TResponse>;
}
