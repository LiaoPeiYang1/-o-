/**
 * @file utils
 * @author v_zhangyibo01
 */

import _ from 'lodash';

const DEFAULT_SAMPLE_RATE = 16000;

export function sampleData(pcmDatas, pcmSampleRate, newSampleRate, prevChunkInfo = {}) {
    try {
        let index = _.get(prevChunkInfo, 'index', 0);
        let offset = _.get(prevChunkInfo, 'offset', 0);
        let size = 0;

        for (let i = index; i < pcmDatas.length; i++) {
            size += pcmDatas[i].length;
        }

        size = Math.max(0, size - Math.floor(offset));
        let step = pcmSampleRate / newSampleRate;
        // 新采样高于录音采样不处理，省去了插值处理，直接抽样
        if (step > 1) {
            size = Math.floor(size / step);
        }
        else {
            step = 1;
            newSampleRate = pcmSampleRate;
        }

        // 准备数据
        let res = new Int16Array(size);
        let idx = 0;
        for (let nl = pcmDatas.length; index < nl; index++) {
            let o = pcmDatas[index];
            let i = offset;
            let il = o.length;
            while (i < il) {
                let before = Math.floor(i);
                let after = Math.ceil(i);
                let atPoint = i - before;
                res[idx] = o[before] + (o[after] - o[before]) * atPoint;
                idx++;
                // 抽样
                i += step;
            }
            offset = i - il;
        }

        return {
            index: index,
            offset: offset,
            sampleRate: newSampleRate,
            data: res
        };
    }
    catch (error) {
        console.log('转音错误了', error);
    }
};

export function convertBuffer(arrayBuffer) {
    const data = new Float32Array(arrayBuffer);
    const out = new Int16Array(arrayBuffer.length);
    // floatTo16BitPCM
    for (let i = 0; i < data.length; i++) {
        const s = Math.max(-1, Math.min(1, data[i]));
        out[i] = (s < 0 ? s * 0x8000 : s * 0x7FFF);
    }
    return out;
};

// 合并pcm数据
export function encodedPcmBuffer(channelBuffer, sampleRate) {
    const float32array = channelBuffer;
    const float32arrayBuffer = convertBuffer(float32array);
    const Samp = sampleData([float32arrayBuffer], sampleRate, DEFAULT_SAMPLE_RATE, null);
    return Samp.data;
};
