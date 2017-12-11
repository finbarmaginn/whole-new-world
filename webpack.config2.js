var path = require('path'),
  DIST = path.resolve(__dirname, 'dist'),
  SRC = path.resolve(__dirname, 'src'),
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals'),
  LiveReloadPlugin = require('webpack-livereload-plugin'),
  loaderRules = [{
      test: /\.(css|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },{
      test: /\.js$/,
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
    }],
    clientConfig = {
      name: 'client',
      entry: SRC + '/app/browser.js',
      output: {
        path: DIST,
        filename: 'client.js'
      },
      module: {
        rules: loaderRules
      },
      plugins:[
        new LiveReloadPlugin()
      ]
    },
    serverConfig = {
      name: 'server',
      entry: SRC + '/server.js',
      output: {
        path: DIST,
        filename: 'server.js'
      },
      module: {
        rules: loaderRules
      },
      target: "node",
      externals: [nodeExternals()],
    };


module.exports = [clientConfig, serverConfig]
