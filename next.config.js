/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.scdn.co'
			},
			{
				protocol: 'https',
				hostname: '**.spotifycdn.com'
			}
		]
	}
};

module.exports = nextConfig;
