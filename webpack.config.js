const path = require('path'),
  PUBLIC = path.resolve(__dirname, 'public'),
  SRC = path.resolve(__dirname, 'src'),
  webpack = require('webpack'),
  nodeEnv = process.env.NODE_ENV;

require('babel-polyfill');

const config = {
  entry: {
    main: [
      SRC + '/index.js',
      SRC + '/scss/style.scss',
      'babel-polyfill'
    ],
    vendor: [
      'react',
      'react-router',
      'react-dom',
      'react-redux',
      'redux',
      'react-router-redux',
      'redux-logger',
      'redux-persist',
      'redux-promise-middleware'
    ]
  },
  output: {
    path: PUBLIC,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|gif|png|jpg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: SRC,
        options: {
          babelrc: false,
          presets: [
            'env',
            'react',
            'stage-2'
          ],
          'plugins': ['transform-decorators-legacy']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    })
  ]
};

/*
  implement jQuery in plugins array,

  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  })
*/

  
if (nodeEnv === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
