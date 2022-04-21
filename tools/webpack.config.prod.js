/**
* @file: webpack/webpack.config.prod.js
* @author zhangzhe(zhangzhe@baidu.com)
*/

const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // webpack5推荐
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const {merge} = require('webpack-merge');

const baseWebpackConfig = require('./webpack.config.base');

const prodConfig = merge(baseWebpackConfig, {
    mode: 'production', // 自动压缩输出
    entry: './src/index.js',
    target: 'browserslist', // 默认值，用package.json里面的browserslist配置
    output: {
        filename: 'aida-sdk.js',
        path: path.resolve('dist'),
        library: 'AIDASdk', // 暴露library给外部
        libraryTarget: 'umd',
        assetModuleFilename: 'img/[name].[contenthash:8][ext][query]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new LodashModuleReplacementPlugin(), // 为了lodash做tree shaking
        ...(process.env.ANALYSE ? [
            new BundleAnalyzerPlugin()
        ] : []),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(false)
        })
    ],
    optimization: {
        usedExports: true, // production默认值
        // 详见：https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#inner-module-tree-shaking
        innerGraph: true, // 对模块中的标志进行分析，找出导出和引用之间的依赖关系
        minimize: true, // 压缩
        minimizer: [
            // uglifyjs-webpack-plugin 只能处理es5 ，用TerserPlugin来替换
            new TerserPlugin({
                parallel: true, // 多线程提升build速度
                // https://webpack.js.org/plugins/terser-webpack-plugin/#extractcomments
                extractComments: false, // avoid building with comments，不产出诸如xx.js.LICENSE文件
                // https://github.com/terser-js/terser#minify-options
                terserOptions: {
                    parse: {
                        // we want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minfication steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2
                    },
                    mangle: {
                        safari10: true,
                        // zhangzhe 2020-03-11 解决useFetch dispatch使用压缩后导致的一个bug
                        reserved: ['dispatch']
                    },
                    output: {
                        ecma: 5,
                        comments: false
                    }
                }
            }),
            new CssMinimizerPlugin({
                sourceMap: false,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {removeAll: true}
                        }
                    ]
                } // 去除注释
            })
        ]
    },
    performance: {
        // 给定一个创建后超过250kb的资源，将展示一条错误
        hints: 'error',
        // 入口大小限制到800kb
        maxEntrypointSize: 1200000,
        // 最大允许800kb的产出，不然报错。在GZip后大致是250-400KB，所以800kb应该够了
        maxAssetSize: 1200000
    },
    // webpack5 性能优化：https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#major-changes-performance
    cache: {
        type: 'filesystem'
    }
});

module.exports = prodConfig;
