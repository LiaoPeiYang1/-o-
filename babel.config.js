/**
 * @file babel config
 * @author zhangzhe
 */

module.exports = {
    presets: [
        ['@babel/preset-env', {
            modules: 'umd',
            useBuiltIns: 'usage', // usage会根据配置的浏览器兼容，以及你代码中用到的API来进行 polyfill，实现了按需添加。
            corejs: {version: 3}
        }],
        '@babel/preset-react',
        '@babel/preset-typescript',
        '@babel/preset-flow'
    ],
    plugins: [
        'lodash', // 为了loadash 库做tree-shaking
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['babel-plugin-import', {libraryName: 'antd-mobile', style: true}],
        '@babel/plugin-syntax-dynamic-import',
        'add-module-exports' // babel对于 export default {} 支持不好，所以要加上
    ]
};
