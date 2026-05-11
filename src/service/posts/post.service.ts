import type { SchemaPostType } from "../../(post)/post.types";
import {
  HttpMethod,
  type IHttpClient,
} from "../../infra/http/httpClientContract";

export interface ICreatePostService {
  exec: (data: SchemaPostType) => Promise<string>;
}
//quando o service implementa uma interface, os models não dependem da implementação, apenas da interface
//posos criar mocks livremente
export class CreatePostService implements ICreatePostService {
  constructor(private httpClient: IHttpClient) {}

  async exec(body: SchemaPostType) {
    const response = await this.httpClient.sendRequest<string, SchemaPostType>({
      method: HttpMethod.POST,
      endpoint: "posts/1",
      body,
    });
    return response;
  }
}

export const MockCreatePostServiceSuccess: ICreatePostService = {
  exec: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Post criado com sucesso!");
      }, 1000);
    });
  },
};
