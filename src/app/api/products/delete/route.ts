
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { productId } = await request.json();
        console.log("productId", productId);
        const response = await axios.post(`https://camp-coding.tech/test_api/products/delete_product.php`, { product_id: productId });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.log("axiosError", axiosError.response?.status);
        const cookieStore = await cookies();
        cookieStore.delete("meetusartoken");
        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong", status: axiosError?.response?.status || 400 },
            { status: axiosError?.response?.status || 400 }
        );
    }
}