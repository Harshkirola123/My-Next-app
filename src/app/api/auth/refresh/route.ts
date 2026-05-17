import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  try {
    // Get refresh token cookie
    const cookie = req.headers.get("cookie");

    const backendResponse = await fetch(`${BACKEND_URL}/user/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: cookie || "",
      },
      credentials: "include",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      const res = NextResponse.json(
        {
          success: false,
          message: data.message || "Unauthorized",
        },
        {
          status: backendResponse.status,
        },
      );
      res.cookies.delete("refreshToken");
      return res;
    }

    const response = NextResponse.json({
      success: true,
      accessToken: data.data.accessToken,
    });

    // Forward updated refresh cookie if backend rotates it
    const setCookie = backendResponse.headers.get("set-cookie");

    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
