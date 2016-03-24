/* eslint-disable no-var, strict, no-console */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {

  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
  hot: true,

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use '*' to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    '*': 'http://localhost:3000'
  },

  // webpack-dev-middleware options
  // Display no info to console (only warnings and errors) default: false
  noInfo: false,
  // Display nothing to the console, default: false
  quiet: false,
  // lazy model, default: false
  lazy: false,

  watchOptions: {
    // Delay the rebuilt after the first change. Value is a time in ms.
    aggregateTimeout: 300,
    // polling interval
    poll: 1000
  },

  // The path where to bind the middleware to the server.
  publicPath: config.output.publicPath,
  // Output options for the stats
  stats: {
    // colorful output to the console.
    colors: true
  }
}).listen(5000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:5000');
});
