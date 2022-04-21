/**
* @file: webpack/webpack.config.dev.js
* @author zhangzhe(zhangzhe@baidu.com)
*/

const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const os = require('os');

const baseWebpackConfig = require('./webpack.config.base');

const PORT = 8080;

const devConfig = merge(baseWebpackConfig, {
    mode: 'development',
    entry: [
        // 热更新：给webpack-dev-server启动一个本地服务，并连接到8080端口
        `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
        // 入口文件，注意这个声明必须写后面，webpack-dev-server才有效
        './src/index.js'
    ],
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        // open: true, // 自动打开浏览器
        https: true, // https配置
        host: '0.0.0.0',
        contentBase: './example',
        port: PORT,
        hot: true, // 启用 webpack 的模块热替换特性
        inline: true,
        publicPath: '/dist/', // 重要：用于确定 bundle 的来源，并具有优先级高于 contentBase，此路径下的打包文件可在浏览器中访问。
        proxy: {
            // '/dh-aida/api': 'http://localhost:3001'
            // '/dh-aida/api/aida/bot/client/config/get': 'http://localhost:3001',
            // '/dh-aida/api': 'http://gzhxy-rec-xhs-api03.gzhxy.baidu.com:8302',
            // '/dh-aida/api': 'http://gzhxy-rec-xhs-api03.gzhxy.baidu.com'
            '/dh-aida-console/api': {
                target: 'https://digitalhuman.baidu.com',
                secure: false,
                changeOrigin: true
            }
        }
    },
    output: {
        filename: 'aida-sdk.js',
        path: path.resolve('dist'),
        // library: 'AIDASdk', // 暴露library给外部，zhangzhe 2020-11-20 这边留一个问题，当配置library时返回空对象，本地开发用window.AIDASdk的方式可以支持
        libraryTarget: 'umd',
        assetModuleFilename: 'img/[name].[contenthash:8][ext][query]'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 开启webpack全局热更新
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true)
        })
    ]
});

// 获取本地ip地址
function getNetworkIp() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        const network = os.networkInterfaces();
        for (let dev in network) {
            const iFace = network[dev];
            for (let i = 0; i < iFace.length; i++) {
                let alias = iFace[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}

module.exports = devConfig;
