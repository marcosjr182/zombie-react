const ExtractTextPlugin = require ( 'extract-text-webpack-plugin' );
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: './public/assets/js/bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
      })
    }]
  },
  plugins: [
    new Dotenv({path: './.env', safe: true}),
    new ExtractTextPlugin("./public/assets/style.css"),
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
