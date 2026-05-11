import { HttpClient } from "../infra/http/httpClient";
import {
  CreatePostService,
  //MockCreatePostServiceSuccess
} from "../service/posts/post.service";
import { usePostModel } from "./post.model";
import { PostView } from "./post.view";

export default function App() {
  const httpClient = HttpClient.create("https://jsonplaceholder.typicode.com");

  const createPostService = new CreatePostService(httpClient);
  //const mockCreatePostService = MockCreatePostServiceSuccess

  const methods = usePostModel({ createPostService });
  // const methods =  usePostModel({ createPostService: mockCreatePostService })
  //posso usar mocks livremente pq só dependo da interface, nao da implementação
  //se eu quiser testar uma pagina sem backend facilita tb

  return <PostView {...methods} />;
}
