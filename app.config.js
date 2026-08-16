// Load environment variables from .env for Expo config
require('dotenv').config();

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      TMDB_API_KEY: process.env.TMDB_API_KEY || null,
    },
  };
};
