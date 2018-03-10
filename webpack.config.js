var webpack = require('webpack');
var path = require('path');
const nodeExternals = require('webpack-node-externals');

var BUILD_DIR = path.resolve(__dirname, './dist');
var APP_DIR = path.resolve(__dirname, './public');
var SERVER_DIR = path.resolve(__dirname, './server');

var config = {
  entry: SERVER_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'server.js'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
      },
      {
        test : /\.jsx?/,
        include : SERVER_DIR,
        loader : 'babel-loader',
      },
      {
        test:/\.css$/,
        use:['isomorphic-style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'http://18.219.35.229:80/assets/[name].[ext]'
          }
        }
      }
    ]
  }
};

module.exports = config;