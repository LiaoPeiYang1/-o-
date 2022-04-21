module.exports = () => {
    const digitalHumanUrl = `https://bj.bcebos.com/cctv-faq/haokan/question_${parseInt(Math.random() * 24 + 1, 10)}_0.mp4`;
    const ALL_DIGITAL_MODE_TYPE = ['', 'head', 'half', 'full'];
    // const digitalHumanModeType = ALL_DIGITAL_MODE_TYPE[parseInt(Math.random() * 4, 10)];
    const digitalHumanModeType = ALL_DIGITAL_MODE_TYPE[3];
    return {
        digitalHumanConfig: {
            modeType: digitalHumanModeType, // head/halfScreen/fullScreen 对应：头像/半身/全屏
            speak: '2020年是脱贫攻坚决战决胜之年，实现第一个百年奋斗目标是什么？',
            drml: '',
            url: digitalHumanUrl
        },
        nextNodeVideoInfo: [{
            nodeId: 'nodeId1',
            info: {
                speak: '欢迎来到国家广电总局指导，百度党委、好看视频、百度云承办的“了不起的中国”智能答题活动，回顾辉煌成就，迈向新征程，开始你的挑战吧！',
                url: digitalHumanUrl
            }
        }]
    };
};
