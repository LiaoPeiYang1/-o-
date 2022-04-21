/**
 * @file useNodeDigitalHumanConfig 节点数字人配置
 * @author sunwen05
 */

import {useMemo, useState, useEffect, useRef} from 'react';
import _ from 'lodash';

import {DIGITAL_HUMAN_MODE_TYPE} from 'constants/constants';

import {px2rem} from '../../helper';
import useNodeLastReply from './useNodeLastReply';
import useLayoutSize from '../useLayoutSize';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
// 半屏尺寸配置
export const DIGITAL_HUMAN_HALF_SIZE = {
    width: 343 * DEVICE_PIXEL_RATIO,
    height: 176 * DEVICE_PIXEL_RATIO,
    display: {
        width: px2rem(343),
        height: px2rem(176),
        margin: `${px2rem(14.5)} 0`
    }
};

export default () => {
    // video是否存在
    const [digitalHumanExist, setDigitalHumanExist] = useState(false);

    // timeout
    const timerRef = useRef();

    // 获取最后一个reply节点
    const lastReplyNode = useNodeLastReply();
    const {clientWidth, clientHeight} = useLayoutSize();

    // 处理模式
    const modeType = _.get(lastReplyNode, 'digitalHumanConfig.modeType') || 'static';
    // 获取当前播放视频
    const currentVideoUrl = _.get(lastReplyNode, 'digitalHumanConfig.url');
    // 获取下节点预缓存视频
    const preloadVideoUrls = useMemo(() => (
        _.map(_.get(lastReplyNode, 'nextNodeVideoInfo', []), data => data.url)
    ), [lastReplyNode]);
    // 当前节点数字人是否存在
    const currentDigitalHumanExist = modeType !== DIGITAL_HUMAN_MODE_TYPE.STATIC;
    // 数字人video的size
    const videoSize = modeType === DIGITAL_HUMAN_MODE_TYPE.FULL ? {
        width: clientWidth,
        height: clientHeight
    } : DIGITAL_HUMAN_HALF_SIZE;

    // 延迟1s使内容消失，为了展示动画效果
    useEffect(() => {
        if (currentDigitalHumanExist) {
            setDigitalHumanExist(currentDigitalHumanExist);
        }
        else {
            timerRef.current = setTimeout(() => setDigitalHumanExist(false), 1000);
        }
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [currentDigitalHumanExist]);

    return {
        lastReplyNode,
        modeType,
        currentVideoUrl,
        preloadVideoUrls,
        videoSize,
        digitalHumanExist,
        currentDigitalHumanExist
    };
};
