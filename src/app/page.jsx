
import Home from "./home";
import axiosInstance from "./utils/axios.interceptor";


export default async function Posts({ searchParams }) {
  let posts = [];
  let communitys = [];

  const page = searchParams?.page || 1;
  const title = searchParams?.title;

  const url = title 
    ? `/post?page=${page}&title=${title}`
    : `/post?page=${page}`;

  try {
    const responsePost = await axiosInstance.get(url);
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