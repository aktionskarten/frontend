var path = require('path')
var webpack = require('webpack')
var Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ '@babel/preset-env' ],
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]'
            }

            return '[hash].[ext]'
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
            options: { attrs: ['a:href', 'img:src'] }
          },
          "markdown-loader"
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
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
  devtool: '#eval-source-map'
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

