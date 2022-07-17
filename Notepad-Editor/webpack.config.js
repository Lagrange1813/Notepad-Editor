const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require('./package.json')

module.exports = [
  {
    mode: 'production',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
      library: 'Neditor',
      libraryExport: 'default',
      globalObject: 'this',
    },
    entry: {
      'index.min': './src/index.ts',
      'method.min': './src/method.ts',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: ['index.min.js', 'method.min.js'],
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.less', 'png'],
    },
    module: {
      rules: [
        {
          test: /\.png$/,
          include: [path.resolve(__dirname, './src/assets/images')],
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      browsers: [
                        'last 2 Chrome major versions',
                        'last 2 Firefox major versions',
                        'last 2 Safari major versions',
                        'last 2 Edge major versions',
                        'last 2 iOS major versions',
                        'last 2 ChromeAndroid major versions',
                      ],
                    },
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
        {
          test: /\.less$/,
          include: [path.resolve(__dirname, 'src/assets')],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', {grid: true, remove: false}],
                  ],
                },
              },
            },
            {
              loader: 'less-loader', // compiles Less to CSS
            },
          ],
        },
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(__dirname, 'dist')],
      }),
      new webpack.DefinePlugin({
        VDITOR_VERSION: JSON.stringify(pkg.version),
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css',
      }),
      new CopyPlugin({
        patterns: [
          {from: 'src/css', to: 'css'},
          {from: 'src/images', to: 'images'},
          {from: 'src/lib', to: 'lib'},
          {from: 'types', to: 'types'},
        ],
      }),
    ],
  }]
