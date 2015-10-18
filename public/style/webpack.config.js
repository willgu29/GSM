var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'index.js')
  output: {
    path: path.resolve(__dirname, '/build'),
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      exclude: /node-modules/
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    }]
  }
};

module.exports = config;