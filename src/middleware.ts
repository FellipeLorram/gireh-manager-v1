import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname;

        if (path.startsWith('/settings')) return token?.role === "OWNER";
        if (path.startsWith('/daily')) return token?.role === "OWNER" || token?.role === "ADMIN";

        return false;
      },
    },
  }
);

export const config = { matcher: ["/settings", "/daily"] };