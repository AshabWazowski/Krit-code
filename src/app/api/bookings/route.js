import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!backendEndpoint || !apiKey) {
      return NextResponse.json(
        { success: false, message: "Server configuration missing" },
        { status: 500 }
      );
    }

    const res = await fetch(`${backendEndpoint}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      cache: "no-store",
    });

    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/bookings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

    if (!backendEndpoint) {
      return NextResponse.json(
        { success: false, message: "Server configuration missing" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const res = await fetch(`${backendEndpoint}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/bookings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
