/**
* @file mockup for bot-config
* @author dingyang
*/

module.exports = (path, params, mockup) => {
    return mockup.ok({
        theme: 'blueTheme', // 主题色
        titleName: '在线客服',
        titleInfo: '提示信息',
        botAvatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2767322104,269429428&fm=15&gp=0.jpg',
        userAvatar: '用户头像：user_sportorange.png',
        adv: '广告位推荐',
        firstTime: 7,
        interval: 2,
        errorText: [
            {
                content: '错误提示'
            }
        ],
        timeoutText: ['测试自动弹出语句就是这个月案子二手房耍酒疯呢,测试就是', '就是这个样子的'],
        headTitle: '页面标题'
    });
};
