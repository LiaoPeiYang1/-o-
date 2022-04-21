/**
 * @file hooks/useRecord
 * @author sunwen05
 */

import {useRef, useState, useCallback, useMemo} from 'react';
import {Toast} from 'antd-mobile';
import {useUserMedia} from '@huse/user-media';

const DEFAULT_SAMPLE_RATE = 16000;

export default (params = {}) => {
    const {recordConstraints, onRecordError, defaultSampleRate = DEFAULT_SAMPLE_RATE, onRecordSuccess} = params;

    // pcm音频流
    const [recordStream, setRecordStream] = useState();
    const [sampleRate, setSampleRate] = useState(defaultSampleRate);

    // 存储processor
    const processorRef = useRef();
    const sourceRef = useRef();
    // 存储是否录音中状态
    const recordingRef = useRef(false);

    // audioContext
    const audioContext = useMemo(() => new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: defaultSampleRate
    }), [defaultSampleRate]);

    // 录音constraints
    const constraints = {
        video: false,
        audio: {
            sampleRate: defaultSampleRate,
            sampleSize: 16,
            channelCount: 1,
            ...recordConstraints
        }
    };
    // 开始录音后处理音频流
    const handleAudioprocess = useCallback(stream => {
        if (recordingRef.current) {
            setRecordStream(stream);
        }
    }, []);
    // 录音开启成功回调
    const handleRecordSuccess = useCallback(async stream => {
        // 创建音频处理的源节点
        const source = audioContext.createMediaStreamSource(stream);
        sourceRef.current = source;
        // 创建音频处理的输出节点，构造参数依次为缓冲区大小，输入通道数，输出通道数
        const processor = audioContext.createScriptProcessor(1024, 1, 1);
        processorRef.current = processor;
        // 链接音频
        source.connect(processor);
        // destination表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        processor.connect(audioContext.destination);

        // 设置sampleRate
        setSampleRate(audioContext.sampleRate);

        // 判断当前audioContext的状态
        // 因为audioContext被放到了全局，所以在回调中，状态会变为挂载，所以需要resume()重启
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        processor.onaudioprocess = handleAudioprocess;
        onRecordSuccess && onRecordSuccess();
    }, [audioContext, handleAudioprocess, onRecordSuccess]);
    // 录音开启失败回调
    const handleDefaultRecordError = useCallback(error => {
        Toast.fail(`调起录音失败: ${error.message}`);
    }, []);
    const {start: startRecord, stop: stopRecord, recording}
        = useUserMedia(constraints, handleRecordSuccess, onRecordError || handleDefaultRecordError);
    recordingRef.current = recording;

    return {
        recordStream,
        sampleRate,
        audioContext,
        handleStartRecord: startRecord,
        handleStopRecord: stopRecord
    };
};
