import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2";

type UserRole = "ADMIN" | "USER";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      orgId: string;
      role: UserRole;
    };
  }

  interface User {
    orgId: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.orgId = user.orgId;
        token.role = user.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!credentials) {
          throw new Error("No credentials");
        }

        const user = await db.user.findFirst({
          where: {
            email: email
          }
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await argon2.verify(user.password_hash, password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          orgId: user.orgId!,
          role: user.role as UserRole,
        }
      }
    }),
  ],
};


export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
