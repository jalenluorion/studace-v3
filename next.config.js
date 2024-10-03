/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                port: '',
            },
        ],
    },
    experimental: {
        staleTimes: {
          dynamic: 0, // Re-fetch dynamic routes after 30 seconds
          static: 30,  // Re-fetch static routes after 3 minutes
        },
    },
};

module.exports = nextConfig;
