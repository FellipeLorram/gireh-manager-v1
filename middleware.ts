// import { withAuth } from "next-auth/middleware";
// import { type NextRequest, NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req: NextRequest) {
//     return NextResponse.rewrite(new URL("/admin", req.url));
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         return token?.role === "admin";
//       },
//     },
//   }
// );

// export const config = { matcher: ["/", "/admin"] };