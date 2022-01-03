/** @type {import('next').NextConfig} */


module.exports = (phase, {
    defaultConfig
}) => {
    if ('sassOptions' in defaultConfig) {
        defaultConfig['sassOptions'] = {
            prependData: `@import "styles/variables.scss";`,
        }
    }

    const newConf = {
        images: {
            domains: ['image.tmdb.org', 'tmdb.org', "themoviedb.org", "www.themoviedb.org"]
        },
        reactStrictMode: true
    }

    return {
        ...defaultConfig,
        ...newConf
    };
}