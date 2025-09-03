/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/images/**",
      },
    ],
    // Alternative: you can also use domains (deprecated but simpler)
    // domains: ['localhost'],
  },
  // Trailing slash for better static hosting compatibility
  trailingSlash: true,
  output: "export",
};

export default nextConfig;
