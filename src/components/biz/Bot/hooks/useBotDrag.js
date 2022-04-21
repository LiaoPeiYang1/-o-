/**
 * @file components/biz/Bot/useBotDrag
 * @desc 滚动的时候机器人显示状态
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import actions from 'actions';
import {uaUtil} from 'utils';

import useBotSpread from './useBotSpread';
import useBotMin from './useBotMin';

const {isIOS, BAIDUHI, getBrowser} = uaUtil;

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
    const isFullScreen = useSelector(state => _.get(state, 'aida.userConfig.isFullScreen'));
    const show = useSelector(state => state.show);
    const {aidaDialogTop, dialogTopWithBuffer, isFocus} = show;
    const avatarBig = isFullScreen || aidaDialogTop;

    const [controlPro, setControlPro] = useState({});

    const dispatch = useDispatch();
    const {spread, setSpread} = useBotSpread();
    const {setMin} = useBotMin();

    const setAidaDialogTop = useCallback(e => {
        dispatch(actions.aidaDialogTop(e));
    }, [dispatch]);

    //  滑动聊天记录的时候是否到顶
    const handleBotDialogScroll = useCallback(element => {
        const {scrollTop, clientHeight, scrollHeight} = element;
        if (scrollTop <= 0) {
            setAidaDialogTop(true);
            return;
        }
        if ((clientHeight <= scrollHeight) && aidaDialogTop) {
            setAidaDialogTop(false);
            return;
        }
        if ((clientHeight > scrollHeight) && !aidaDialogTop) {
            setAidaDialogTop(true);
            return;
        }
    }, [aidaDialogTop, setAidaDialogTop]);

    // 监控手势
    const handleGestureChange = useCallback(dragOptions => {
        isIOS && (document.documentElement.style.overflow = 'hidden');
        const {movement: [mx, my], last} = dragOptions;
        // todo 键盘输入状态 不触发手势滑动
        if (isFocus) {
            return;
        }
        // 折叠
        if (my > controlPro.DISTANCE && spread && last && dialogTopWithBuffer) {
            setSpread(false);
        }
        // 展开
        if (my < -controlPro.DISTANCE && last && !spread) {
            setSpread(true);
        }
        // 最小化
        if (my > controlPro.DISTANCE && !spread && last && dialogTopWithBuffer) {
            setMin(true);
        }
        // // 速速大与的时候直接最小化
        // if (velocity >= SPEED && my > controlPro.MAX_DISTANCE && last) {
        //     setMin(true);
        // }
    }, [spread, dialogTopWithBuffer, isFocus, controlPro, setMin, setSpread]);
    // 百度hi的浏览器手势距离值与普通浏览器不一样
    const getBrowserConfig = useCallback(() => {
        setControlPro(GUESTURE_DISTANCE[getBrowser() || 'DEFAULT']);
    }, []);

    useEffect(() => {
        getBrowserConfig();
    }, [getBrowserConfig]);

    return {
        avatarBig,
        aidaDialogTop,
        setAidaDialogTop,
        handleBotDialogScroll,
        handleGestureChange
    };
};
