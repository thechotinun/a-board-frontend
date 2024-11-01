import axiosInstance from "@/app/utils/axios.interceptor";
import { NextResponse } from "next/server";

//POST
export async function POST(req) {
  try {
    const data = await req.json();
    const response = await axiosInstance.post("/post", data);
    return NextResponse.json(response.data, {
      status: response.data.status.code,
    });
  } catch (error) {
    console.error("Error posting data:", error.response?.data || error);

    return NextResponse.json(
      { message: "Error posting data", error: error.response?.data || error },
      { status: error.response?.data?.status.code || 500 }
    );
  }
}
