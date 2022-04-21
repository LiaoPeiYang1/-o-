/**
 * @file hooks/useTouchEventCancel
 * @description 阻止touch事件冒泡
 * @author dingyang
 */

import {useCallback, useEffect, useRef} from 'react';

export default () => {
    const touchRef = useRef();

    // 触摸事件添加
    const handleTouchBind = useCallback(e => {
        e.stopPropagation();
    }, []);

    useEffect(() => {
        if (touchRef.current) {
            touchRef.current.addEventListener('touchstart', handleTouchBind, false);
        }

        return () => {
            if (touchRef.current) {
                touchRef.current.removeEventListener('touchstart', handleTouchBind, false);
            }
        };
    }, [handleTouchBind]);

    return {
        touchRef
    };
};
