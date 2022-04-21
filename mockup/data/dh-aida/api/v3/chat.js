/**
* @file mockup for
* @author dingyang
*/

module.exports = (path, params, mockup) => {
    const timestamp = new Date().getTime();
    // 初始化节点
    if (params.type === 'init') {
        return mockup.ok({
            nodeId: timestamp + 1,
            caption: 'Welcome Message',
            type: 'init',
            components: [
                {
                    componentId: timestamp + 2,
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
                },
                {
                    componentId: timestamp + 2222,
                    componentType: 'text',
                    resources: [
                        {
                            resourceId: timestamp + 2223,
                            resourceType: 'text',
                            nextNodeId: 'uuid:1234',
                            content: {
                                showType: 'highlight',
                                text: '猜您想问：'
                            }
                        },
                        {
                            content: {
                                showType: 'weak',
                                caption: '为什么这么便宜？',
                                url: 'https://www.baidu.com',
                                winOpenType: '_blank',
                                method: 'GET',
                                actionType: 'url',
                                locationType: 'in'
                            },
                            resourceId: timestamp + 2224,
                            resourceType: 'button'
                        },
                        {
                            content: {
                                showType: 'weak',
                                caption: '真的是外教上课吗？',
                                url: 'https://www.baidu.com',
                                winOpenType: '_blank',
                                method: 'GET',
                                actionType: 'nextNode',
                                locationType: 'in'
                            },
                            nextNodeId: 'uuid:123224',
                            resourceId: timestamp + 2225,
                            resourceType: 'button'
                        }
                    ]
                },
                // {
                //     componentId: timestamp + 4,
                //     componentType: 'delay',
                //     resources: [
                //         {
                //             resourceId: '39c3765e-09e0-4dfb-83ae-99f63ab9fb40',
                //             resourceType: 'delay',
                //             nextNodeId: 'uuid:1234',
                //             content: {
                //                 time: 1
                //             }
                //         }
                //     ]
                // },
                {
                    componentId: timestamp + 7324,
                    componentType: 'image',
                    resources: [
                        {
                            resourceId: timestamp + 423548,
                            resourceType: 'image',
                            nextNodeId: '1111',
                            content: {
                                imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606397221777&di=dbc39fb107233a57045a1f779b784688&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F52%2F98%2F19300001226280131833989819530.jpg',
                                // imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=12148159,512443507&fm=26&gp=0.jpg',
                                // imgUrl: 'https://aida.baidu.com/resource/60/202011171501831f54149ab447eda1c8c2a52036a345.jpg',
                                caption:'标题',
                                subCaption:'我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题',
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
                },
                {
                    componentId: timestamp + 7723477,
                    componentType: 'multiImages',
                    components: [
                        {
                            componentId: timestamp + 78324281,
                            componentType: 'image',
                            resources: [
                                {
                                    resourceId: timestamp + 7883242,
                                    resourceType: 'image',
                                    nextNodeId: '1111',
                                    content: {
                                        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606397221777&di=dbc39fb107233a57045a1f779b784688&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F52%2F98%2F19300001226280131833989819530.jpg',
                                        // imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=12148159,512443507&fm=26&gp=0.jpg',
                                        // imgUrl: 'https://aida.baidu.com/resource/60/202011171501831f54149ab447eda1c8c2a52036a345.jpg',
                                        caption:'标题',
                                        subCaption:'我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题',
                                    }
                                },
                                {
                                    resourceId: timestamp + 7423883,
                                    resourceType: 'button',
                                    nextNodeId: 'uuid:1234',
                                    content: {
                                        showType: 'highlight',
                                        caption: '4-16岁',
                                        actionType: 'nextNode',
                                        locationType: 'in'
                                    }
                                }
                            ]
                        },
                        {
                            componentId: timestamp + 793491,
                            componentType: 'image',
                            resources: [
                                {
                                    resourceId: timestamp + 7932492,
                                    resourceType: 'image',
                                    nextNodeId: '1111',
                                    content: {
                                        // imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606397221777&di=dbc39fb107233a57045a1f779b784688&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F52%2F98%2F19300001226280131833989819530.jpg',
                                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=12148159,512443507&fm=26&gp=0.jpg',
                                        // imgUrl: 'https://aida.baidu.com/resource/60/202011171501831f54149ab447eda1c8c2a52036a345.jpg',
                                        caption:'标题',
                                        subCaption:'我是图片描述或者副标题我标题',
                                    }
                                },
                                {
                                    resourceId: timestamp + 7993,
                                    resourceType: 'button',
                                    nextNodeId: 'uuid:1234',
                                    content: {
                                        caption: '17-26岁',
                                        showType: 'highlight',
                                        actionType: 'nextNode',
                                        locationType: 'in'
                                    }
                                }
                            ]
                        },
                        {
                            componentId: timestamp + 7932494,
                            componentType: 'image',
                            resources: [
                                {
                                    resourceId: timestamp + 7993245,
                                    resourceType: 'image',
                                    nextNodeId: '1111',
                                    content: {
                                        // imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606397221777&di=dbc39fb107233a57045a1f779b784688&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F52%2F98%2F19300001226280131833989819530.jpg',
                                        // imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=12148159,512443507&fm=26&gp=0.jpg',
                                        imgUrl: 'https://aida.baidu.com/resource/60/202011171501831f54149ab447eda1c8c2a52036a345.jpg',
                                        caption:'标题',
                                        subCaption:'我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题我是图片描述或者副标题',
                                    }
                                },
                                {
                                    resourceId: timestamp + 793496,
                                    resourceType: 'button',
                                    nextNodeId: 'uuid:1234',
                                    content: {
                                        caption: '1-3岁',
                                        showType: 'highlight',
                                        actionType: 'nextNode',
                                        locationType: 'in'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    componentId: timestamp + 10,
                    componentType: 'tag',
                    resources: [
                        {
                            resourceId: timestamp + 11,
                            resourceType: 'button',
                            nextNodeId: '231213213',
                            content: {
                                caption: '购买课程',
                                type: 'text',
                                showType: 'highlight',
                                actionType: 'nextNode',
                                locationType: 'in'
                            }
                        },
                        {
                            resourceId: timestamp + 12,
                            resourceType: 'button',
                            nextNodeId: '231213213',
                            content: {
                                caption: '购买课程',
                                type: 'text',
                                showType: 'highlight',
                                actionType: 'nextNode',
                                locationType: 'in'
                            }
                        },
                        {
                            resourceId: timestamp + 13,
                            resourceType: 'button',
                            nextNodeId: '231213213',
                            content: {
                                caption: '购买课程',
                                type: 'text',
                                showType: 'highlight',
                                actionType: 'nextNode',
                                locationType: 'in'
                            }
                        },
                        {
                            resourceId: timestamp + 14,
                            resourceType: 'button',
                            nextNodeId: '231213213',
                            content: {
                                caption: '购买课程',
                                type: 'text',
                                showType: 'highlight',
                                actionType: 'nextNode',
                                locationType: 'in'
                            }
                        },
                        {
                            content: {
                                caption: '测试一把',
                                url: 'https://www.baidu.com',
                                winOpenType: '_blank',
                                method: 'GET',
                                showType: 'default',
                                actionType: 'url',
                                locationType: 'in'
                            },
                            resourceId: timestamp + 15,
                            resourceType: 'button'
                        }
                    ]
                },
                {
                    componentId: timestamp + 222322,
                    componentType: 'text',
                    resources: [
                        {
                            resourceId: timestamp + 224233,
                            resourceType: 'text',
                            nextNodeId: 'uuid:1234',
                            content: {
                                text: '预约免费试听课需要留下您的手机号，请在下方输入：'
                            }
                        }
                    ]
                },
                {
                    componentId: '63d72fe0ss-9df0-4174-aefa-e7d52d5185a0',
                    componentType:'phoneVscode',
                    resources:[
                        {
                            resourceId: '53c384we2c5-eb60-408b-a5a5-aad68e9808b0',
                            resourceType: 'userInput',
                            nextNodeId: '',
                            content: {
                                text: '请输入电话: 默认值',
                                caption: '提交',
                                key: 'phone',
                                vsCodeUrl: 'http://www.baidu.com',
                                vsCodeKey: 'vscode'
                            }
                        }
                    ]
                }
            ]
        });
    }

    if (params.content.indexOf('购买课程') > -1) {
        return mockup.ok({
            nodeId: timestamp + 13,
            caption: 'Welcome Message',
            type: 'default',
            components: [
                {
                    componentId: timestamp + 16,
                    componentType: 'text',
                    resources: [
                        {
                            resourceId: timestamp + 17,
                            resourceType: 'text',
                            nextNodeId: 'uuid:1234',
                            content: {
                                text: '您好，您家宝宝今年几岁呢？（周岁）'
                            }
                        },
                        {
                            resourceId: timestamp + 18,
                            resourceType: 'button',
                            nextNodeId: 'uuid:1234',
                            content: {
                                showType: 'default',
                                caption: '1~3岁',
                                type: 'text',
                                actionType: 'nextNode',
                                locationType: 'out'
                            }
                        },
                        {
                            resourceId: timestamp + 19,
                            resourceType: 'button',
                            nextNodeId: 'uuid:1234',
                            content: {
                                showType: 'default',
                                caption: '4~16岁',
                                type: 'text',
                                actionType: 'nextNode',
                                locationType: 'out'
                            }
                        }
                    ]
                }
            ]
        });
    }

    if (params.content.indexOf('1~3') > -1) {
        return mockup.ok({
            nodeId: timestamp + 22,
            caption: 'Welcome Message',
            type: 'default',
            components: [
                {
                    componentId: timestamp + 23,
                    componentType: 'text',
                    resources: [
                        {
                            resourceId: timestamp + 24,
                            resourceType: 'text',
                            nextNodeId: 'uuid:1234',
                            content: {
                                text: '太好了，恭喜您被系统抽中为本期大奖用户，您在哪个城市？'
                            }
                        },
                        {
                            resourceId: timestamp + 25,
                            resourceType: 'button',
                            nextNodeId: 'uuid:1234',
                            content: {
                                showType: 'default',
                                caption: '上海',
                                type: 'text',
                                actionType: 'nextNode',
                                locationType: 'out'
                            }
                        },
                        {
                            resourceId: timestamp + 26,
                            resourceType: 'button',
                            nextNodeId: 'uuid:1234',
                            content: {
                                showType: 'default',
                                caption: '北京',
                                type: 'text',
                                actionType: 'nextNode',
                                locationType: 'out'
                            }
                        },
                        {
                            resourceId: timestamp + 27,
                            resourceType: 'button',
                            nextNodeId: 'uuid:1234',
                            content: {
                                showType: 'default',
                                caption: '青岛',
                                type: 'text',
                                actionType: 'nextNode',
                                locationType: 'out'
                            }
                        }
                    ]
                }
            ]
        });
    }

    return mockup.ok({
        nodeId: timestamp + 28,
        caption: 'Welcome Message',
        type: 'default',
        components: [
            {
                componentId: timestamp + 29,
                componentType: 'text',
                resources: [
                    {
                        resourceId: timestamp + 30,
                        resourceType: 'text',
                        nextNodeId: 'uuid:1234',
                        content: {
                            text: params.content || '默认内容'
                        }
                    }
                ]
            },
            {
                componentId: timestamp + 31,
                componentType: 'text',
                resources: [
                    {
                        resourceId: timestamp + 32,
                        resourceType: 'text',
                        nextNodeId: 'uuid:1234',
                        content: {
                            text: params.content || '默认内容'
                        }
                    }
                ]
            }
        ]
    });
}
