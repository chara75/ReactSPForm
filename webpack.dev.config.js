const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const indexFile = path.join(__dirname, 'src/index.js');
const distDir = path.join(__dirname, 'dist');
const nodeModulesDir  = path.join(__dirname, 'node_modules');
const vendorsDir      = path.join(__dirname, 'src/vendors');

const config = {
  devtool: "#source-map",
  entry: {
    app: indexFile,
    vendor: [
      'react',
      'react-dom',
      'react-hot-loader',      
      'babel-polyfill',
      'jquery'
    ]  
  },
  output: {
    path: distDir,
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: [nodeModulesDir, vendorsDir] },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: [nodeModulesDir, vendorsDir] },
      { 
          test: /\.css$/, 
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: {importLoaders: 1} },
              'postcss-loader'
            ]
          })
      },
      { 
        test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: {importLoaders: 1} },
            'postcss-loader',
            'sass-loader'
          ]
        })
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
  getImplicitGlobals(),
  setNodeEnv(),
  new ExtractTextPlugin('app.styles.css'),
  new webpack.optimize.CommonsChunkPlugin({
    name:     'vendor',
    filename: 'app.vendor.bundle.js'
  })
]
};

/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
return new webpack.ProvidePlugin({
  $:      'jquery',
  jQuery: 'jquery',
  jquery: 'jquery'
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
