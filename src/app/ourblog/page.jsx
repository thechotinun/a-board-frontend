
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axiosInstance from "../utils/axios.interceptor";
import OurBlog from "./ourblog";


export default async function Posts() {
  let posts = [];

  try {
    const session = await getServerSession(authOptions);
    
    if (session?.accessToken) {
      const response = await axiosInstance.get("/user/post", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });
      
      posts = response.data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error.response.data);
  }

  return (
    <>
      <OurBlog posts={posts} isOurBlog={true} />
    </>
  );
}