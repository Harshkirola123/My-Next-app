import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("authorization");
    const backendResponse = await fetch(`${BACKEND_URL}/user`, {
      method: "get",
      headers: {
        cookie: req.headers.get("cookie") || "",
        Authorization: authorization || "",
      },
      credentials: "include",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Login failed",
        },
        {
          status: backendResponse.status,
        },
      );
    }

    const response = NextResponse.json({
      success: true,
      user: data.data.user,
    });

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
