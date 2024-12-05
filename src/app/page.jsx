
import Home from "./home";
import axiosInstance from "./utils/axios.interceptor";


export default async function Posts({}) {
  let communitys = [];

  try {
    const responseCommunity = await axiosInstance.get("/community");

    communitys = responseCommunity.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Home isOurBlog={false} communitys={communitys} />
    </>
  );
}