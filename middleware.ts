export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/api/process-images",
    "/api/auth/:path*"
  ]
};