/**
* @file mockup for bot-config
* @author dingyang
*/

module.exports = (path, params, mockup) => {
    return mockup.ok({
        theme: 'blue', // 主题色
        titleName: '在线客服',
        titleInfo: '提示信息',
        backImage: '', // 水印图片
        botAvatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2767322104,269429428&fm=15&gp=0.jpg',
        userAvatar: '用户头像：user_sportorange.png',
        adv: '广告位推荐',
        firstTime: 7,
        interval: 2,
        errorText: [
            {
                content: '后端超时提示'
            }
        ],
        timeoutText: [
            {
                content: '测试测试专业的测试就是这样子的 啊'
            }
        ],
        tipSkills: [
            {
                content: '我是泡泡啊'
            }
        ],
        headTitle: '页面标题',
        skillNavigationStatus: false,
        skillNavigation: [
            {columnName: '帮你诊断', skillList: [
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in',
                    'showType': 'default'
                },
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in',
                    'showType': 'default'
                },
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in',
                    'showType': 'default'
                }
            ]},
            {columnName: '帮你推荐', skillList: [
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in'
                }
            ]},
            {columnName: '帮你推荐', skillList: [
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in',
                    'showType': 'default'
                }
            ]},
            {columnName: '帮你推荐', skillList: [
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in',
                    'showType': 'default'
                }
            ]},
            {columnName: '帮你推荐', skillList: [
                {
                    'skillName': '技能名称',
                    'iconUrl': 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
                    'skillId': '2',
                    'description': '技能描述',
                    'actionType': 'nextSkill',
                    'locationType': 'in'
                }
            ]}
        ]
    });
};
