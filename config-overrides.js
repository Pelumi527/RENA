module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function override(config, env) {
    config.resolve.fallback = {
      url: false,
      assert: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
      buffer: false,
      stream: false,
    };
    return {
      ...config,
      ignoreWarnings: [
        {
          module: /node_modules\/aptos/,
        },
      ],
    };
  },
};
