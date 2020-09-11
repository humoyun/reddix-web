import { NavBar } from '../components/NavBar'
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from '../utils/createUrqlCLient';
import { usePostsQuery } from '../generated/graphql';

const Index = () => { 
  const [{ data }] = usePostsQuery()

  return (
    <div>
      <NavBar></NavBar>
      <h2>Posts</h2>

      {!data ? ( <div>Loading...</div> ) : (data.posts.map(p =>
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
