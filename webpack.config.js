const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const paths = {
  dist: path.join(__dirname, 'client_dist'),
  html_template: path.join(__dirname, 'client', 'html', 'index.html'),
  src: path.join(__dirname, 'client', 'index.js'),
  imports: [
    'babel-polyfill',
  ],
  webpack: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
  ],
};

const common = {
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url?limit=100000&name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        html5: true,
      },
      template: paths.html_template,
      filename: 'index.html',
    }),
  ],
};

const specific = {
  build: {
    entry: {
      app: paths.src,
      vendor: paths.imports,
    },
    output: {
      path: paths.dist,
      filename: '[name].[chunkhash].js',
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ],
    },
    plugins: [
      new CleanPlugin(paths.dist),
      new CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false,
        },
      }),
    ],
  },
  debug: {
    entry: paths.webpack.concat(paths.src),
    output: {
      path: '/',
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          loaders: ['sass-loader'],
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': '"debug"',
      }),
      new OccurrenceOrderPlugin(),
      new HotModuleReplacementPlugin(),
      new NoEmitOnErrorsPlugin(),
    ],
  },
};

module.exports = merge(common, specific[process.env.npm_lifecycle_event]);
