// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Call your backend
    const backendResponse = await fetch(`${BACKEND_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await backendResponse.json();

    // If backend failed
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
      accessToken: data.data.accessToken,
      user: data.data.user,
    });

    // Forward refresh token cookie from backend
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
