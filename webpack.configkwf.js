
// const path = require('path'),
//   PUBLIC = path.resolve(__dirname, 'public'),
//   SRC = path.resolve(__dirname, 'src'),
//   webpack = require('webpack'),
//   nodeEnv = process.env.NODE_ENV;
//
// require('babel-polyfill');
//
// const config = [{
//   name: 'client',
//   entry: {
//     main: [
//       SRC + '/app/browser.js',
//       SRC + '/app/scss/style.scss',
//       'babel-polyfill'
//     ],
//     vendor: [
//       'react',
//       'react-router',
//       'react-dom',
//       'react-redux',
//       'redux',
//       'react-router-redux',
//       'redux-logger',
//       'redux-persist',
//       'redux-promise-middleware'
//     ]
//   },
//   output: {
//     path: PUBLIC,
//     filename: '[name].js',
//     chunkFilename: '[name].js'
//   },
//   module: {
//     rules: [{
//         test: /\.(css|scss)$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.(eot|woff|woff2|ttf|svg|gif|png|jpg)$/,
//         loader: 'file-loader?name=images/[name].[ext]'
//       },
//       {
//         test: /\.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         include: SRC,
//         options: {
//           babelrc: false,
//           presets: [
//             'env',
//             'react',
//             'stage-2'
//           ],
//           'plugins': ['transform-decorators-legacy']
//         }
//       }
//     ]
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor'
//     })
//   ]
// }]
//
//
// /*
//   implement jQuery in plugins array,
//
//   new webpack.ProvidePlugin({
//     $: 'jquery',
//     jQuery: 'jquery',
//     'window.jQuery': 'jquery'
//   })
// */
//
//
// for (var i in config) {
//   if (nodeEnv === 'production') {
//     config[i].plugins.push(
//       new webpack.optimize.UglifyJsPlugin()
//     )
//   }
//
//   config[i].plugins.push(
//     webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(nodeEnv)
//     })
//   )
// }
//
// module.exports = config;




var path = require("path");

var commonLoaders = [
	{ test: /\.js$/, loader: "babel-loader" },
	{ test: /\.png$/, loader: "url-loader" },
	{ test: /\.jpg$/, loader: "file-loader" },
];
var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

module.exports = [
	{
		// The configuration for the client
		name: "browser",
		entry: "./src/app/browser.js",
		output: {
			path: assetsPath,
			filename: "[hash].js",
			publicPath: publicPath
		},
		module: {
			loaders: commonLoaders.concat([
				{ test: /\.css$/, loader: "style-loader!css-loader" },
			])
		},
		plugins: [
			function(compiler) {
				this.plugin("done", function(stats) {
					require("fs").writeFileSync(path.join(__dirname, "public", "stats.generated.json"), JSON.stringify(stats.toJson()));
				});
			}
		]
	},
	{
		// The configuration for the server-side rendering
		name: "server-side rendering",
		entry: "./src/server.js",
		target: "node",
		output: {
			path: assetsPath,
			filename: "../../server/page.generated.js",
			publicPath: publicPath,
			libraryTarget: "commonjs2"
		},
		externals: /^[a-z\-0-9]+$/,
		module: {
			loaders: commonLoaders.concat([
				{ test: /\.css$/,  loader: path.join(__dirname, "server", "style-collector") + "!css-loader" },
			])
		}
	}
];
