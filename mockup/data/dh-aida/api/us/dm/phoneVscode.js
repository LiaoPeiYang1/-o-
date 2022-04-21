module.exports = () => {
    const timestamp = new Date().getTime();
    return ({
        componentFrontId: '63d72fe0ss-9df0-4174-aefa-e7d52d5185a0',
        componentType: 'phoneVscode',
        resources: [
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
    });
};
