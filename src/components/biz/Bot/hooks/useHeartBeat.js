/**
 * @file useHeartBeat
 * @author v_zhangyibo01
 */

import {useCallback} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useInterval} from '@huse/timeout';

// 心跳间隔 3 S
const RESTART_INTERVAL_TIME = 3;

export default (params = {}) => {
    const {handleMessageSend} = params;

    const heartBeat = useCallback(() => {
        handleMessageSend(JSON.stringify({
            action: 'HEART_BEAT',
            requestId: uuidv4()
        }));
    }, [handleMessageSend]);

    // 3秒钟发送一次心跳
    useInterval(heartBeat, RESTART_INTERVAL_TIME * 1000);
};
