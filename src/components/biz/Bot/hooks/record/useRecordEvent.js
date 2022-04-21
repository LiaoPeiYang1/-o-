/**
 * @file hooks/useRecordEvent
 * @author v_zhangyibo01
 */

import {useCallback, useState, useRef} from 'react';
import {useSwitch} from '@huse/boolean';

// 单位ms
const LIMIT_TIME = 300;

export default (props = {}) => {
    const {onRecordStop} = props;

    // 语音是否可信，当说话不超过300ms认为无效
    const [credible, setCredible] = useState(false);

    // 是否处于拾音的状态
    const [canTransfer, handleTransferStart, handleTransferStop] = useSwitch(false);

    // 记录按下按钮的时间
    const touchStartTimeRef = useRef();
    // 防止多次触发touch
    const flagRef = useRef(false);

    const handleBtnTouchStop = useCallback(() => {
        flagRef.current = false;
        try {
            const now = new Date().getTime();
            const rangeTime = now - touchStartTimeRef.current;
            // 小于三秒
            if (rangeTime > LIMIT_TIME) {
                setCredible(true);
            }
            onRecordStop && onRecordStop();
            setTimeout(() => handleTransferStop(), 300);
        }
        catch (error) {
            // eslint-disable-next-line
            console.log(error);
        }
    }, [onRecordStop, handleTransferStop]);

    const handleBtnTouchStart = useCallback(() => {
        flagRef.current = true;
        touchStartTimeRef.current = new Date().getTime();
        handleTransferStart(true);
        setCredible(false);
    }, [handleTransferStart]);

    return {
        credible,
        canTransfer,
        handleBtnTouchStop,
        handleBtnTouchStart
    };
};
