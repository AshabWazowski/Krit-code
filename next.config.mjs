/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ],
    },
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
        buildActivityPosition: "bottom-right",
    },
};

export default nextConfig;
