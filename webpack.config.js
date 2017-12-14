var path = require('path'),
  DIST = path.resolve(__dirname, 'dist'),
  SRC = path.resolve(__dirname, 'src'),
  ENV = process.env.NODE_ENV,
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals'),
  LiveReloadPlugin = require('webpack-livereload-plugin'),
  loaderRules = [{
    test:/\.(ico|json|png)$/,
    use: [
      {
        loader:'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },{
    test: /\.(css|scss)$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }, {
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
  }];

var clientConfig = {
  name: 'client',
  entry: {
    main: [
      SRC + '/app/browser.js'
    ]
  },
  output: {
    path: DIST,
    filename: 'client.js'
  },
  module: {
    rules: loaderRules
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV),
        'BROWSER': JSON.stringify(true)
      }
    })
  ]
}

var serverConfig = {
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV),
        'BROWSER': JSON.stringify(false)
      }
    })
  ]
};

if (ENV === 'development') {
  clientConfig.plugins.push(
    new LiveReloadPlugin()
  );
} else if (ENV === 'production') {
  clientConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  serverConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = [clientConfig, serverConfig]
