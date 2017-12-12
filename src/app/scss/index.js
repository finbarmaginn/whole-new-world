var sass = require('node-sass');

console.log(__dirname + "/style.scss")

require('style-loader!css-loader!sass-loader!' + __dirname + '/style.scss');
// var result = sass.renderSync({
//   data: require('./style.scss')
// });

// export default result
// OR
// var result = sass.renderSync({
//   data: scss_content
//   [, options..]
// });
