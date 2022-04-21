module.exports = () => {
    const timestamp = new Date().getTime();
    const resources = [
        {
            'content': {
                'showComponentType': 'text',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'text',
                        'name': '文本内容',
                        'value': '你好custom兼容多图欢迎来到北京'}
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-1213d66194bf1',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'image',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'imgUrl',
                        'name': '图片地址',
                        'value': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'}
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-1213d66194bf2',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'multiImages',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'multiImages',
                        'name': '图片列表',
                        'value': [
                            {'caption': '你好custom', 'subCaption': '看i闪动覅红薯粉啥的custom', 'imgUrl': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'},
                            {'caption': '你好custom', 'subCaption': '的说法速度发第三方撒地方萨德custom', 'imgUrl': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'}
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-1213d66194bf3',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'showCards',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'showCards',
                        'name': '图片列表',
                        'value': [
                            {'title': '你好cuastom阿斯顿你卡上你打开', 'subCaption': '的说法速度发第三方撒地方萨德custom', 'imgUrl': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'},
                            {'title': '你好cuastom阿斯顿你卡上你打开', 'subCaption': '的说法速度发第三方撒地方萨德custom', 'imgUrl': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'},
                            {'title': '你好cus123t撒打算doma的发生都不拿考试的', 'subCaption': '看i闪动覅红薯粉啥的custom', 'imgUrl': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'},
                            {'title': '你好cuastom阿斯顿你卡上你打开', 'subCaption': '的说法速度发第三方撒地方萨德custom', 'imgUrl': 'http://aida.baidu.com/dh-aida/api/aida/resource/107/20210105e3c87809c7fe40ccb3f2c6a144069394.png'}
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-443c3-4158-ad24-1213d66194bf3',
            'nextNodeId': '132443',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'feed',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'feed',
                        'name': '文本内容',
                        'value': [
                            {
                                'title': '文章标题',
                                'author': '作者名称',
                                'publicTime': '发布时间',
                                'contentType': 4,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            componentFrontId: 'f097124e-123e-12-747b-458b-9ec8-b3ebfee9aeec12',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'feed',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'feed',
                        'name': '文本内容',
                        'value': [
                            {
                                'title': '文章标题',
                                'author': '作者名称',
                                'publicTime': '发布时间',
                                'contentType': 8,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'feed',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'feed',
                        'name': '文本内容',
                        'value': [
                            {
                                'title': '文章标题',
                                'author': '作者名称',
                                'publicTime': '发布时间',
                                infoUrl: 'https://www.baidu.com/',
                                'contentType': 1,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'feed',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'feed',
                        'name': '文本内容',
                        'value': [
                            {
                                'title': '文章标题',
                                'author': '作者名称',
                                'publicTime': '发布时间',
                                infoUrl: 'https://www.baidu.com/',
                                'contentType': 1,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'feed',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'feed',
                        'name': '文本内容',
                        'value': [
                            {
                                'title': 'nihao文章标题',
                                'author': '作者名称',
                                'publicTime': '发布时间',
                                'contentType': 1,
                                'imgUrl': '',
                                'mImageUrl': '',
                                'videoDuration': '12:20',
                                'coverImages': '',
                                infoUrl: 'https://www.baidu.com/',
                                'realUrl': '',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'
                            },
                            {
                                'title': '不同的文章标题',
                                'author': '作者名称',
                                infoUrl: 'https://www.baidu.com/',
                                'publicTime': '发布时间',
                                'contentType': 4,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'

                            },
                            {
                                'title': '不同的文章标题',
                                'author': '作者名称',
                                infoUrl: 'https://www.baidu.com/',
                                'publicTime': '发布时间',
                                'contentType': 4,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'

                            },
                            {
                                'title': '不同的文章标题',
                                'author': '作者名称',
                                infoUrl: 'https://www.baidu.com/',
                                'publicTime': '发布时间',
                                'contentType': 4,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'

                            },
                            {
                                'title': '文章标题',
                                'author': '作者名称',
                                'publicTime': '发布时间',
                                infoUrl: 'https://www.baidu.com/',
                                'contentType': 8,
                                'imgUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'mImageUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'videoDuration': '12:20',
                                'coverImages': '视频封面图',
                                'realUrl': 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                'url': '文章url',
                                'content': '你好啊这是一片文正耳朵内容'

                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'fundPurchase',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'fundPurchase',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'joinUrl': 'https://www.baidu.com/',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'insurePurchase',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'insurePurchase',
                        'name': '文本内容',
                        'value': [
                            {
                                'name': '真好保险',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'imageName': '太平洋',
                                'level': '五星好评',
                                'joinUrl': 'https://www.baidu.com/',
                                'imageUrl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1950103654.jpg',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                'price': '7.66'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'insureCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'insureCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'name': '真好保险',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'imageName': '太平洋',
                                'imageUrl': '',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                'price': '7.66'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'insureCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'insureCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'name': '真好保险',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'imageName': '太平洋',
                                'imageUrl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1950103654.jpg',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                'price': '7.66'
                            },
                            {
                                'name': '真好保险',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'imageName': '太平洋',
                                'imageUrl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1950103654.jpg',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                'price': '7.66'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12qs13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'insureCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'insureCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'name': '真好保险',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'imageName': '太平洋',
                                'imageUrl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1950103654.jpg',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                'price': '7.66'
                            },
                            {
                                'name': '真好保险',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'imageName': '太平洋',
                                'imageUrl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1950103654.jpg',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                'price': '7.66'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12qs13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'incomePurchase',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'incomePurchase',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '热销新品',
                                'name': '真好保·终身防癌症医疗险',
                                'url': 'www.baidu.com',
                                'joinUrl': 'https://www.baidu.com/',
                                'tags': ['三高糖尿病能买', '保障病种无上限', '最高400万保障'],
                                'price': '7.42'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12qs13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'insureCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'insureCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '热销新品',
                                'name': '真好保·终身防癌症医疗险',
                                'url': 'www.baidu.com',
                                'tags': ['三高糖尿病能买', '保障病种无上限'],
                                'price': '7.42'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12qs13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'analysisCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'analysisCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    {label: '总收益（元）', value: 88.88},
                                    {label: '总收益率', value: '21.23%'}
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'analysisTest',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'analysisTest',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    {label: '总收益（元）', value: 88.88},
                                    {label: '总收益率', value: '21.23%'}
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'fundCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'fundCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'experienceCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'experienceCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'level': '优秀',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ],
                                money: '88.88',
                                mobility: '不足',
                                risk: '稳健'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'riskCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'riskCard',
                        'name': '文本内容',
                        'value': [
                            {
                                type: '平衡型',
                                typeDesc: '评估得分56分',
                                infoList: [
                                    {label: '评估渠道', value: '手机银行'},
                                    {label: '评估渠道', value: '手机银行'},
                                    {label: '评估渠道', value: '手机银行'}
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'feedGoods',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'feedGoods',
                        'name': '文本内容',
                        'value': [
                            {
                                sign: '热门爆款',
                                imgUrl: 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                title: '安吉和莫干山高端民宿2天1夜叭叭叭',
                                price: '3777',
                                oldPrice: '12300',
                                joinUrl: 'https://www.baidu.com/'
                            },
                            {
                                sign: '热门爆款',
                                imgUrl: 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                title: '安吉和莫干山高端民宿2天1夜叭叭叭',
                                price: '3777',
                                times: '12',
                                joinUrl: 'https://www.baidu.com/'
                            },
                            {
                                sign: '热门爆款',
                                imgUrl: 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                title: '安吉和莫干山高端民宿2天1夜叭叭叭',
                                price: '3777',
                                oldPrice: '12300',
                                joinUrl: 'https://www.baidu.com/'
                            },
                            {
                                sign: '热门爆款',
                                imgUrl: 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                title: '安吉和莫干山高端民宿2天1夜叭叭叭',
                                price: '3777',
                                times: '6',
                                joinUrl: 'https://www.baidu.com/'
                            },
                            {
                                sign: '热门爆款',
                                imgUrl: 'https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2202547405,4189831400&fm=202&mola=new&crop=v1',
                                title: '安吉和莫干山高端民宿2天1夜叭叭叭',
                                price: '3777',
                                joinUrl: 'https://www.baidu.com/'
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'fundCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'fundCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': '',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        },
        {
            'content': {
                'showComponentType': 'fundRankingCard',
                'showComponentTypeValue': '',
                'params': [
                    {'key': 'fundRankingCard',
                        'name': '文本内容',
                        'value': [
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级/精选牛基',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': '',
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            },
                            {
                                'level': '五星评级',
                                'cardType': '基金/固收/保险',
                                'name': '鹏扬债券A',
                                'description': '20年老将掌舵，七年持续优胜金牛基',
                                'lastThreeYearRatio': {'label': '近三年增长率', 'value': 0.15},
                                'url': '购买页url',
                                'types': {key: 'blend', value: '混合型'},
                                'tags': [
                                    '五星评级',
                                    '16年老牌牛基'
                                ]
                            }
                        ]
                    }
                ]
            },
            'resourceId': '17300ccd-43c3-4158-ad24-12s13d66194bf',
            'nextNodeId': '13243',
            'resourceType': 'custom'
        }
    ];
    return resources.map((item, index) => ({
        componentFrontId: timestamp + index,
        'componentId': 'f0974e3e-747b-458b-9ec8-b3ebfee9aeec',
        'componentType': 'custom',
        'resources': [item]
    }));
};
