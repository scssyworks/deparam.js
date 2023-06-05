// Use "defineConfig" function for proper typescript intellisense while defining configuration
const { defineConfig } = require('rollup');

/**
 * "rollup-scripts" defines a base rollup configuration.
 * The base configuration should be sufficient for majority of applications.
 * However, you can use this file to customise configuration according to your needs.
 * @param baseConfig Initial rollup configuration
 * @returns Rollup configuration
 */
module.exports = function config(baseConfig) {
  const config = defineConfig({
    ...baseConfig,
    external: baseConfig.external.filter(
      (ext) => !['is-number', 'is-object'].includes(ext) // Including external dependencies as part of final bundle
    ),
  });

  return config;
};
