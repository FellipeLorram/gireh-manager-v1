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
import { z } from "zod";

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

const updateSessionObject = z.object({
  orgId: z.string(),
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        const { orgId } = updateSessionObject.parse(session);
        token.orgId = orgId;
        return token;
      }

      if (user) {
        token.orgId = user.orgId;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          orgId: token.orgId,
          role: token.role,
        },
      };
    }
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
          email: user.email,
          image: user.image,
          name: user.name,
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
