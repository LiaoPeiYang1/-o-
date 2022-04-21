/**
 * @file hooks/useBotSpread
 * @description 展开收起
 * @author dingyang
 */

import {useCallback, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import actions from 'actions';
import {uaUtil, classUtil} from 'utils';

const {addClass, removeClass} = classUtil;
const {browserType, isIOS} = uaUtil;
const BAIDUHIDELAYED = 150;

export default (initial = false) => {
    const show = useSelector(state => state.show);
    const {min, spread} = show;

    const dispatch = useDispatch();
    const scrollTopRef = useRef(0);
    const timerRef = useRef();

    // 监听是否展开
    const setSpread = useCallback(isSpread => {
        dispatch(actions.aidaSpread(isSpread));
    }, [dispatch]);

    // 折叠态部分元件点击展开(多个地方引用)
    const spreadBot = useCallback((isSpread = true) => {
        if (isSpread && !spread) {
            setSpread(true);
        }
        else if (!isSpread && spread) {
            setSpread(false);
        }
    }, [spread, setSpread]);

    // 滚动穿透相关处理
    const scrollLock = useCallback(() => {
        const scrollTop = document.scrollingElement.scrollTop;
        scrollTopRef.current = scrollTop;
        addClass(document.body, 'modal-open');
        isIOS && addClass(document.body, 'with-hidden');
        document.body.style.top = -scrollTop + 'px';
    }, []);

    // 清除滚动穿透相关处理
    const unScrollLock = useCallback(() => {
        const scrollTop = scrollTopRef.current;
        removeClass(document.body, 'modal-open');
        isIOS && removeClass(document.body, 'with-hidden');
        document.scrollingElement.scrollTop = scrollTop;
    }, []);

    // 当前bot是否弹起，如果页面弹起，需要禁用
    const handleMinChange = useCallback(() => {
        clearTimeout(timerRef.current);
        if (min) {
            // 处理滚动穿透处理方案与百度hi上动画冲突
            if (browserType.isBAIDUHI) {
                timerRef.current = setTimeout(() => {
                    unScrollLock();
                }, BAIDUHIDELAYED);
            }
            else {
                unScrollLock();
            }
        }
        else {
            scrollLock();
        }
    }, [min, unScrollLock, scrollLock]);

    useEffect(() => {
        // 首次进入需要保存业务层body-overflow属性样式
        initial && handleMinChange();
    }, [initial, handleMinChange]);

    return {
        spread,
        setSpread,
        spreadBot
    };
};
