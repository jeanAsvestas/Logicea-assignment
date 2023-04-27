const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify(
        'Dev var defined with webpack.DefinePlugin'
      ),
      'process.env.mode': JSON.stringify('dev'),
    }),
  ],
};
