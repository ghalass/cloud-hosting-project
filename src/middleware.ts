import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.headers.get("authToken") as string;

  if (!authToken)
    return NextResponse.json(
      { message: "Not token provided, access denied" },
      { status: 401 } // Unauthorized
    );
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
