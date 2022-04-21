/**
 * @file constants/constants.js
 * @author zhangzhe
 */

import {v4 as uuidV4} from 'uuid';

export const COOKIE_PREFIX = 'MOFILE_APP_';

// componentFrontId前缀
export const COMPONENT_FRONT_ID_PREFIX = 'bd-bot-component-front-';

// 冒泡显示固定的时间
export const DISPLAY_DURATION = 5000;

// web_hook 类型
export const WEB_HOOK_TYPE = {
    CUSTOM: 'custom',
    MULTI_IMAGES: 'multiImages',
    IMAGE: 'image',
    TEXT: 'text',

    SHOW_CARDS: 'showCards',
    FEED: 'feed',
    FEED_GOODS: 'feedGoods'
};
export const UUID = uuidV4(); // 页面每次刷新需要重新生成

// 对话类型：query代表用户，reply代表bot响应
export const DIALOG_ITEM_TYPE = {
    REPLY: 'reply',
    QUERY: 'query'
};

// 对话请求type
export const DIALOG_CHAT_TYPE = {
    INIT: 'init',
    BUTTON: 'button',
    TEXT: 'text',
    COMMIT: 'commit',
    TIMEOUT: 'timeout'
};

// 对话框item项类型映射关系
export const DIALOG_ITEM_SUBTYPE = {
    IMAGE: 'image',
    MULTI_IMAGES: 'multiImages',
    TEXT: 'text',
    DELAY: 'delay',
    TAG: 'tag',
    PHONE: 'phone',
    PHONE_VSCODE: 'phoneVscode',
    VIRTUAL: 'virtual',
    SKILL: 'skill',
    NEXT_SKILL: 'nextSkill',
    WEBHOOK: 'webhook',
    AUTO_SKILL: 'autoSkill',
    CUSTOM: 'custom',


    BUTTON: 'button',
    USER_INPUT: 'userInput',

    FORM: 'form',

    // 自定义组件，随时可能改
    FEED: WEB_HOOK_TYPE.FEED,
    FEED_GOODS: WEB_HOOK_TYPE.FEED_GOODS,
    SHOW_CARDS: WEB_HOOK_TYPE.SHOW_CARDS

};

// 可以携带button资源的资源，如text/image/tag
export const RESOURCE_ITEM_WITH_BUTTONS = [
    DIALOG_ITEM_SUBTYPE.TEXT,
    DIALOG_ITEM_SUBTYPE.TAG,
    DIALOG_ITEM_SUBTYPE.IMAGE,
    DIALOG_ITEM_SUBTYPE.MULTI_IMAGES
];

// 非位于会话流中的元件
export const DIALOG_ITEM_NOT_IN_DIALOGS = [
    DIALOG_ITEM_SUBTYPE.DELAY,
    DIALOG_ITEM_SUBTYPE.TAG,
    DIALOG_ITEM_SUBTYPE.VIRTUAL,
    DIALOG_ITEM_SUBTYPE.WEBHOOK
];

// 对话框item：button展示类型
export const DIALOG_BUTTON_SHOW_TYPE = {
    DEFAULT: 'default', // 默认伴随会话流展示
    HIGHLIGHT: 'highlight', // 高亮
    WEAK: 'weak', // 如FAQ问题列表
    TOP: 'top' // 针对tag元件置顶标签展示
};

// actions的展示模式
export const ACTION_MODE_TYPE = {
    DEFAULT: 'default', // 默认分top和common
    COMMON: 'common', // 全部按快捷标签展示
    TOP: 'top' // 全部按按钮展示
};

// 对话框item：button交互类型
export const DIALOG_BUTTON_ACTION_TYPE = {
    URL: 'url', // 跳转第三方地址
    NEXT_NODE: 'nextNode' // 跳转下一节点
};

// 对话框item：button位置
export const DIALOG_BUTTON_LOCATION_TYPE = {
    INNER: 'in', // 元件内
    OUTER: 'out' // 元件外
};

// 对话框item：对齐方式
export const DIALOG_ITEM_ALIGN = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right'
};

// mode模式
export const MODE_TYPE = {
    FULLSCREEN: 'fullScreen',
    MODAL: 'modal'
};

// 数字人模式
export const DIGITAL_HUMAN_MODE_TYPE = {
    FULL: 'full',
    HALF: 'half',
    HEAD: 'head',
    STATIC: 'static'
};

export const IMAGE_SHOW_TYPE = {
    PADDING: 'padding',
    RATIO: 'ratio'
};
