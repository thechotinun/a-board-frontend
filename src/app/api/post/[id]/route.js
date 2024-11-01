import axiosInstance from "@/app/utils/axios.interceptor";
import { NextResponse } from "next/server";

// FIND (GET) function
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const response = await axiosInstance.get(`/post/${id}`);
    return NextResponse.json(response.data, {
      status: response.data.status.code,
    });
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.response?.data || error },
      { status: error.response?.data?.status.code || 500 }
    );
  }
}

// UPDATE (PATCH) function
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const reqBody = await req.json();
    
    const response = await axiosInstance.patch(`/post/${id}`, reqBody);
    return NextResponse.json(response.data, {
      status: response.data.status.code,
    });
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.response?.data || error },
      { status: error.response?.data?.status.code || 500 }
    );
  }
}