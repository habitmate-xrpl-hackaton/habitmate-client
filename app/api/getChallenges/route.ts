import { NextResponse } from "next/server";
import ky from "ky";

export async function GET() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await ky.get(`${API_BASE_URL}/public-challenges`);
    const data = await response.json();
    return NextResponse.json(data); // JSON 응답 반환
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch wallet logs" },
      { status: 500 }
    );
  }
}
