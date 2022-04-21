/**
* @file: webpack/webpack.config.base.js
* @author zhangzhe(zhangzhe@baidu.com)
*/

const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules\/(?!(baidu-acu-react-.*|@huse)\/)|dist|(src\/lib\/))/, // 重要：baidu-acu-react-common及baidu-acu-react-hooks需要支持babel
                use: [
                    {
                        loader: require.resolve('babel-loader')
                    }
                ],
                sideEffects: false // 默认都进行tree-shaking
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: require.resolve('awesome-typescript-loader'),
                        options: {
                            useBabel: true,
                            babelCore: '@babel/core',
                            forceIsolatedModules: true,
                            usePrecompiledFiles: true,
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: 'antd-mobile',
                                        libraryDirectory: 'lib',
                                        style: true
                                    })
                                ]
                            })
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|otf)\??.*$/,
                type: 'asset/inline'
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', 'jsx', '.ts', '.tsx', '.json']
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        // 用 IgnorePlugin 移除moment库多语言包
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        })
    ]
};
