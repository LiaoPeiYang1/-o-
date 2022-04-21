/**
 * @file hooks/useDialogs
 * @description dialogs变化触发事件处理
 * 1、获取dialogs数据
 * 2、获取虚拟节点并进行请求
 * 3、获取最后一个会话流中component[除tag/virtual等]
 * 4、获取最后一个componentType:tag标签元件
 * 5、获取最后一个component的元件外resource: button
 * 6、
 * @author dingyang
 */

import {useCallback, useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {
    DIALOG_ITEM_TYPE,
    DIALOG_ITEM_SUBTYPE,
    DIALOG_ITEM_NOT_IN_DIALOGS,
    DIALOG_CHAT_TYPE,
    DIALOG_BUTTON_LOCATION_TYPE
} from 'constants/constants';

import useBotChat from './useBotChat';
import {getButtonFromComponentWithLocationType} from '../helper';

// 相关常量配置
export const VIRTUAL = 'VIRTUAL';
export const AUTO_SKILL = 'AUTO_SKILL';
export const LAST_TAG = 'LAST_TAG';
export const LAST_SESSION_COMPONENT = 'LAST_SESSION_COMPONENT';
export const OUT_BUTTONS = 'OUT_BUTTONS';

export default (type, nodeDigitalHumanConfig = {}) => {
    const withVirtual = type === VIRTUAL; // 是否需要进行虚拟节点处理
    const withAutoSkill = type === AUTO_SKILL; // 技能调用
    const withOutButtons = type === OUT_BUTTONS; // 是否需要获取节点外buttons
    const withLastTag = type === LAST_TAG; // 是否处理获取tag标签元件
    const withLastSession = type === LAST_SESSION_COMPONENT; // 是否处理获取会话流中最后一句话
    const {digitalHumanExist} = nodeDigitalHumanConfig;

    // 获取会话数据列表
    const dialogs = useSelector(state => _.get(state, 'aida.dialogs', []));

    // 获取最后一个tag标签元件
    const [lastTagComponent, setLastTagComponent] = useState({});
    // 获取最后一个会话流中的component
    const [lastSessionComponent, setLastSessionComponent] = useState({});
    // 获取最后一个bot响应节点的最后一个元件
    const [lastReplyDialogLastComponent, setLastReplyDialogLastComponent] = useState({});
    // 获取最后一个节点的最后一个会话流中的component以及其对应的out-buttons
    const [outButtonsInfo, setOutButtonsInfo] = useState({component: {}, buttons: []});

    // 记录已请求过的虚拟元件，避免重复请求
    const virtualButtonRequestedRef = useRef({});
    const autoSkillRef = useRef({});
    const {sendMessage} = useBotChat();

    // 从components中获取最后一个位于会话流中的component元件
    const getLastSessionComponentFromComponents = useCallback((components = []) => (_.findLast(
        components,
        ({componentType}) => (!_.includes(DIALOG_ITEM_NOT_IN_DIALOGS, componentType))
    )), []);

    // 纯虚拟节点直接发送请求的方法
    const handleVirtualRequest = useCallback(() => {
        const {
            componentType,
            componentFrontId,
            context,
            resources = [],
            realSkillId = ''
        } = lastReplyDialogLastComponent;
        // 需要虚拟节点请求 & 最后一个元件是虚拟元件 & 没有被请求过
        if (withVirtual
            && componentType === DIALOG_ITEM_SUBTYPE.VIRTUAL
            && !virtualButtonRequestedRef.current[componentFrontId]) {
            // 发起虚拟节点请求
            const lastBtnResource = _.findLast(resources, {resourceType: DIALOG_ITEM_SUBTYPE.BUTTON}) || {};
            const {nextNodeId, resourceId} = lastBtnResource;
            // 如果存在虚拟元件的button-resource
            if (lastBtnResource && nextNodeId) {
                sendMessage({
                    type: DIALOG_CHAT_TYPE.BUTTON,
                    resourceId,
                    query: '',
                    realSkillId,
                    context
                });
                // 将当前虚拟节点标记为已请求
                virtualButtonRequestedRef.current[componentFrontId] = true;
            }
        }
    }, [withVirtual, lastReplyDialogLastComponent, sendMessage]);

    // 虚拟节点请求发起
    const triggerVirtualRequest = useCallback(() => {
        // 数字人有播报视频就不发送请求
        if (digitalHumanExist) {
            return;
        }
        handleVirtualRequest();
    }, [digitalHumanExist, handleVirtualRequest]);

    const autoSkillRequest = useCallback(componentData => {
        const {data} = componentData;
        const {components, context} = data;
        _.forEach(components, item => {
            const {componentType, resources, componentFrontId} = item;
            if (componentType === DIALOG_ITEM_SUBTYPE.AUTO_SKILL && !autoSkillRef.current[componentFrontId]) {
                _.forEach(resources, resourcesItem => {
                    const {resourceId} = resourcesItem;
                    sendMessage({
                        type: DIALOG_ITEM_SUBTYPE.BUTTON,
                        resourceId,
                        context
                    });
                });
                autoSkillRef.current[componentFrontId] = true;
            }
        });
    }, [sendMessage]);

    // 虚拟节点请求发起
    const handleAutoSkillRequest = useCallback(() => {
        _.forEach(dialogs, item => {
            autoSkillRequest(item);
        });
    }, [dialogs, autoSkillRequest]);

    // 监听dialogs变化提取tags
    const handleDialogsChange = useCallback(() => {
        // 标识相关component或者button是否已找到
        const foundFlag = {
            lastTag: false,
            lastSession: false
        };

        // autoSkill
        if (withAutoSkill) {
            // 数字人有播报视频就不发送请求
            if (digitalHumanExist) {
                return;
            }
            handleAutoSkillRequest();
        }

        // 获取最后一个机器人响应节点中的最后一个元件（可能是虚拟节点）
        if (withVirtual) {
            const lastReplyDialog = _.findLast(dialogs, {type: DIALOG_ITEM_TYPE.REPLY});
            const context = _.get(lastReplyDialog, 'data.context', {});
            const tmpLastReplyComponents = _.get(lastReplyDialog, 'data.components', []);
            const tmpLastReplyComponent = tmpLastReplyComponents[tmpLastReplyComponents.length - 1] || {};
            setLastReplyDialogLastComponent({...tmpLastReplyComponent, context});
        }

        // 获取最后一个dialog并提取其中outButtons
        if (withOutButtons) {
            const lastDialog = dialogs[dialogs.length - 1] || {};
            const lastDialogComponents = _.get(lastDialog, 'data.components', []);
            const lastDialogComponent = getLastSessionComponentFromComponents(lastDialogComponents);
            setOutButtonsInfo({
                component: lastDialogComponent,
                buttons: getButtonFromComponentWithLocationType(
                    lastDialogComponent,
                    DIALOG_BUTTON_LOCATION_TYPE.OUTER
                )
            });
        }

        if (!withLastTag && !withLastSession) {
            return;
        }

        // 循环获取最后一个标签元件 & 最后一个会话流中元件
        _.forEachRight(dialogs, item => {

            const components = _.get(item, 'data.components', []);
            const context = _.get(item, 'data.context', {});
            const nodeId = _.get(item, 'data.nodeId', '');
            // 筛选获取最后一个tag-component
            if (!foundFlag.lastTag && withLastTag) {
                const tmpTagComponent = _.findLast(components, {componentType: DIALOG_ITEM_SUBTYPE.TAG});
                if (tmpTagComponent) {
                    setLastTagComponent({...tmpTagComponent, context, nodeId});
                    foundFlag.lastTag = true;
                }
            }

            // 筛选获取最后一个会话流component
            if (!foundFlag.lastSession && withLastSession) {
                const tmpLastComponent = getLastSessionComponentFromComponents(components);
                if (tmpLastComponent) {
                    setLastSessionComponent({...tmpLastComponent, context, nodeId});
                    foundFlag.lastSession = true;
                }
            }

            // 如果两者都已找到，则终止循环
            if ((foundFlag.lastTag || !withLastTag)
                && (foundFlag.lastSession || !withLastSession)) {
                return false;
            }
        });
    }, [
        withVirtual,
        withOutButtons,
        withLastTag,
        withLastSession,
        dialogs,
        withAutoSkill,
        digitalHumanExist,
        handleAutoSkillRequest,
        getLastSessionComponentFromComponents
    ]);

    useEffect(() => {
        handleDialogsChange();
    }, [handleDialogsChange]);

    useEffect(() => {
        triggerVirtualRequest();
    }, [triggerVirtualRequest]);

    return {
        dialogs,
        lastTagComponent,
        lastSessionComponent,
        outButtonsInfo,
        handleVirtualRequest,
        handleAutoSkillRequest,
        getLastSessionComponentFromComponents
    };
};
