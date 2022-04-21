module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-preset-env'),
        require('postcss-pxtorem')({
            rootValue: 16,
            // 哪些需要进行px转rem
            propList: ['*'],
            // 排除哪些开头的如 .ant 开头等
            selectorBlackList: [],
            // 最小转换，如低于 2px的不会进行转成rem
            minPixelValue: 2
        })
    ]
};
