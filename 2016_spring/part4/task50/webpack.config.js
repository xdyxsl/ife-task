var webpack = require('webpack')

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },//js*类的文件都用babel的loader
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  }
}