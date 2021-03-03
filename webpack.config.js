var path = require('path')
var Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const RemarkHTML = require('remark-html');

module.exports = {
  entry: {
    'main': [
      '@babel/polyfill',
      './src/main.js'
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[name].bundle.js',
  },
  devServer: {
    compress: true,
    port: 8081
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|pdf|asc)$/,
        type: 'asset/resource',
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: 'remark-loader',
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'], //path.resolve('node_modules')],   // prevent use of different leaflet versions if packages use them in their package.json
    alias: {
      // leaflet: path.resolve(__dirname, './node_modules/leaflet'),
      '@': path.resolve(__dirname, './src/'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv({safe: true}),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
    //new BundleAnalyzerPlugin()
  ],
  devtool: 'inline-source-map',
}

if (process.env.NODE_ENV === 'production') {
  let alias = {
      'bootstrap-vue$': 'bootstrap-vue/dist/bootstrap-vue.esm.min.js',
      'vue-router$': 'vue-router/dist/vue-router.esm.js',
      'leaflet$': 'leaflet/dist/leaflet.js',
  }
  module.exports.mode = 'production'
  module.exports.resolve.alias = Object.assign(module.exports.resolve.alias, alias)
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CompressionPlugin(),
  ])
}

