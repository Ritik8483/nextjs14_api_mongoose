import { NextResponse } from "next/server";
import { authMiddleware } from "./app/middlewares/apis/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};
export default function middleware(req) {
  const authResult = authMiddleware(req);
  console.log("authResult",authResult);
  if (!authResult?.isValid) {
    return new NextResponse(
      JSON.stringify({ message: "UNAUTORIZED" }, { status: 401 })
    );
  } 
  return NextResponse.next();
}
