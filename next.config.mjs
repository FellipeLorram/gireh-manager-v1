// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
await import("./src/env.mjs");
import pwa from 'next-pwa';

const withPWA = pwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import("next").NextConfig} */
// const config = withPWA({
//   reactStrictMode: true,
//   i18n: {
//     locales: ["pt-BR"],
//     defaultLocale: "pt-BR",
//   },
// });

const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
};

export default config;
