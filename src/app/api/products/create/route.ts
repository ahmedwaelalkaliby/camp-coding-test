import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json(); 
    const response = await axios.post(
      "https://camp-coding.tech/test_api/products/create_product.php",
      data
    );

    
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      {
        error: axiosError.response?.data || "Something went wrong",
        status: axiosError.response?.status || 400,
      },
      { status: axiosError.response?.status || 400 }
    );
  }
}
