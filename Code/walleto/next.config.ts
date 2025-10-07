// next.config.ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // optional: ensures proper links like /about/ instead of /about
  // trailingSlash: true,
};
export default nextConfig;
