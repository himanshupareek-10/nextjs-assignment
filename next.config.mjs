/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    reactStrictMode:false,
    images: {
        domains: ['cdni.trulymadly.com','trulymadly.com','itunes.apple.com'],
      },
};

export default nextConfig;
