const path = require('path'),
  PUBLIC = path.resolve(__dirname, 'public'),
  SRC = path.resolve(__dirname, 'src'),
  webpack = require('webpack'),
  nodeEnv = process.env.NODE_ENV,
  OfflinePlugin = require('offline-plugin');

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
    }),
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      publicPath: '/',
      caches: {
        main: [
          'vendor.js',
          'main.js'
        ],
        additional: [':externals:']
      },
      externals: [
        '/',
        '/index.html',
        '/images/',
        '/images/The Light of Other Days cover - Slider.jpg',
        '/images/Stewart Rosie - Slider.jpg',
        '/images/McKeegan Archie 2 - Slider.jpg',
        '/images/MacColl Ewan - Slider.jpg',
        '/images/Stiubhard Daibhidh - Slider.jpg',
        '/images/Russell Micho 1 - Slider.jpg',
        '/images/Cathal McConnell sq - Slider.jpg',
        '/images/Gunn Tommy - Slider.jpg',
        '/images/Young Rohan - Slider.jpg',
        '/images/NíUallacháin Eithne - Slider.jpg',
        '/images/Barry Maggie - Slider.jpg',
        '/images/Cullen Paddy 2012 - Slider.jpg',
        '/images/Hanna Geordie - Slider.jpg',
        '/images/Keenan Tommy - Slider.jpg',
        '/images/Wilkinson Desi - Slider.jpg',
        '/images/Carson Ciaran 2012 - Slider.jpg',
        '/images/Tansey Seamus - Slider.jpg',
        '/images/Clifford Julia - Slider.jpg',
        '/images/Gavin Frankie - Slider.jpg',
        '/images/McGoldrick Hugh - Slider.jpg',
        '/images/Keenan Tommy - Medium.jpg',
        '/images/McGoldrick Hugh - Medium.jpg',
        '/images/Gunn Brendan and Tommy - Medium.jpg',
        '/images/Gillespie Sheila 1 - Medium.jpg',
        '/images/Hanna Geordie - Medium.jpg',
        '/images/MacColl Ewan - Medium.jpg',
        '/images/Murray Sam - Medium.jpg',
        '/images/Barry Maggie - Medium.jpg'
      ],
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true,
      },
      AppCache: {
        FALLBACK: {
          '/': '/index.html'
        }
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};

const isProd = (nodeEnv === 'production');

if (isProd) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
