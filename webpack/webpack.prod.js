const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify(
        'Prod var defined with webpack.DefinePlugin'
      ),
      'process.env.mode': JSON.stringify('prod'),
    }),
  ],
};
