module.exports = () => {
    const timestamp = new Date().getTime();
    return ({
        componentFrontId: timestamp + 3,
        componentId: '51705288-3559-41d6-8870-585a0811f308',
        componentType: 'form',
        resources: [
            {
                resourceFrontId: timestamp + 5,
                resourceId: 'beb7f28d-1d76-448b-9183-ef8ec53ee267',
                resourceType: 'form',
                nextNodeId: '',
                content: {
                    title: '表单标题',
                    caption: '提交按钮',
                    userParams: {'text': 'ck', 'input-phone': '15210830572'},
                    controls: [
                        {
                            id: timestamp + 1,
                            type: 'input',
                            subType: 'text', // text:文本, number:数字, phone: 电话, wechat:微信, qq:QQ
                            label: 'input-text',
                            name: 'input-text',
                            placeholder: '提示语',
                            config: {} // 额外配置
                        },
                        {
                            id: timestamp + 2,
                            type: 'input',
                            subType: 'number', // text:文本, number:数字, phone: 电话, wechat:微信, qq:QQ
                            label: 'input-number',
                            name: 'input-number',
                            placeholder: '提示语',
                            config: {} // 额外配置
                        },
                        {
                            id: timestamp + 3,
                            type: 'input',
                            subType: 'phone', // text:文本, number:数字, phone: 电话, wechat:微信, qq:QQ
                            label: 'input-phone',
                            name: 'input-phone',
                            placeholder: '提示语',
                            config: {} // 额外配置
                        },
                        {
                            id: timestamp + 4,
                            type: 'input',
                            subType: 'wechat', // text:文本, number:数字, phone: 电话, wechat:微信, qq:QQ
                            label: 'input-wechat',
                            name: 'input-wechat',
                            placeholder: '提示语',
                            config: {} // 额外配置
                        },
                        {
                            id: timestamp + 5,
                            type: 'input',
                            subType: 'qq', // text:文本, number:数字, phone: 电话, wechat:微信, qq:QQ
                            label: 'input-qq',
                            name: 'input-qq',
                            placeholder: '提示语',
                            config: {} // 额外配置
                        },
                        {
                            id: timestamp + 6,
                            type: 'select',
                            subType: 'address', // address:地址 default: 其他
                            label: 'select-address',
                            name: 'select-address',
                            placeholder: '提示语'
                        },
                        {
                            id: timestamp + 7,
                            type: 'select',
                            subType: 'default', // address:地址 default: 其他
                            label: 'select-default',
                            name: 'select-default',
                            placeholder: '提示语',
                            config: {
                                options: [
                                    {label: '选项内容', value: '字段取值'}
                                ]
                            } // 额外配置
                        },
                        {
                            id: timestamp + 8,
                            type: 'authorize',
                            subType: 'authorize',
                            name: 'authorize',
                            config: {
                                htmlText: '本人已阅读并同意{"title": "《民生银行公积金信息查看协议》", "url": "xxxx"}所列内容。同时本人郑重申明信息填写准确'
                            } // 额外配置
                        },
                        {
                            id: timestamp + 9,
                            type: 'text',
                            subType: 'text',
                            label: '名称',
                            name: 'text'
                        }
                    ]
                }
            }
        ]
    });
};