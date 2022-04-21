/**
 * @file components/biz/Bot/Entry
 * @desc 机器人最小化悬浮
 * @author v_liaopeiyang
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import actions from 'actions';
import {DISPLAY_DURATION} from 'constants/constants';

import {useBotSpread, useBotMin} from '../hooks';
import {Avatar} from '../widgets';

import './index.less';

export default props => {
    const {onBotMax} = props;

    const isFirstShow = useSelector(state => state.show.isFirstShow);
    const config = useSelector(state => state.aida.serverConfig);
    const {tipSkills, interval, firstTime} = config;
    const intervalTime = interval * 1000 + DISPLAY_DURATION;
    const autoTime = firstTime * 1000 - intervalTime >= 0 ? firstTime * 1000 - intervalTime : 0;

    const [textShow, setTextShow] = useState(false);
    const [textStr, setTextStr] = useState('');

    const dispatch = useDispatch();
    const {setSpread} = useBotSpread();
    const {setMin} = useBotMin();

    const textRef = useRef();
    const loopSessionRef = useRef();
    const textEntryRef = useRef();
    const displayDuration = useRef();

    const handleBotMax = useCallback(() => {
        dispatch(actions.aidaBotFirstShow(false));
        // 点击人像展开的时候，先由无到折叠状态，再折叠状态展开状态
        setMin(false);
        setSpread(true);
        if (onBotMax) {
            setTimeout(() => onBotMax(), 300);
        }
    }, [setMin, setSpread, dispatch, onBotMax]);
    // 定时弹出泡泡
    const showTextPopup = useCallback(e => {
        let index = 0;
        loopSessionRef.current = setInterval(() => {
            if (isFirstShow && index < _.get(e, 'length')) {
                setTextStr(e[index++]);
                setTextShow(true);
                displayDuration.current = setTimeout(() => {
                    setTextShow(false);
                }, DISPLAY_DURATION);
            }
        }, intervalTime);
        if (!isFirstShow) {
            clearInterval(loopSessionRef.current);
        }
    }, [isFirstShow, intervalTime]);
    // 第一次进入延时
    const timerTextShow = useCallback(() => {
        setTimeout(showTextPopup(tipSkills), autoTime);
    }, [tipSkills, autoTime, showTextPopup]);
    // 文字打印效果
    // 目前发现纯css 实现的方式通过改变宽度来一个一个出现文字，这种应用场景一行（不合适）
    // animation.css 有更加花哨的的类似的考虑大小就没安装
    const textEntry = useCallback(() => {
        const textContent = _.get(textStr, 'content', '');
        if (textShow) {
            let index = 0;
            textEntryRef.current = setInterval(() => {
                if (index <= textContent.length) {
                    textRef.current.innerText = textContent.substring(0, index++);
                }
            }, 20);
        }
        else {
            clearInterval(textEntryRef.current);
        }
    }, [textShow, textStr]);

    useEffect(() => {
        textEntry();
    }, [textEntry]);
    useEffect(() => {
        timerTextShow();
        return () => {
            clearInterval(textEntryRef.current);
            clearInterval(loopSessionRef.current);
            clearTimeout(displayDuration.current);
        };
    }, [timerTextShow]);

    return (
        <div className="bd-bot-entry-session">
            <div onClick={handleBotMax}>
                <Avatar className="bd-entry-session-image" size="big" />
            </div>
            {textShow && (
                <div
                    ref={textRef}
                    className="bd-bot-entry-session-text"
                    onClick={handleBotMax}
                />
            )}
        </div>
    );
};
