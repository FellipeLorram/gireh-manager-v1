import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Montserrat } from 'next/font/google'

import { api } from "@/utils/api";

import "@/styles/global.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
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
              --font-montserrat: ${montserrat.variable}
            }
          
          `}
      </style>
      <SessionProvider session={session}>
        <main className={`${montserrat.variable} font-sans`} >
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <AuthProvider>
              <Component {...pageProps} />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </main>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
