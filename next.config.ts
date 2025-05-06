/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.tvmaze.com', 'via.placeholder.com'],
    // La qualité ne se définit pas globalement ici mais au niveau des composants Image
  },
};

module.exports = nextConfig;
