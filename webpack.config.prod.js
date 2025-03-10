const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    /**
     * This plugin assigns the module and chunk ids by occurence count. What this
     * means is that frequently used IDs will get lower/shorter IDs - so they become
     * more predictable.
     */
    new webpack.optimize.OccurenceOrderPlugin(),

    new HtmlWebpackPlugin({
      template: './index.html', // Source HTML file
      filename: 'index.html', // Output file in dist/
      inject: 'body' // Injects scripts at the end of the body
    }),

    /**
     * See description in 'webpack.config.dev' for more info.
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    /**
     * Some of you might recognize this! It minimizes all your JS output of chunks.
     * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
     * your production code through this!
     */
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: true
    //   }
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
          test: /\.woff(2)?/,
          loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
          test: /\.(jpg|gif|ttf|eot|svg|png)/,
          loader: "file-loader"
      }
    ]
  }
};
