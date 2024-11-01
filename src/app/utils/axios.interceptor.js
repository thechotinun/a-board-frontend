import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    if (session) {
      config.headers = {
        Authorization: `Bearer ${session.accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const session = await getServerSession(authOptions);
      // handle unauthorized
      if(!session){
        error.response.data.status.code = 400
        error.response.data.error.message = "TOKEN_NOT_FOUND"
      }
      if(session.error){
        error.response.data.status.code = 401
        error.response.data.error.message = "UNAUTHORIZED"
      }
      console.log(
        `from axios interceptor error.response => `,
        error.response.data
      );
      if (error?.response?.data?.status.code === 403) {
        error.response.data
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
