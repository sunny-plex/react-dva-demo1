const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (buildConfig) => {
  return {
    entry: {
      index: [
        // 'babel-polyfill',
        path.resolve(buildConfig.env.appDir + '/src', 'index.jsx')
      ]
    },
    output: {
      path: path.resolve(buildConfig.env.appDir, 'build'),
      filename: `main_${buildConfig.version}.js`
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
      alias: {
        '@': path.resolve(buildConfig.env.appDir, 'src')
      }
    },
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.(jsx|js)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy'],
            compact: false
          }
        }]
      }, {
        test: /\.(xcss|scss|less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 16384,
              name: 'res/[hash].[ext]',
              publicPath: '/'
            }
          }
        ]
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
          isDev: 'false'
        }
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(['*.html', '*.js', '*.css', '*.json', '*.map'], {
        root: buildConfig.env.appDir + '/build',
        verbose: false,
        dry: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: `lib_${buildConfig.vendorHash}.js`,
        minChunks: (modulePath) => {
          return modulePath.context && modulePath.context.indexOf('node_modules') !== -1;
        }
      }),
      new ExtractTextPlugin(`main_${buildConfig.version}.css`),
      new HtmlWebpackPlugin({
        template: `${buildConfig.env.appDir}/src/index.html`,
        filename: 'index.html',
        favicon: `${buildConfig.env.appDir}/src/favicon.ico`,
        inject: false,
        hash: false,
        title: '🌏 loading...'
      })
    ]
  }
}