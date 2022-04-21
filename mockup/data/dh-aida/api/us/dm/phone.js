module.exports = () => {
    const timestamp = new Date().getTime();
    return ({
        componentFrontId: '63d72fe0-9df0we-4174-aefa-e7d52d5185a0',
        componentType: 'phone',
        resources: [
            {
                resourceId: '53c384c5-w123-408b-a5a5-aad68e9808b0',
                resourceType: 'userInput',
                nextNodeId: '',
                content: {
                    text: '请输入电话: 默认值',
                    caption: '提交',
                    key: 'phoneNo'
                }
            }
        ]
    });
};
