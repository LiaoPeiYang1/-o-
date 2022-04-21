/**
 * @file components/biz/Bot/ZoneDialog
 * @desc 机器人对话窗口
 * @author dingyang
 */

import {useCallback, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'antd-mobile';
import _ from 'lodash';

import actions from 'actions';
import {DIALOG_ITEM_TYPE, DIALOG_ITEM_SUBTYPE} from 'constants/constants';
import {uaUtil, webHookUtil} from 'utils';

import {generateComponentDomId, filterSessionComponents} from '../helper';
import {
    useBotSpread,
    useBotDrag,
    useDialogs,
    useDialogScroll
} from '../hooks';
import {LAST_SESSION_COMPONENT} from '../hooks/useDialogs';
import {useFilterTimeOut} from '../hooks/dialogs';
import {
    SingleImage as SingleImageWidget,
    MultiImage as MultiImageWidget,
    Text as TextWidget,
    Phone as PhoneWidget,
    TextLoading as TextLoadingWidget,
    TextQuery as TextQueryWidget,
    Skill as SkillWidget,
    Custom as CustomWidget,
    FullScreenComposite,
    Form
} from '../widgets';

import './index.less';

const {browserType, isIOS} = uaUtil;
const {formatDialogData} = webHookUtil;
const TOP_DISTANCE = 20;
const SCROLL_DISTANCE = 70;

export default (props = {}) => {
    const {isHalfMode} = props;
    const isFullScreen = useSelector(state => _.get(state, 'aida.userConfig.isFullScreen'));

    const [newsTipVisible, setNewsTipVisible] = useState(false);
    const [showMask, setShowMask] = useState(false);

    const dispatch = useDispatch();

    const {spread, setSpread} = useBotSpread();
    const {setAidaDialogTop, handleBotDialogScroll} = useBotDrag();
    const {dialogs, lastSessionComponent: lastComponent} = useDialogs(LAST_SESSION_COMPONENT);
    const {componentFrontId: lastComponentFrontId} = lastComponent;

    // 重新格式化
    const formatDialogs = useFilterTimeOut({isHalfMode, dialogs});

    const onNewsVisibleChange = useCallback(value => setNewsTipVisible(value), []);
    const {
        panelRef,
        scrollToBottom,
        bottomContainerRef
    } = useDialogScroll({onNewsVisibleChange, dialogs: formatDialogs});

    // 监听滚动事件
    const onScroll = useCallback(() => {
        const panel = panelRef.current;
        const {scrollTop, clientHeight, scrollHeight} = panel;

        handleBotDialogScroll(panel);

        // 如果滚动条不在底部则展示mask || 没有在顶部
        setShowMask(((scrollTop + clientHeight) < scrollHeight) && !(scrollTop === 0));

        // 判断是否滚动到底部，需要消失“新消息”提醒
        if ((scrollTop + clientHeight) + 20 >= scrollHeight && newsTipVisible) {
            setNewsTipVisible(false);
        }

        if (!isFullScreen) {
            // scroll触发时有时 useBotDrag事件不生效， 距离滑动较大就收起
            const slideDistance = (isIOS && spread && (clientHeight < scrollHeight)) ? -SCROLL_DISTANCE : TOP_DISTANCE;
            const dialogTopWithBuffer = scrollTop <= slideDistance;
            dispatch(actions.aidaDialogTopWithBuffer(dialogTopWithBuffer));
        }
    }, [
        spread,
        panelRef,
        newsTipVisible,
        isFullScreen,
        dispatch,
        handleBotDialogScroll
    ]);

    // 监听手指离开屏幕(针对有滚动的时候useBotDrag 在非如流浏览器不生效)
    const handleTouchEnd = useCallback(() => {
        const panel = panelRef.current;
        const {scrollTop} = panel;

        if (scrollTop < -SCROLL_DISTANCE && spread) {
            setSpread(false);
        }
    }, [spread, panelRef, setSpread]);

    useEffect(() => {
        const panel = panelRef.current;
        const {clientHeight, scrollHeight} = panel;
        const noDialogScroll = clientHeight >= scrollHeight;
        setAidaDialogTop(noDialogScroll);
    }, [dialogs, panelRef, setAidaDialogTop]);

    const onScrollProps = {
        ...((browserType.isBAIDUHI || isFullScreen) ? {} : {onTouchEnd: handleTouchEnd})
    };

    // 对话项渲染
    const renderDialogItem = useCallback((item, index) => {
        const {type, data = {}} = item;
        // 当前节点包含元件
        const itemComponents = _.get(data, 'components', []);
        const context = _.get(data, 'context', {});
        const nodeId = _.get(data, 'nodeId', '');
        const itemComponentsData = formatDialogData(itemComponents, {nodeId, context});
        // 如果是询问文本
        if (type === DIALOG_ITEM_TYPE.QUERY) {
            // 收起状态不显示本人会话
            return spread ? (<TextQueryWidget key={index} {...item} />) : null;
        }

        return (
            <div key={index}>
                {_.map(itemComponentsData, component => {
                    const {componentFrontId, componentType} = component;

                    // 如果是展开状态 || 收起状态&&最后一条component
                    const componentVisible = spread || (!spread && componentFrontId === lastComponentFrontId);
                    if (!componentVisible) {
                        return null;
                    }

                    const dialogProps = {
                        component,
                        withAvatar: !spread
                    };
                    let componentWidget;
                    switch (componentType) {
                        case DIALOG_ITEM_SUBTYPE.TEXT:
                            componentWidget = (<TextWidget {...dialogProps} />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.IMAGE:
                            componentWidget = (<SingleImageWidget {...dialogProps} />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.MULTI_IMAGES:
                            componentWidget = (<MultiImageWidget {...dialogProps} />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.PHONE:
                            componentWidget = (<PhoneWidget {...dialogProps} />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.PHONE_VSCODE:
                            componentWidget = (<PhoneWidget {...dialogProps} withVSCode />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.SKILL:
                            componentWidget = (<SkillWidget {...dialogProps} />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.CUSTOM:
                            componentWidget = (<CustomWidget {...dialogProps} />);
                            break;
                        case DIALOG_ITEM_SUBTYPE.FORM:
                            componentWidget = (<Form {...dialogProps} />);
                            break;
                        default:
                            return null;
                    }
                    return (
                        <div key={componentFrontId} id={generateComponentDomId(componentFrontId)}>
                            {componentWidget}
                        </div>
                    );
                })}
            </div>
        );
    }, [spread, lastComponentFrontId]);

    // 当dialogContent 出现滚动条的时候增加padding-top
    // const {clientHeight, scrollHeight} = panelRef.current || {};
    // const paddingCls = ((scrollHeight > clientHeight) && isHalfMode) ? 'dialog-content-padding-top' : '';
    return (
        <div className="bd-bot-dialog-zone">
            {showMask && isHalfMode && <div className="bd-bot-dialog-zone-mask" />}
            <div
                id="dialog-content"
                className="dialog-content"
                ref={panelRef}
                onScroll={onScroll}
                {...onScrollProps}
            >
                {_.map(formatDialogs, (item, index) => {
                    const {type, data = {}} = item;
                    const {components, context, nodeId} = data;
                    const isHalfModeReply = type === DIALOG_ITEM_TYPE.REPLY && isHalfMode;
                    const dialogsLength = _.size(formatDialogs);

                    if (index === (dialogsLength - 1) && isHalfModeReply) {
                        const sessionComponents = filterSessionComponents(components);
                        return !_.isEmpty(sessionComponents) ? (
                            <div className="dialog-content-last" key={index}>
                                {_.map(sessionComponents, component => (
                                    <div
                                        key={component.componentFrontId}
                                        id={generateComponentDomId(component.componentFrontId)}
                                    >
                                        <FullScreenComposite
                                            component={component}
                                            context={context}
                                            nodeId={nodeId}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : null;
                    }
                    return renderDialogItem(item, index);
                })}
                {!isHalfMode && <TextLoadingWidget />}
                {/* 底部的div用来保持始终在滚动到底部 */}
                <div className="dialog-content-bottom-container" ref={bottomContainerRef} />
            </div>
            {newsTipVisible && (
                <div className="bd-bot-btn dialog-news-tip" onClick={scrollToBottom}>
                    <Icon type="down" size="xs" />新消息
                </div>
            )}
        </div>
    );
};
