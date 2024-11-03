import axiosInstance from "../utils/axios.interceptor";
import { redirect } from "next/navigation";
import OurBlog from "./ourblog";

export default async function Posts({ searchParams }) {
  let communitys;

  try {
    const responseCommunity = await axiosInstance.get("/community");
    communitys = responseCommunity.data;
  } catch (error) {
    console.error("Error fetching posts:", error.response?.data);
    if (error?.response?.data?.status.code === 403) {
      redirect("/signin");
    }
  }

  return (
    <>
      <OurBlog isOurBlog={true} communitys={communitys}/>
    </>
  );
}
