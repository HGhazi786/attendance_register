import { NextRequest, NextResponse } from "next/server";
import { getJWTSecretKey } from "./lib/auth";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const headersToken = request.cookies.get("token")?.value;
  try {
    if (pathname === "/login" || pathname === "/register") {
      if (headersToken) return NextResponse.redirect(`${origin}`);
      return NextResponse.next();
    }
    if (!headersToken) {
      return NextResponse.redirect(`${process.env.API_BASE_URL}/login`);
    }
    const verifyToken = await jwtVerify(
      headersToken,
      new TextEncoder().encode(getJWTSecretKey())
    );
    if (verifyToken) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: { message: "Authentication required" } },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
}
export const config = {
  matcher: [
    "/",
    "/login",
    "/attendance",
    "/createComplaint",
    "/AddCustomer",
    "/Complaint_Action",
    "/search",
  ],
};
// 