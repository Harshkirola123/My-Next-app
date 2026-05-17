import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");

    const backendResponse = await fetch(`${BACKEND_URL}/user/logout`, {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") || "",
        Authorization: authorization || "",
      },
      credentials: "include",
    });

    const data = await backendResponse.json();

    // Forward backend error
    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Unauthorized",
        },
        {
          status: backendResponse.status,
        },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    const setCookieHeader = backendResponse.headers.get("set-cookie");
    if (setCookieHeader) {
      response.headers.set("set-cookie", setCookieHeader);
    }

    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 500 },
    );
  }
}
