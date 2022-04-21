module.exports = () => {
    const timestamp = new Date().getTime();
    return (
        {
            componentFrontId: timestamp + 10,
            componentType: 'tag',
            resources: [
                // {
                //     resourceId: timestamp + 11312,
                //     resourceType: 'button',
                //     nextNodeId: '231213213',
                //     content: {
                //         caption: '购买123课程',
                //         type: 'text',
                //         showType: 'top',
                //         actionType: 'nextNode',
                //         locationType: 'in'
                //     }
                // },
                // {
                //     resourceId: timestamp + 134231,
                //     resourceType: 'button',
                //     nextNodeId: '231213213',
                //     content: {
                //         caption: '购买23课程',
                //         type: 'text',
                //         showType: 'top',
                //         actionType: 'nextNode',
                //         locationType: 'in'
                //     }
                // },
                {
                    resourceId: timestamp + 1132432,
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
                    resourceId: timestamp + 12,
                    resourceType: 'button'
                }
            ]
        }
    );
};
