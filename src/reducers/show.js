/**
 * @file reducers/show.js 内部状态
 * @author v_liaopeiyang
 */

import {combineReducers} from 'redux';

import {
    AIDA_BOT_SPREAD_SET,
    AIDA_BOT_MIN_SET,
    AIDA_BOT_DIALOG_LOADING,
    AIDA_BOT_DIALOG_TOP_WITH_BUFFER,
    AIDA_BOT_IS_FOCUS,
    AIDA_BOT_INIT,
    AIDA_BOT_DIALOG_TOP,
    AIDA_BOT_NAVIGATION,
    AIDA_BOT_RECORD_INIT
} from 'constants/ActionTypes';

const initialState = {
    // 是否初始化录音
    recordInit: false,
    // 是否折叠
    spread: false,
    // 是否头像状态
    min: true,
    // 接收消息后···
    loading: true,
    // scroll到顶后继续下拉
    dialogTopWithBuffer: true,
    // 键盘是否打开
    isFocus: false,
    // 第一次进入 客服自动会话冒泡
    isFirstShow: true,
    // 全屏模式头像变化动画
    isAidaDialogTop: false,
    // 折叠导航是否有
    isNavigation: false
};

// 客服头像变化
const aidaDialogTop = (state = initialState.isAidaDialogTop, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_DIALOG_TOP:
            return data;
        default:
            return state;
    }
};

// 展开收起态
const spread = (state = initialState.spread, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_SPREAD_SET:
            return data;
        default:
            return state;
    }
};

// scroll 是否到顶了
const dialogTopWithBuffer = (state = initialState.dialogTopWithBuffer, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_DIALOG_TOP_WITH_BUFFER:
            return data;
        default:
            return state;
    }
};

// 输入键盘是否打开
const isFocus = (state = initialState.isFocus, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_IS_FOCUS:
            return data;
        default:
            return state;
    }
};

// 是否第一次进入机器人
const isFirstShow = (state = initialState.isFirstShow, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_INIT:
            return data;
        default:
            return state;
    }
};

// 最小化
const min = (state = initialState.min, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_MIN_SET:
            return data;
        default:
            return state;
    }
};

// loading态
const loading = (state = initialState.loading, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_DIALOG_LOADING:
            return data;
        default:
            return state;
    }
};

// 折叠导航的状态
const isNavigation = (state = initialState.isNavigation, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_NAVIGATION:
            return data;
        default:
            return state;
    }
};

// 录音初始化状态
const recordInit = (state = initialState.recordInit, action) => {
    const {type, data} = action;
    switch (type) {
        case AIDA_BOT_RECORD_INIT:
            return data;
        default:
            return state;
    }
};

export default combineReducers({
    spread,
    min,
    loading,
    dialogTopWithBuffer,
    isFocus,
    isFirstShow,
    aidaDialogTop,
    isNavigation,
    recordInit
});
