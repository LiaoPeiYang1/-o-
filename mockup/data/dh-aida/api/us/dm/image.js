module.exports = () => {
    const timestamp = new Date().getTime();
    return {
        componentFrontId: timestamp + 7324,
        componentType: 'image',
        resources: [
            {
                resourceId: timestamp + 423548,
                resourceType: 'image',
                nextNodeId: '1111',
                content: {
                    // imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606397221777&di=dbc39fb107233a57045a1f779b784688&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F52%2F98%2F19300001226280131833989819530.jpg',
                    // imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=12148159,512443507&fm=26&gp=0.jpg',
                    imgUrl: 'https://aida.baidu.com/resource/60/202011171501831f54149ab447eda1c8c2a52036a345.jpg',
                    caption: '标题',
                    subCaption: '我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题'
                }
            },
            {
                resourceId: timestamp + 95454,
                resourceType: 'button',
                nextNodeId: 'uuid:1234',
                content: {
                    caption: '4-16岁',
                    type: 'text',
                    showType: 'highlight',
                    actionType: 'nextNode',
                    locationType: 'in'
                }
            },
            {
                content: {
                    caption: '真的是外教上课吗？',
                    url: 'https://www.baidu.com',
                    winOpenType: '_blank',
                    method: 'GET',
                    showType: 'weak',
                    actionType: 'url',
                    locationType: 'in'
                },
                resourceId: timestamp + 2234225,
                resourceType: 'button'
            }
        ]
    };
};