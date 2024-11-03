import axiosInstance from "@/app/utils/axios.interceptor";
import { NextResponse } from "next/server";

//GET
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const response = await axiosInstance.get(`/user/post`, {
      params: {
        page: searchParams.get("page"),
        title: searchParams.get("title"),
        communityId: searchParams.get("communityId"),
      },
    });

    return NextResponse.json(response.data, {
      status: response.data.status.code,
    });
  } catch (error) {
    console.error("Error get data:", error.response?.data || error);

    return NextResponse.json(
      { message: "Error get data", error: error.response?.data || error },
      { status: error.response?.data?.status.code || 500 }
    );
  }
}
