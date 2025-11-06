import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Send POST request to your backend API
    const response = await axios.post(
      "https://camp-coding.tech/test_api/products/update_product.php",
      {
        product_id: data.product_id,
        product_name: data.product_name,
        product_description: data.product_description,
        number_of_pieces: data.number_of_pieces,
        product_price: data.product_price,
        price_after_discount: data.price_after_discount,
        discount: data.discount,
        product_name_en: data.product_name_en,
        product_description_en: data.product_description_en,
        product_hidden: data.product_hidden,
      }
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
