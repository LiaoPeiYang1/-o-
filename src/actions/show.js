/**
 * @file Action for show
 * @author v_liaopeiyang
 */

import {
    AIDA_BOT_SPREAD_SET,
    AIDA_BOT_MIN_SET,
    AIDA_BOT_DIALOG_TOP_WITH_BUFFER,
    AIDA_BOT_IS_FOCUS,
    AIDA_BOT_INIT,
    AIDA_BOT_DIALOG_TOP,
    AIDA_BOT_NAVIGATION,
    AIDA_BOT_RECORD_INIT
} from 'constants/ActionTypes';

// scroll 触顶（头像变化）
export const aidaDialogTop = isAidaDialogTop => ({
    type: AIDA_BOT_DIALOG_TOP,
    data: isAidaDialogTop
});

// 设置展开态
export const aidaSpread = isSpread => ({
    type: AIDA_BOT_SPREAD_SET,
    data: isSpread
});

// 设置悬浮状态
export const aidaMin = min => ({
    type: AIDA_BOT_MIN_SET,
    data: min
});

// scroll 是否滑倒顶部
export const aidaDialogTopWithBuffer = dialogTopWithBuffer => ({
    type: AIDA_BOT_DIALOG_TOP_WITH_BUFFER,
    data: dialogTopWithBuffer
});

// 监控输入法面板是否打开
export const aidaInputFocus = isFocus => ({
    type: AIDA_BOT_IS_FOCUS,
    data: isFocus
});

// 是否第一次进入机器人
export const aidaBotFirstShow = isFirstShow => ({
    type: AIDA_BOT_INIT,
    data: isFirstShow
});

// 折叠导航
export const aidaNavigation = isNavigation => ({
    type: AIDA_BOT_NAVIGATION,
    data: isNavigation
});

// 录音是否初始化
export const initRecord = () => ({
    type: AIDA_BOT_RECORD_INIT,
    data: true
});