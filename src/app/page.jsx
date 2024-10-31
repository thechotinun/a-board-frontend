
import Home from "./home";
import axiosInstance from "./utils/axios.interceptor";


export default async function Posts() {
  let posts = [];

  try {
    const response = await axiosInstance.get("/post");
    
    posts = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Home posts={posts} isOurBlog={false} />
    </>
  );
}