/**
 * @file hooks/useFreeChat
 * @description 闲时话术【区分pc/h5话术时间】
 * @author dingyang
 */

import {useCallback, useEffect, useRef} from 'react';
import _ from 'lodash';

import {DIALOG_CHAT_TYPE} from 'constants/constants';
import {uaUtil} from 'utils';

import useBotSpread from './useBotSpread';
import useBotMin from './useBotMin';
import useDialogs from './useDialogs';
import useBotChat from './useBotChat';

const {isMobile} = uaUtil;

// 超时时间
const TIMEOUTS = isMobile ? [30000, 60000, 120000] : [60000, 120000, 180000];
// const TIMEOUTS = [5000, 10000, 15000];

export default () => {
    const {spread} = useBotSpread();
    const {min} = useBotMin();
    const {dialogs} = useDialogs();
    const {sendMessage} = useBotChat();

    // 保存倒计时timer
    const timersRef = useRef([]);
    const handleDialogsChangeRef = useRef();

    // 清空定时器
    const clearTimer = useCallback(() => {
        const timers = timersRef.current || [];
        _.forEach(timers, timer => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        });
        timersRef.current = [];
    }, []);

    // 启动定时器
    const triggerTimer = useCallback(() => {
        // 首先做一次timer清空
        clearTimer();

        // 然后启动timer
        _.forEach(TIMEOUTS, (timeout, index) => {
            // 启动定时器
            const timer = setTimeout(() => {
                sendMessage({
                    type: DIALOG_CHAT_TYPE.TIMEOUT,
                    query: '',
                    timeoutType: index + 1
                }, false);
            }, timeout);
            // 保存定时器
            timersRef.current.push(timer);
        });
    }, [sendMessage, clearTimer]);

    const handleShowModeChange = useCallback(() => {
        // 非展开态 || 最小化态 || 会话流为空
        // 此时需要清空
        if (!spread || min) {
            clearTimer();
            return;
        }

        // 此时，需要视情况决定是否重启闲时倒计时
        triggerTimer();
    }, [spread, min, clearTimer, triggerTimer]);

    // dialogs变化触发
    handleDialogsChangeRef.current = useCallback(() => {
        // 非展开态 || 最小化态 || 会话流为空
        // 此时需要清空
        if (!dialogs.length || !spread || min) {
            clearTimer();
            return;
        }

        // 此时，如果最后一个会话节点hitType === ‘timeout’，则不需要处理，直接返回
        const lastDialog = dialogs[dialogs.length - 1];
        const lastDialogHitType = _.get(lastDialog, 'data.hitType');
        if (lastDialogHitType === DIALOG_CHAT_TYPE.TIMEOUT) {
            return;
        }
        // 重启闲时倒计时
        triggerTimer();
    }, [spread, min, dialogs, clearTimer, triggerTimer]);

    useEffect(() => {
        handleShowModeChange();
    }, [handleShowModeChange]);

    useEffect(() => {
        handleDialogsChangeRef.current();
    }, [dialogs, clearTimer, triggerTimer]);

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, [clearTimer]);
};
