/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      type: "javascript/esm",
    });

    config.externals.push("pino-pretty", "lokijs", "encoding");

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    return config;
  },

  transpilePackages: [
    "@walletconnect/universal-provider",
    "@walletconnect/ethereum-provider",
    "@walletconnect/core",
  ],
};

export default nextConfig;
