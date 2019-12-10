const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');

const modeConfig = (env) => {
  const getConfig = require(`./build-utils/webpack.${env.mode}`); // eslint-disable-line
  return getConfig();
};

module.exports = ({ mode }) => webpackMerge({
  mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    inject: false,
    template,
    appMountId: 'root',
    title: 'Route editor',
    minify: {
      collapseWhitespace: true,
    },
  })],
}, modeConfig({ mode }));
