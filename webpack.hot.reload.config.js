const webpack       = require('webpack');
const path          = require('path');

const distDir = path.join(__dirname, 'dist');
const vendorsDir      = path.join(__dirname, 'src/vendors');
const srcInclude  = path.join(__dirname, 'src');
const indexFile = path.join(__dirname, 'src/index.js');


const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    indexFile
  ],
  output: {
    path:       distDir,
    filename:   'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test:     /\.jsx?$/,
        include:  srcInclude,
        exclude:  [vendorsDir],
        loaders:  ['babel-loader']
      },
      {
        test: /\.css$/,
        use:  [
          'style-loader',
          {loader: 'css-loader', options: { importLoaders: 1 }},
          'postcss-loader'
        ]
      },
      {
        test:  /\.scss$/,
        use:  [
          'style-loader',
          {loader: 'css-loader', options: { importLoaders: 1 }},
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    getImplicitGlobals(),
    setNodeEnv()
  ]
};
/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('dev')
    }
  });
}

module.exports = config;
