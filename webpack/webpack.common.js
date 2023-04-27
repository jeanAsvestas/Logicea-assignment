const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      process: 'process/browser',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: [/\.css$/, /\.scss$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    // is this working ?
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js'],
      emitWarning: true,
      emitError: true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      systemvars: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  stats: 'errors-only',
};
