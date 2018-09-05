const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (buildConfig) => {
  return {
    entry: {
      index: [
        // 'babel-polyfill',
        path.join(buildConfig.env.appDir, 'src', 'index.jsx')
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
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
          NODE_ENV: '"development"',
          isDev: 'true'
        }
      }),
      new webpack.LoaderOptionsPlugin(),
      new webpack.NamedModulesPlugin(),
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
      new HtmlWebpackPlugin({
        template: `${buildConfig.env.appDir}/src/index.html`,
        filename: 'index.html',
        favicon: `${buildConfig.env.appDir}/src/favicon.ico`,
        inject: false,
        hash: false,
        title: '🌏 loading...'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      hot: true,
      inline: true,
      historyApiFallback: {
        rewrites: [
          {
            from: /\/[^\.]*$/g,
            to: '/index.html'
          }
        ]
      },
      host: '0.0.0.0',
      port: '8089',
      headers: {
        token: 'A-123-X5-A4A31531'
      },
      stats: {
        colors: true
      },
      proxy: {
        '/api': {
          target: 'http://192.168.1.120:8848',
          pathRewrite: {
            '/api': '/api'
          },
          secure: false,
          changeOrigin: true
        }
      }
    }
  }
}