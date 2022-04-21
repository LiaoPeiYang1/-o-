/**
 * @file AudioAction
 * @author v_zhangyibo01
 */

import {useCallback, useEffect, useState, useContext, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import useAsr from '../hooks/useAsr';
import Record from '../hooks/record';
import useRecordEvent from '../hooks/record/useRecordEvent';
import {DIALOG_CHAT_TYPE} from 'constants/constants';
import useHeartBeat from '../hooks/useHeartBeat';
import {initRecord} from 'actions';

import {useBotChat} from '../hooks';
import useTrack, {TRACK_TARGET_TYPE} from '../hooks/useTrack';
import {DigitalHumanContext} from '../index';

import './index.less';

export default props => {
    const {onAudioOpenError} = props;
    const [recordBuffer, setRecordBuffer] = useState();
    // 暂存当前的audioContext（为了下次开启时，销毁上次的）
    const [audioContext, setAudioContext] = useState(null);

    const querySendRef = useRef();

    const recordInit = useSelector(state => _.get(state, 'show.recordInit', false));
    const dispatch = useDispatch();

    const {sendMessage} = useBotChat();
    const {sendTrackMessage} = useTrack();

    const {asrText, onInitAsrText, handleWsMessageSend} = useAsr({recordBuffer});

    // 数字人视频播放相关配置
    const {handleCurrentVideoStop} = useContext(DigitalHumanContext);
    // 断句
    const onRecordStop = useCallback(() => {
        // 发送断句
        setTimeout(() => handleWsMessageSend(JSON.stringify({action: 'ASR_INTERRUPT'})), 300);
    }, [handleWsMessageSend]);
    const {canTransfer, handleBtnTouchStop, handleBtnTouchStart} = useRecordEvent({onRecordStop});

    useHeartBeat({handleMessageSend: handleWsMessageSend});
    // 获取录音arrayBuffer集合（监听encodeBuffer）
    const onRecordChange = useCallback(recordBuffer => {
        if (recordBuffer && canTransfer) {
            setRecordBuffer(recordBuffer);
        }
    }, [canTransfer]);
    // 开启录音失败
    const handleRecordError = useCallback(() => onAudioOpenError && onAudioOpenError(), [onAudioOpenError]);

    // 发送用户输入
    const handleQuerySend = useCallback(() => {
        if (asrText) {
            sendMessage({
                type: DIALOG_CHAT_TYPE.TEXT,
                query: asrText
            });
            sendTrackMessage({
                target: 'queryText',
                type: TRACK_TARGET_TYPE.SUBMIT,
                param: asrText
            });
            onInitAsrText('');
        }
    }, [asrText, sendMessage, sendTrackMessage, onInitAsrText]);
    querySendRef.current = handleQuerySend;

    // 更新录音调用权限
    const onRecordSuccess = useCallback(() => {
        !recordInit && dispatch(initRecord());
    }, [recordInit, dispatch]);

    // 每次松开按钮发送Query
    useEffect(() => {
        if (canTransfer) {
            onInitAsrText('');
            handleCurrentVideoStop();
        }
        else {
            const handleQuerySend = querySendRef.current;
            handleQuerySend && handleQuerySend();
        }
    }, [onInitAsrText, canTransfer, handleCurrentVideoStop]);

    const btnCls = canTransfer ? 'btn-enter' : '';
    return (
        <>
            <div className="bd-bot-action-btn-container">
                <div className={`bd-bot-action-control-btn ${btnCls}`}>
                    {canTransfer ? '松开 结束' : '按住 说话'}
                </div>
                <div
                    className="bd-bot-action-control-mask"
                    onTouchStart={handleBtnTouchStart}
                    onTouchEnd={handleBtnTouchStop}
                />
            </div>
            {canTransfer && (
                <div className="bd-bot-action-tip">
                    <p>{asrText || '我在听，请说话'}</p>
                    <div className="tip-wav-icon" />
                </div>
            )}
            {(canTransfer || !recordInit) && (
                <Record
                    audioContext={audioContext}
                    setAudioContext={setAudioContext}
                    onRecordChange={onRecordChange}
                    onRecordSuccess={onRecordSuccess}
                    handleRecordError={handleRecordError}
                />
            )}
        </>
    );
};
