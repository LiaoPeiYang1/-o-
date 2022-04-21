/**
 * @file Record
 * @author sunwen05
 */

import {useEffect, useCallback, useRef} from 'react';

import useRecord from './useRecord';
import {encodedPcmBuffer} from './utils';


export default (params = {}) => {
    const {
        audioContext: prevAudioContext,
        setAudioContext,
        onRecordChange,
        handleRecordError,
        onRecordSuccess
    } = params;

    const callbackRef = useRef({});

    // useRecord
    // 调用录音失败
    const onRecordError = useCallback(() => handleRecordError && handleRecordError(), [handleRecordError]);
    const {
        recordStream,
        sampleRate,
        audioContext,
        handleStartRecord,
        handleStopRecord
    } = useRecord({onRecordError, onRecordSuccess});

    callbackRef.current = {
        prevAudioContext,
        audioContext,
        setAudioContext,
        handleStartRecord,
        handleStopRecord
    };

    const startRecord = useCallback(async () => {
        const {
            prevAudioContext,
            audioContext,
            setAudioContext,
            handleStartRecord
        } = callbackRef.current;
        // 如果存在上一轮的audioContext，则close它
        if (prevAudioContext) {
            await prevAudioContext.close();
        }
        handleStartRecord();
        // 存储本轮对话的audioContext
        setAudioContext(audioContext);
    }, []);

    useEffect(() => {
        const {handleStopRecord} = callbackRef.current;
        startRecord();
        return () => {
            handleStopRecord();
        };
    }, [startRecord]);

    useEffect(() => {
        if (recordStream) {
            const encodeBuffer = encodedPcmBuffer(recordStream.inputBuffer.getChannelData(0), sampleRate);
            onRecordChange(encodeBuffer);
        }
    }, [recordStream, sampleRate, onRecordChange]);

    return null;
};
