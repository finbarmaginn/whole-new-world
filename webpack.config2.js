var path = require('path'),
  DIST = path.resolve(__dirname, 'dist'),
  SRC = path.resolve(__dirname, 'src'),
  ENV = process.env.NODE_ENV,
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
      entry: {
        main: [
          SRC + '/app/browser.js',
          SRC + '/app/scss/style.scss'
        ]
      },
      output: {
        path: DIST,
        filename: 'client.js'
      },
      module: {
        rules: loaderRules
      },
      plugins: []
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
      plugins: []
    };

if(ENV === 'development'){
  clientConfig.plugins.push(
    new LiveReloadPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  )
} else if (ENV === 'production'){
  clientConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  )
  serverConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  )
}

module.exports = [clientConfig, serverConfig]
