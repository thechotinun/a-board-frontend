

import axiosInstance from "@/app/utils/axios.interceptor";
import Post from ".";


export default async function Posts({params}) {
  let post = [];
//   let communitys = [];

  try {
    const responsePost = await axiosInstance.get(`/post/${params.id}`);
    // const responseCommunity = await axiosInstance.get("/community");
    post = responsePost.data;
    // communitys = responseCommunity.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Post post={post} />
    </>
  );
}