/*eslint-disable*/
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEV = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

var jsxLoader = ['babel?stage=1'];
var lessLoader = ['style', 'css', 'less'];
var cssLoader = ['style', 'css'];

if (DEV) {
  jsxLoader.unshift('react-hot');
} else if(PRODUCTION) {
  // Remove the first argument, this avoids us calling the style-loader twice.
  lessLoader.shift(); cssLoader.shift();
  lessLoader = ExtractTextPlugin.extract('style', lessLoader.join('!'));
  cssLoader = ExtractTextPlugin.extract('style', cssLoader.join('!'));
}

function ifArrayJoin(input) {
  if (input.forEach) {
    return input.join('!');
  }
  return input;
}

var loaders = [
  { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loaders: jsxLoader },
  { test: /\.less($|\?)/, loader: ifArrayJoin(lessLoader) },
  { test: /\.css$/, loader: ifArrayJoin(cssLoader) },
  // inline base64 URLs for <=8k images, direct URLs for the rest
  { test: /\.(png|jpg|gif)$/,    loader: 'url?limit=8192' },

  { test: /\.woff($|\?)/,         loader: "url?limit=10000&mimetype=application/font-woff" },
  { test: /\.woff2($|\?)/,        loader: "url?limit=10000&mimetype=application/font-woff" },
  { test: /\.ttf($|\?)/,          loader: "file" },
  { test: /\.eot($|\?)/,          loader: "file" },
  { test: /\.svg($|\?)/,          loader: "file" },

  { test: /\.json($|\?)/,          loader: "json" },
];

module.exports = loaders;