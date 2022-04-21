/**
 * @file helper
 * @author dingyang
 */

import _ from 'lodash';

import {
    DIALOG_ITEM_SUBTYPE,
    DIALOG_BUTTON_LOCATION_TYPE,
    COMPONENT_FRONT_ID_PREFIX,
    DIALOG_ITEM_NOT_IN_DIALOGS
} from 'constants/constants';
import {isMobile} from 'utils/uaUtil';

const STANDARD_SHOW_SCALE = 414 / 736; // 参考iphone6/7/8plus

/**
 * splitResources
 * @description 针对"resourceType":"delay",延迟展示下一元件
 * @param nodeInfo json
*/
export function splitResources(nodeInfo = {}) {
    if (_.isEmpty(nodeInfo)) {
        return [];
    }

    const {components: nodeComponents = []} = nodeInfo;
    const splitComponents = [{delay: 0, components: []}];
    let indexCount = 0;
    _.forEach(nodeComponents, component => {
        const {resources = []} = component;
        const targetDelayResource = _.find(resources, {resourceType: DIALOG_ITEM_SUBTYPE.DELAY});
        splitComponents[indexCount].components.push(component);

        if (targetDelayResource) {
            indexCount++;
            const delayTime = _.get(targetDelayResource, 'content.time', 0);
            splitComponents[indexCount] = {delay: delayTime, components: []};
        }
    });

    return _.map(splitComponents, sComponents => ({
        delay: sComponents.delay,
        nodeInfo: {
            ...nodeInfo,
            components: sComponents.components
        }
    }));
};

/**
 * getButtonFromComponentWithLocationType
 * @description 针对resourceType = 'button'的资源进行筛选
 * @param nodeInfo json
*/
export function getButtonFromComponentWithLocationType(component = {}, types = [DIALOG_BUTTON_LOCATION_TYPE.INNER]) {
    const {resources = []} = component;
    return _.filter(resources, resource => {
        const {resourceType, content = {}} = resource;
        const isButton = DIALOG_ITEM_SUBTYPE.BUTTON === resourceType;
        const isFilterButton = _.includes(types, _.get(content, 'locationType'));
        return isButton && isFilterButton;
    });
};

/**
 * filterSessionComponents
 * @description 筛选获取会话流中展示的components
 * @param components array
*/
export function filterSessionComponents(components = []) {
    return _.filter(
        components,
        ({componentType}) => (!_.includes(DIALOG_ITEM_NOT_IN_DIALOGS, componentType))
    );
};

/**
 * generateComponentDomId
 * @description 生成元件容器dom-id
 * @param componentFrontId string
*/
export function generateComponentDomId(componentFrontId) {
    return `${COMPONENT_FRONT_ID_PREFIX}${componentFrontId}`;
};

/**
 * getLayoutWidth
 * @description 手机模式下获取layout宽度（自适应最佳）
*/
export function getLayoutWidth() {
    const {clientWidth, clientHeight} = document.documentElement;

    // 如果是手机端 || 竖屏逻辑
    if (isMobile || clientWidth <= clientHeight) {
        return {
            full: true, // 是否100%
            clientWidth,
            clientHeight
        };
    }
    // 返回动态计算宽度
    return {
        full: false, // 是否100%
        clientWidth: STANDARD_SHOW_SCALE * clientHeight,
        clientHeight
    };
};

// 获取当前主机地址
export function getWsUrl() {
    // eslint-disable-next-line
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    const {protocol, host, hostname} = window.location;
    const isIP = reg.test(hostname);
    if (host.indexOf('localhost') > -1 || isIP) {
        const localUrl = 'wss://persona.baidu.com';
        const wsUrl = `${localUrl}/ws/v1/asr`;
        return wsUrl;
    }
    const protoWs = protocol === 'https:' ? 'wss:' : 'ws:';
    const baseUrl = `${protoWs}//${host}`;
    const wsUrl = `${baseUrl}/ws/v1/asr`;
    return wsUrl;
};

export function px2rem(value) {
    return _.isNumber(value) ? `${(value / 16).toFixed(4)}rem` : value;
}

export function formatDate(dateStr, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!dateStr) {
        return;
    }
    const date = new Date(dateStr);
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? o[k]
                : (`00${o[k]}`).substr((`${o[k]}`).length));
        }
    }
    return fmt;
}