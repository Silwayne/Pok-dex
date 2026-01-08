/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Pokedex', 
  trailingSlash: true,
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
