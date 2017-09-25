'use strict';

const deepcopy = require('deepcopy'),
      webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = function(env) {
  const baseConfig = {
    context: __dirname,
  };

  return [
    Object.assign({}, deepcopy(baseConfig), {
      entry: {
        'manifest': `${__dirname}/src/manifest.js`
      },
      module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /manifest.js$/,
            use: ExtractTextPlugin.extract({
              use: [
                { loader: 'raw-loader' },
                { loader: 'val-loader' },
              ],
            }),
          },
        ],
      },
      output: {
        filename: '[name].json',
        path: `${__dirname}/ext/`,
        publicPath: './',
      },
      plugins: [
        new ExtractTextPlugin('manifest.json'),
      ],
    }),
    Object.assign({}, deepcopy(baseConfig), {
      entry: {
        'background': `${__dirname}/src/background.js`,
        'options': `${__dirname}/src/options.js`,
        'vendor': [
          'mustache',
          'sprintf-js',
        ],
      },
      module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /\.vue$/,
            use: [
              { loader: 'vue-loader' },
            ],
          },
        ],
      },
      output: {
        chunkFilename: 'chunk-[id]-[hash].js',
        filename: '[name].js',
        path: `${__dirname}/ext/`,
        publicPath: './',
      },
      resolve: {
        extensions: [
          '.js',
          '.json',
          '.vue',
        ],
      },
      target: 'web',
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity,
        }),
        new webpack.BannerPlugin({
          banner: [
            '@license Copyright(c) 2017 sasa+1',
            'Released under the MIT license.',
          ].join('\n'),
          entryOnly: true,
          raw: false,
        }),
      ],
    }),
  ];
};
