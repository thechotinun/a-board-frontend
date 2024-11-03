import axiosInstance from "@/app/utils/axios.interceptor";
import { NextResponse } from "next/server";

//POST
export async function POST(req, { params }) {
  try {
    const { id } = params;
    const reqBody = await req.json();
    
    const response = await axiosInstance.post(`/post/${id}/comment`, reqBody);
    return NextResponse.json(response.data, {
      status: response.data.status.code,
    });
  } catch (error) {
    console.error("Error comment data:", error.response?.data || error);

    return NextResponse.json(
      { message: "Error comment data", error: error.response?.data || error },
      { status: error.response?.data?.status.code || 500 }
    );
  }
}
