module.exports = () => {
    const timestamp = new Date().getTime();
    return ({
        componentFrontId: timestamp + 2,
        componentType: 'text',
        resources: [
            {
                resourceId: timestamp + 3,
                resourceType: 'text',
                nextNodeId: 'uuid:1234',
                content: {
                    text: '双十一培优课限时特价只要1899元，现在购买还会赠送智能学习机、纸质教辅，请问您要考虑一下吗？'
                }
            },
            {
                resourceId: timestamp + 110,
                resourceType: 'button',
                nextNodeId: 'uuid:1234',
                content: {
                    showType: 'default',
                    caption: '帮我介绍',
                    type: 'text',
                    actionType: 'nextNode',
                    locationType: 'in'
                }
            },
            {
                resourceId: timestamp + 111,
                resourceType: 'button',
                content: {
                    showType: 'highlight',
                    caption: '直接办卡',
                    url: 'https://www.baidu.com',
                    winOpenType: '_blank',
                    method: 'GET',
                    actionType: 'url',
                    locationType: 'in'
                }
            }
        ]
    });
};
