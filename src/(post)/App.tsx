import { usePostModel } from "./post.model"
import { PostView } from "./post.view"

export default function App() {

  const methods =  usePostModel()

  return <PostView {...methods}/>
}
