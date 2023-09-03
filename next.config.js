require('dotenv').config();

let nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    airtableToken: process.env.AIRTABLE_ACCESS_TOKEN,
    airtableBase: process.env.AIRTABLE_BASE,
    padeleoPassword: process.env.PADELEO_PASSWORD,
  },
  publicRuntimeConfig: {
    appTitle: process.env.APP_TITLE,
  }
};

const analyzeBundleEnabled = process.env.ANALYZE === 'true';
if (analyzeBundleEnabled) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: analyzeBundleEnabled });
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
