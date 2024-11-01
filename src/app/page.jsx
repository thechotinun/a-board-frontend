
import Home from "./home";
import axiosInstance from "./utils/axios.interceptor";


export default async function Posts() {
  let posts = [];
  let communitys = [];

  try {
    const responsePost = await axiosInstance.get("/post");
    const responseCommunity = await axiosInstance.get("/community");
    
    posts = responsePost.data;
    communitys = responseCommunity.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Home posts={posts} isOurBlog={false} communitys={communitys} />
    </>
  );
}