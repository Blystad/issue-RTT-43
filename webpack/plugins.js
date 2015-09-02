/*eslint-disable*/
var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('../package.json');

var DEV = process.env.NODE_ENV === 'development';

var cssBundle = '[name].css';

var plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
];
if (DEV) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      '__PRODUCTION__': false,
    })
  );
} else {
  plugins.push(
    new ExtractTextPlugin(cssBundle, {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ROUTER_LINK_STYLE: JSON.stringify('history'),
      },
      '__PRODUCTION__': true,
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Collaboration X',
      hash: true,
      template: 'src/main/html/index.template.html',
    })
  );
}

module.exports = plugins;