import axiosInstance from "../utils/axios.interceptor";
import { redirect } from "next/navigation";
import OurBlog from "./ourblog";

export default async function Posts({ searchParams }) {
  let posts;
  let communitys;

  const page = searchParams.page || 1;

  const title = searchParams?.title;

  const url = title 
    ? `/user/post?page=${page}&title=${title}`
    : `/user/post?page=${page}`;


  try {
    const response = await axiosInstance.get(url);
    const responseCommunity = await axiosInstance.get("/community");
    posts = response.data;
    communitys = responseCommunity.data;
  } catch (error) {
    console.error("Error fetching posts:", error.response?.data);
    if (error?.response?.data?.status.code === 403) {
      redirect("/signin");
    }
  }

  return (
    <>
      <OurBlog posts={posts} isOurBlog={true} communitys={communitys}/>
    </>
  );
}
