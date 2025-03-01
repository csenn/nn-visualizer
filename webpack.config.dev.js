const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    /**
     * This is where the magic happens! You need this to enable Hot Module Replacement!
     */


    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: './index.html', // Source HTML file
      filename: 'index.html', // Output file in dist/
      inject: 'body' // Injects scripts at the end of the body
    }),


    /**
     * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
     * there are errors during compiling - essentially, assets that include errors
     * will not be emitted. If you want your webpack to 'fail', you need to check out
     * the bail option.
     */
    new webpack.NoErrorsPlugin(),
    /**
     * DefinePlugin allows us to define free variables, in any webpack build, you can
     * use it to create separate builds with debug logging or adding global constants!
     * Here, we use it to specify a development build.
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /styles/],
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
