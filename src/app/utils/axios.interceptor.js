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
      const customError = {
        ...error,
        response: {
          ...error.response,
          data: {
            status: {
              code: !session
                ? 400
                : session.error
                ? 401
                : error.response?.status,
            },
            error: {
              message: !session
                ? "TOKEN_NOT_FOUND"
                : session?.error
                ? "UNAUTHORIZED"
                : error.response.data.error.message,
            },
          },
        },
      };

      console.log(
        "from axios interceptor customError.response =>",
        customError.response.data
      );
      return Promise.reject(customError);
    }
  }
);

export default axiosInstance;
