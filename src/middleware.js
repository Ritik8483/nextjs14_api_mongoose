import { NextResponse } from "next/server";
import { authMiddleware } from "./app/middlewares/apis/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};
export default function middleware(req) {
  const authResult = authMiddleware(req);
  console.log("authResult", authResult);
  if (authResult?.isValid) {
    return NextResponse.next();
  } else {
    return;
  }
}
