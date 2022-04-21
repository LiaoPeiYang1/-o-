/**
 * @file actions/api.js API接口集合
 * @author zhangzhe
 */

const TEST_HOST = 'http://gzhxy-rec-xhs-api03.gzhxy.baidu.com:8302';
// const host = __DEV__ ? '' : TEST_HOST; // 后面这个地址到时应该是线上地址

const host = '';

export default {
    // aida
    aidaConfig: `${host}/dh-aida-console/api/aida/bot/client/config/get`,
    aidaChat: `${host}/dh-aida-console/api/us/dm/chat`,
    aidaTrack: `${host}/dh-aida-console/api/aida/message/uploadEvent`
};
