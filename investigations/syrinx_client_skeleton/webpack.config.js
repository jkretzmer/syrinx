const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()

module.exports = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, 'src/client'),
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    },
    {
      test: /\.html$/,
      use: 'file-loader?name=[name].[ext]'
    },
    {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader'
    },
    {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      use: 'file-loader'
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, 'src/client/static'),
    }])
  ],
}