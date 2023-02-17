let nextConfig = {
  reactStrictMode: true,
};

const analyzeBundleEnabled = process.env.ANALYZE === 'true';
if (analyzeBundleEnabled) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: analyzeBundleEnabled });
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
