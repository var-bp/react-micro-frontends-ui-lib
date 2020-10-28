/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const env = require('./env');

module.exports = merge(
  {
    mode: 'development',
    // Stop compilation early in production
    bail: false,
    // Turn on watch mode. This means that after the initial build, webpack will
    // continue to watch for changes in any of the resolved files.
    watch: true,
    devtool: 'cheap-module-source-map',
    output: {
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
    },
    module: {
      rules: [
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              // Options for PostCSS as we reference these options twice
              // Adds vendor prefixing based on your specified browser support in
              // package.json
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-flexbugs-fixes',
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      },
                    ],
                  ],
                },
              },
            },
          ],
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
      ],
    },
    plugins: [
      // Makes some environment variables available to the JS code.
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        ...env,
      }),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      new CaseSensitivePathsPlugin(),
      // Detect modules with circular dependencies
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false,
        allowAsyncCycles: true,
      }),
      new webpack.WatchIgnorePlugin([path.join(__dirname, '../node_modules')]),
    ],
  },
  require('./webpack.base'),
);
