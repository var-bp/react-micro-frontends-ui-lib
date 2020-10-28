/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const env = require('./env');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const IS_SOURCE_MAP = false;

module.exports = merge(
  {
    mode: 'production',
    // Stop compilation early in production
    bail: true,
    devtool: IS_SOURCE_MAP ? 'source-map' : false,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code.
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code.
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default.
              ascii_only: true,
            },
          },
          sourceMap: IS_SOURCE_MAP,
        }),
      ],
    },
    module: {
      rules: [
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: IS_SOURCE_MAP,
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
                sourceMap: IS_SOURCE_MAP,
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
        NODE_ENV: 'production',
        ...env,
      }),
      // Detect modules with circular dependencies
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
        allowAsyncCycles: true,
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
  require('./webpack.base'),
);
