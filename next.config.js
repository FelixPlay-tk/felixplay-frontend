/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "image.tmdb.org",
            "www.themoviedb.org",
            "i.ytimg.com",
            "snagfilms-a.akamaihd.net",
            "source.unsplash.com",
            "cdn11.bigcommerce.com",
            "www.deathsdoorprods.com",
            "akamaividz2.zee5.com",
            "i.pinimg.com",
            "i2.cinestaan.com",
            "world-wire.com",
            "images.moviebuff.com",
            "assets.thehansindia.com",
            "m.media-amazon.com",
        ],
    },
};

module.exports = nextConfig;
