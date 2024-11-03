

import axiosInstance from "@/app/utils/axios.interceptor";
import Post from ".";


export default async function Posts({params}) {
  let post = [];
  let comment = [];

  try {
    const responsePost = await axiosInstance.get(`/post/${params.id}`);
    const responseComment = await axiosInstance.get(`/post/${params.id}/comment?perPage=${1000}`);
    post = responsePost.data;
    comment = responseComment.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Post post={post} comment={comment} />
    </>
  );
}