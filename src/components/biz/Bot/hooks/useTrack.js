/**
 * @file hooks/useTrack
 * @description 埋点请求
 * @author dingyang
 */

import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import actions from 'actions';
import {UUID} from 'constants/constants';

// eventType
export const TRACK_EVENT_TYPE = {
    CLICK: 'click',
    BLUR: 'blur',
    INPUT: 'input'
};

// targetType
export const TRACK_TARGET_TYPE = {
    CLICK: 'click',
    BLUR: 'blur',
    INPUT: 'input',
    SUBMIT: 'submit'
};

export default (props = {}) => {
    const {init = false} = props;
    const userConfig = useSelector(state => _.get(state, 'aida.userConfig'));

    // 格式化埋点请求参数
    const getFormatParams = useCallback(params => {
        const {type, param, target = '', nodeId} = params;
        if (type === TRACK_TARGET_TYPE.SUBMIT) {
            return {
                event: TRACK_EVENT_TYPE.CLICK,
                eventParams: {
                    eventExt1: nodeId,
                    target: target,
                    value: param
                }
            };
        }
        if (type === TRACK_TARGET_TYPE.BLUR) {
            return {
                event: TRACK_EVENT_TYPE.BLUR,
                eventParams: {
                    eventExt1: nodeId,
                    target: target,
                    value: param
                }
            };
        }
        if (type === TRACK_TARGET_TYPE.CLICK) {
            const {resourceId = ''} = param;
            return {
                event: TRACK_EVENT_TYPE.CLICK,
                eventParams: {
                    eventExt1: nodeId,
                    target: target,
                    value: resourceId
                },
                ...param
            };
        }
    }, []);

    // 埋点
    const sendTrackMessage = useCallback(async params => {
        const requestParams = getFormatParams(params);
        const {botId, skillId, uid} = userConfig;
        const timeStr = Date.parse(new Date());
        await actions.aidTrack({
            event: '',
            eventParams: {
                eventExt1: '',
                target: '',
                value: ''
            },
            eventTime: timeStr,
            extInfo: '',
            headerParams: {
                browser: '',
                platform: '',
                referrer: '',
                screen: '',
                userIp: ''
            },
            pageView: '',
            sessionId: UUID,
            skillId,
            userId: uid,
            botId,
            channel: '',
            ...requestParams
        });
    }, [userConfig, getFormatParams]);

    useEffect(() => {
        if (init && !_.isEmpty(userConfig)) {
            sendTrackMessage({});
        }
    }, [init, userConfig, sendTrackMessage]);

    return {
        sendTrackMessage
    };
};
