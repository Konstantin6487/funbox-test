module.exports = () => ({
  entry: ['react-hot-loader/patch', './src'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
});
