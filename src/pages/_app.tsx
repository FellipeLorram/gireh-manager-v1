import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from 'next/font/google'

import { api } from "@/utils/api";

import "@/styles/global.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>
        {`
            :root {
              --font-inter: ${inter.variable}
            }
          
          `}
      </style>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class" enableSystem defaultTheme="system"
        >
          <main className={`${inter.variable} font-sans`} >
            <AuthProvider>
              <Component {...pageProps} />
              <Toaster />
            </AuthProvider>
          </main>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
