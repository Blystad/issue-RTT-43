/*eslint-disable*/
var webpack = require('webpack');
var path = require('path');

var COVERAGE = process.env.NODE_ENV === 'coverage';

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha','chai-sinon','es6-shim'],

    files: [
      'test/all-tests.js',
    ],

    preprocessors: {
      'test/all-tests.js': COVERAGE ? ['webpack', 'sourcemap'] : ['webpack'],
    },

    webpack: {
      target: 'web',
      devtool: 'inline-source-map',
      module: {
        preLoaders: COVERAGE ? [
          {
            test: /\.jsx?$/,
            include: path.resolve('src/main/js'),
            loader: 'isparta',
          }
        ] : [],
        loaders: require('./webpack/loaders.js'),
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true,
    },
    reporters: COVERAGE ? ['dots', 'coverage'] : ['mocha'],
    plugins: [
      require('karma-webpack'),
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-webdriver-launcher',
      'karma-chai-sinon',
      'karma-mocha-reporter',
      'karma-es6-shim',
      'karma-sourcemap-loader',
      'karma-coverage',
    ],
  });
};
