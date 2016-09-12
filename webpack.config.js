// webpack.config.js
var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 9000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
}
