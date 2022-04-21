/**
 * @file components/biz/Bot/ZoneAction
 * @desc 机器人对话底部需要用户操作的actions
 * @author dingyang
 */

import _ from 'lodash';
import {useCallback, useRef, useState, useMemo, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {InputItem, Toast} from 'antd-mobile';
import {useToggle} from '@huse/boolean';

import {DIALOG_CHAT_TYPE} from 'constants/constants';
import Icon from 'components/biz/Icon';
import {uaUtil} from 'utils';

import {
    useBotMin,
    useBotChat,
    useNavigation,
    useBotSpread
} from '../hooks';
import useDocumentBan from '../hooks/useDocumentBan';
import useTrack, {TRACK_TARGET_TYPE} from '../hooks/useTrack';
import ShortActions from './ShortActions';
import Navigation from '../Navigation';
import AudioAction from '../AudioAction';

import './index.less';

const {phoneType} = uaUtil;
const PADDING_BOTTOM_SIZE = phoneType.isIPhoneX() ? 'lg' : 'md';

const canRecordGet = () => {
    try {
        if (navigator.mediaDevices?.getUserMedia
            || navigator.webkitGetUserMedia?.getUserMedia
            || navigator.mozGetUserMedia?.getUserMedia) {
            return true;
        }
        return false;
    }
    catch (error) {
        Toast.fail('getUserMedia is not implemented in this browser');
        return false;
    }
};

export default () => {
    const isFullScreen = useSelector(state => _.get(state, 'aida.userConfig.isFullScreen'));
    const skillNavigationStatus = useSelector(state => state.aida.serverConfig.skillNavigationStatus);

    const [queryText, setQueryText] = useState('');
    // 音频打开失败
    const [audioOpenError, setAudioOpenError] = useState(false);

    const [showControl, handleControlToogle] = useToggle(false);
    const [inputControl, handleControlTypeToogle] = useToggle(true);

    const {spread} = useBotSpread();
    const {sendMessage} = useBotChat();
    const {setIsFocus} = useBotMin();
    const {sendTrackMessage} = useTrack();
    const {navigationVisible, setNavigationVisible} = useNavigation();

    const inputRef = useRef();
    const banLongTouchRef = useRef();

    useDocumentBan(banLongTouchRef.current);
    // 发送用户输入
    const handleQuerySend = useCallback(() => {
        if (queryText) {
            sendMessage({
                type: DIALOG_CHAT_TYPE.TEXT,
                query: queryText
            });
            sendTrackMessage({
                target: 'queryText',
                type: TRACK_TARGET_TYPE.SUBMIT,
                param: queryText
            });
            setQueryText('');
        }
    }, [queryText, sendMessage, sendTrackMessage]);
    const handleInputBlur = useCallback(() => {
        setIsFocus(false);
        sendTrackMessage({
            target: 'queryText',
            type: TRACK_TARGET_TYPE.BLUR,
            param: queryText
        });
    }, [queryText, setIsFocus, sendTrackMessage]);
    // 技能导航
    const SkillNavigationComp = useMemo(() => {
        if (!skillNavigationStatus || !isFullScreen) {
            return null;
        }
        return (
            <div
                className="bd-bot-action-add"
                onClick={() => setNavigationVisible(!navigationVisible)}
            >
                <Icon tag={navigationVisible ? 'down' : 'add'} />
            </div>
        );
    }, [skillNavigationStatus, isFullScreen, navigationVisible, setNavigationVisible]);

    useEffect(() => {
        audioOpenError && handleControlTypeToogle();
    }, [audioOpenError, handleControlTypeToogle]);

    const controlCls = showControl ? 'control-container-open' : 'control-container-close';
    const controlTypeCls = inputControl ? 'bd-bot-action-audio-icon' : 'bd-bot-action-input-icon';
    const canRecord = canRecordGet();
    return (
        <div className="bd-bot-action-zone" ref={banLongTouchRef}>
            {showControl && spread && <ShortActions />}
            <Navigation />

            <div className={`bd-bot-action-input-container ${controlCls} size-${PADDING_BOTTOM_SIZE}`}>
                {showControl ? (
                    <>
                        {canRecord && !audioOpenError && (
                            <i
                                className={`bd-bot-action-icon ${controlTypeCls}`}
                                onClick={handleControlTypeToogle}
                            />
                        )}
                        {inputControl ? (
                            <InputItem
                                className="bd-bot-action-input"
                                ref={inputRef}
                                type="text"
                                value={queryText}
                                placeholder="请输入您想要咨询的问题"
                                onChange={value => setQueryText(value)}
                                onFocus={() => setIsFocus(true)}
                                onBlur={handleInputBlur}
                            />
                        ) : <AudioAction onAudioOpenError={() => setAudioOpenError(true)} />}
                        {queryText && inputControl ? (
                            <div className="bd-bot-action-send" onClick={handleQuerySend}>
                                <Icon tag="send" />
                            </div>
                        ) : (
                            // 收起
                            <div className="bd-bot-action-back" onClick={handleControlToogle}>
                                <Icon tag="packUp" />
                            </div>
                        )}
                        {SkillNavigationComp}
                    </>
                ) : (
                    <div className="bd-bot-action-open-container">
                        <i className="bd-bot-action-icon bd-bot-action-input-icon" onClick={handleControlToogle} />
                        {spread && <ShortActions />}
                    </div>
                )}
            </div>
        </div>
    );
};
