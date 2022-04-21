/**
 * @file hooks/useBotMin
 * @description 监控  最小化
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useCallback, useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import actions from 'actions';
import {uaUtil} from 'utils';

import useBotSpread from './useBotSpread';

const {isIOS, BAIDUHI} = uaUtil;

// hi浏览器配置, 以及默认配置
export const GUESTURE_DISTANCE = {
    [BAIDUHI]: {
        DISTANCE: 100,
        MAX_DISTANCE: 300
    },
    DEFAULT: {
        DISTANCE: 10,
        MAX_DISTANCE: 50
    }
};

export default () => {
    const min = useSelector(state => state.show.min);
    const isFullScreen = useSelector(state => _.get(state, 'aida.userConfig.isFullScreen'));

    // 记录数据实现先实现动画再卸载dom
    const [minAnimating, setMinAnimating] = useState(true);

    const dispatch = useDispatch();
    const autoMinTimerRef = useRef();
    const {spread, setSpread} = useBotSpread();

    // 监听是否打开输入法
    const setIsFocus = useCallback(isFocus => {
        dispatch(actions.aidaInputFocus(isFocus));
    }, [dispatch]);
    // 监听是否最小化
    const setMin = useCallback(min => {
        clearTimeout(autoMinTimerRef.current);
        dispatch(actions.aidaMin(min));
    }, [dispatch]);
    // 无操作时候自动关闭
    const minBot = useCallback(() => {
        clearTimeout(autoMinTimerRef.current);
        if (!spread) {
            autoMinTimerRef.current = setTimeout(() => {
                setMin(true);
            }, 5000);
        }
    }, [spread, setMin]);
    // 手势结束
    const setTouchEnd = useCallback(() => {
        isIOS && (document.documentElement.style.overflow = 'inherit');
    }, []);
    // 最小化会话框
    const changeBotShowStyle = useCallback(() => {
        // 展开状态：
        // 折叠状态：直接执行
        if (spread) {
            setSpread(false);
        }
        else {
            setMin(true);
        }
    }, [spread, setSpread, setMin]);

    // 全屏直接最小化
    const handleControlBotClose = useCallback(() => {
        setSpread(false);
        setTimeout(() => setMin(true), 200);
    }, [setSpread, setMin]);

    useEffect(() => {
        return () => {
            clearTimeout(autoMinTimerRef.current);
        };
    }, []);
    useEffect(() => {
        minBot();
    }, [minBot]);
    // 监控最小化的状态 动画走完再消失
    useEffect(() => {
        clearTimeout(autoMinTimerRef.current);
        if (isFullScreen) {
            setMinAnimating(min);
            return;
        }
        if (min) {
            setTimeout(() => {
                setMinAnimating(min);
                setIsFocus(false);
            }, 100);
        }
        else {
            setTimeout(() => {
                setMinAnimating(min);
            }, 200);
        }
    }, [min, isFullScreen, setIsFocus]);

    return {
        min,
        setMin,
        minAnimating,
        setMinAnimating,
        setIsFocus,
        changeBotShowStyle,
        setTouchEnd,
        handleControlBotClose
    };
};
