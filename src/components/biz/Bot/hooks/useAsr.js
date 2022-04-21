/**
 * @file useAsr
 * @author v_zhangyibo01
 */

import _ from 'lodash';
import {useState, useEffect, useMemo} from 'react';
import {useWebSocket} from '@huse/web-socket';
import {Toast} from 'antd-mobile';

import {getWsUrl} from '../helper';

export default props => {
    const {recordBuffer} = props;

    const [asrText, setAsrText] = useState('');

    // 获取ws的url
    const wsUrl = useMemo(() => getWsUrl(), []);

    const options = useMemo(() => ({
        reconnectOnClose(closeEvent) {
            // Judge closeEvent to return a boolean
            console.log('---closeEvent---', closeEvent);
            return true;
        },
        reconnectInterval: 3000,
        reconnectAttempts: Number.MAX_SAFE_INTEGER
    }), []);

    // ASR Websocket
    const {
        sendMessage: handleWsMessageSend,
        lastMessage,
        readyState
    } = useWebSocket(wsUrl, options);

    useEffect(() => {
        if (lastMessage) {
            try {
                const msg = JSON.parse(lastMessage.data);
                if (_.isEmpty(msg)) {
                    return;
                }
                console.log('ASR接收数据：', msg);
                const {success, message: errorMsg, result} = msg;
                if (!success) {
                    Toast.fail(`ASR失败：${errorMsg}，请重试`);
                    return;
                }
                const {asrResult} = result;
                // 将识别结果回填输入框
                setAsrText(asrResult);
            }
            catch (error) {
                Toast.fail(error);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (recordBuffer && readyState === 1) {
            handleWsMessageSend(recordBuffer);
        }
    }, [recordBuffer, readyState]);

    return {
        asrText,
        onInitAsrText: setAsrText,
        handleWsMessageSend
    };
};
