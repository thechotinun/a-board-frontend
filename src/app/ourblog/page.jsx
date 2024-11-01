import axiosInstance from "../utils/axios.interceptor";
import { redirect } from "next/navigation";
import OurBlog from "./ourblog";

export default async function Posts() {
  let posts;

  try {
    const response = await axiosInstance.get("/user/post");
    posts = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.response?.data || error);
    if (error?.response?.data?.status === 403) {
      redirect("/signin");
    }
  }

  return (
    <>
      <OurBlog posts={posts} isOurBlog={true} />
    </>
  );
}
