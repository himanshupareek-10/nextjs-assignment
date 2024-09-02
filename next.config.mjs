/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    assetPrefix: '/assets',
    reactStrictMode:false,
    images: {
      path: '/assets/_next/image',
      domains: ['cdni.trulymadly.com','trulymadly.com','itunes.apple.com'],
    },
};

export default nextConfig;
