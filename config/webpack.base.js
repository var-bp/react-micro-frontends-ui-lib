/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    colors: path.join(__dirname, '../src/colors.ts'),
    components: path.join(__dirname, '../src/components.ts'),
    helpers: path.join(__dirname, '../src/helpers.ts'),
    typo: path.join(__dirname, '../src/typo.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
    library: ['react-micro-frontends-ui-lib', '[name]'],
    libraryTarget: 'umd',
    // Will name the AMD module of the UMD build. Otherwise an anonymous define is used.
    umdNamedDefine: true,
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  resolve: {
    // This allows you to set a fallback for where webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts.
    modules: ['node_modules', path.join(__dirname, '../node_modules')],
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools.
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.join(__dirname, '../src'),
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              eslintPath: 'eslint',
              resolvePluginsRelativeTo: __dirname,
            },
          },
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
    },
  },
  plugins: [
    // A linter for CSS-like syntaxes like SCSS, Sass, Less and SugarSS
    new StylelintPlugin({
      files: '**/*.{scss,sass,css,ts,tsx,js,jsx}',
    }),
    // In general it's good practice to clean the output folder before each
    // build, so that only used files will be generated.
    new CleanWebpackPlugin(),
  ],
};
