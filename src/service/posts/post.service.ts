import type { SchemaPostType } from "../../(post)/post.types"
import axios from 'axios'

export interface ICreatePostService {
  exec: (data: SchemaPostType) => Promise<string>
}
//quando o service implementa uma interface, os models não dependem da implementação, apenas da interface
//posos criar mocks livremente
export class CreatePostService implements ICreatePostService {
  async exec(body: SchemaPostType) {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts/1', body)
    return data
  }
}

export const MockCreatePostServiceSuccess: ICreatePostService = {
  exec: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Post criado com sucesso!')
      }, 1000)
    })
  }
}
