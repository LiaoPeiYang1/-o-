/**
 * @file reducers/aida.js
 * @author dingyang
 */

import {combineReducers} from 'redux';
import _ from 'lodash';

import {
    BOT_DIALOG_LIST,
    BOT_SERVER_CONFIG,
    BOT_USER_CONFIG,
    BOT_FORM_LIST
} from 'constants/ActionTypes';

const initialState = {
    // 机器人config配置项
    serverConfig: {},
    // 用户数字人配置
    userConfig: {},
    // 会话数据
    dialogs: [],
    // 表单数据状态
    forms: {}
};

// 机器人config配置项
const serverConfig = (state = initialState.serverConfig, action) => {
    const {type, data} = action;
    switch (type) {
        case BOT_SERVER_CONFIG:
            return data;
        default:
            return state;
    }
};

const userConfig = (state = initialState.userConfig, action) => {
    switch (action.type) {
        case BOT_USER_CONFIG: {
            const {userConfig} = action;
            return userConfig;
        }
        default:
            return state;
    }
};

// 会话数据
const dialogs = (state = initialState.dialogs, action) => {
    const {type, subType, data} = action;
    const newData = {
        type: subType,
        data
    };
    switch (type) {
        case BOT_DIALOG_LIST:
            return _.uniq([...state, newData]);
        default:
            return state;
    }
};

// 会话数据
const forms = (state = initialState.forms, action) => {
    const {type, data} = action;
    switch (type) {
        case BOT_FORM_LIST:
            return {...state, ...data};
        default:
            return state;
    }
};

export default combineReducers({
    serverConfig,
    userConfig,
    dialogs,
    forms
});
