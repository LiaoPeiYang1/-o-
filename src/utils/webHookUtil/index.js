/**
 * @file utils/webHook.js 兼容webhook数据
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import {WEB_HOOK_TYPE} from 'constants/constants';

// 转换custom组件里面的数据格式
export function formatComponentData(data) {
    const {component} = data;
    const {resources} = component;
    const resourceItem = _.head(resources);
    const type = _.get(resourceItem, 'content.showComponentType');
    const componentTypeData = {
        ...component,
        componentType: type,
        type: WEB_HOOK_TYPE.CUSTOM
    };
    return {
        ...data,
        component: componentTypeData
    };
};

// 跳出技能context 转换数据格式
export function formatDialogData(dataList, objectAdd) {
    const itemComponentsData = _.map(dataList, item => {
        return {...item, ...objectAdd};
    });
    return itemComponentsData;
};

// 兼容多图
export function formatMultiImageData(data) {
    const {resources} = data;
    const components = _.map(resources, item => {
        const {content} = item;
        const paramsItem = _.get(content, 'params[0]', {});
        const {value} = paramsItem;
        const dataList = _.map(value, paramItem => {
            return {
                componentType: WEB_HOOK_TYPE.IMAGE,
                resources: [{
                    ...item,
                    content: paramItem,
                    resourceType: WEB_HOOK_TYPE.IMAGE
                }]
            };
        });
        const contentData = {
            componentType: WEB_HOOK_TYPE.MULTI_IMAGES,
            components: dataList
        };
        return contentData;
    });
    return _.head(components);
};


// 兼容文本
export function formatTextData(data) {
    const {resources} = data;
    const dataList = _.map(resources, item => {
        const {content} = item;
        const paramsItem = _.get(content, 'params[0]', {});
        const {value} = paramsItem;
        const contentData = {
            text: value
        };
        return {
            ...item,
            content: contentData,
            resourceType: WEB_HOOK_TYPE.TEXT
        };
    });
    return {
        ...data,
        resources: dataList
    };
};

// 兼容单图
export function formatImageData(data) {
    const {resources} = data;
    const dataList = _.map(resources, item => {
        const {content} = item;
        const paramsItem = _.get(content, 'params[0]', {});
        const {value} = paramsItem;
        const contentData = {
            imgUrl: value
        };
        return {
            ...item,
            content: contentData,
            resourceType: WEB_HOOK_TYPE.IMAGE
        };
    });
    return {
        ...data,
        resources: dataList
    };
};