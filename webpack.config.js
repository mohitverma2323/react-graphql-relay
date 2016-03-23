/**
 * WEBPACK CONFIG
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state
 * while editing React components.
 */

/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    // Entry point for the bundle.
    './src/client/index'
  ],
 // If you pass an array - the modules are loaded on startup. The last one is exported.
  output: {
    path: __dirname + '/static/',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  // Array of file extensions used to resolve modules.
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  // http://www.cnblogs.com/Answer1215/p/4312265.html
  // The source map file will only be downloaded if you have source maps enabled and your dev tools open.
  devtool: 'eval-source-map',
  plugins: [
    // Hot Module Replacement (HMR) exchanges, adds or removes modules while an application is running without
    // page reload.
    new webpack.HotModuleReplacementPlugin(),
    // Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reloads
    // altogether and recovers after syntax errors.
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      // Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
      // that is actually delivered to the end user browser.
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        include: path.join(__dirname, 'src/client')
      },
      // css etc required to run bootstrap
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: path.join(__dirname, 'src/client')
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        include: path.join(__dirname, 'src/client')
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
};
