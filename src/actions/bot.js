/**
 * @file Action for bot
 * @author dingyang
 */

import _ from 'lodash';

import {request} from 'utils';
import api from 'configure/api';
import {BOT_DIALOG_LIST, BOT_SERVER_CONFIG, BOT_USER_CONFIG, BOT_FORM_LIST} from 'constants/ActionTypes';
import {DIALOG_ITEM_TYPE, DIALOG_ITEM_SUBTYPE} from 'constants/constants';
import {splitResources} from 'components/biz/Bot/helper';

// 获取bot:config配置
export const aidaConfig = params => async dispatch => {
    try {
        const config = await request.post(api.aidaConfig, params);
        dispatch({
            type: BOT_SERVER_CONFIG,
            data: config
        });
    }
    catch (error) {
        throw error;
    }
};

// 1、根据query：text发送请求
export const aidaChat = params => async dispatch => {
    try {
        const replyRes = await request.post(api.aidaChat, params);

        const splitNodes = splitResources(replyRes);

        _.forEach(splitNodes, preNodeInfo => {
            const {delay, nodeInfo} = preNodeInfo;
            const dispatchData = {
                type: BOT_DIALOG_LIST,
                subType: DIALOG_ITEM_TYPE.REPLY,
                data: nodeInfo
            };

            if (delay) {
                setTimeout(() => dispatch(dispatchData), delay * 1000);
            }
            else {
                dispatch(dispatchData);
            }
        });
    }
    catch (error) {
        throw error;
    }
};

// 设置query：text
export const aidaQuery = text => ({
    type: BOT_DIALOG_LIST,
    subType: DIALOG_ITEM_TYPE.QUERY,
    data: {
        resourceType: DIALOG_ITEM_SUBTYPE.TEXT,
        content: {text}
    }
});

// 获取bot:vscode
export const aidaVSCode = async (url, params = {}) => {
    try {
        await request.post(url, params);
    }
    catch (error) {
        throw error;
    }
};

// 埋点添加
export const aidTrack = params => request.post(api.aidaTrack, params, {silent: true});

// 存储用户配置
export const updateUserConfig = userConfig => ({
    type: BOT_USER_CONFIG,
    userConfig
});

// 表单数据及状态存储
export const updateFormDatas = formDatas => ({
    type: BOT_FORM_LIST,
    data: formDatas
});