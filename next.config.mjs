/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Set to `true` for a 301 redirect or `false` for a 302 redirect
      },
    ];
  },
  images: {
    domains: [
      'justxchange-1.s3.ap-south-1.amazonaws.com',
      'encrypted-tbn0.gstatic.com',
    ], // Add your allowed domains here
  },
  reactStrictMode: false,
};

export default nextConfig;
