var webpack = require('webpack'),
    path = require('path')//获取路径

module.exports = {
  entry: './entry.js',
  output: {
    path:  path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {
        test: /\.js$/,
        loader: "'babel'",
        query: {
            presets: ['es2015','react'],
            cacheDirectory: true,
            plugins: ['syntax-object-rest-spread']
        },
        exclude: /node_modules/,
        include: path.join(__dirname,'/blog/frontend')
    }
    ]
  }
}