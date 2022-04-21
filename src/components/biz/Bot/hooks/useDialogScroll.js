/**
 * @file hooks/useDialogScroll
 * @description 会话区滚动相关逻辑控制
 * @author dingyang
 */

import {useRef, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import smoothscroll from 'smoothscroll-polyfill';

import {DIALOG_ITEM_TYPE, DIALOG_ITEM_NOT_IN_DIALOGS} from 'constants/constants';

// kick off the polyfill!
smoothscroll.polyfill();

export default (props = {}) => {
    const {onNewsVisibleChange, dialogs} = props;
    const spread = useSelector(state => _.get(state, 'show.spread'));

    const panelRef = useRef();
    const bottomContainerRef = useRef();

    const handleNewsVisibleChange = useCallback(visible => {
        onNewsVisibleChange && onNewsVisibleChange(visible);
    }, [onNewsVisibleChange]);

    // 滚动到底部
    const scrollToBottom = useCallback(() => {
        const bottomEle = bottomContainerRef.current;
        bottomEle.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});
        handleNewsVisibleChange(false);
    }, [handleNewsVisibleChange]);

    // 展开/收起态变化时，自动滚动到底部
    useEffect(() => {
        scrollToBottom();
        !spread && handleNewsVisibleChange(false);
    }, [scrollToBottom, spread, handleNewsVisibleChange]);

    // 对话框内容变化时触发
    useEffect(() => {
        const lastDialog = dialogs[dialogs.length - 1];
        if (!lastDialog) {
            return;
        }
        // 当最后一条记录时query时
        const {type, data = {}} = lastDialog;
        if (type === DIALOG_ITEM_TYPE.QUERY) {
            scrollToBottom();
            handleNewsVisibleChange(false);
            return;
        }
        // 当最后一条记录时bot返回节点时
        const {components = []} = data;

        const bottomEle = bottomContainerRef.current;
        if (bottomEle) {
            setTimeout(() => {
                bottomEle.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});
            }, 0);
        }

        // 查找位于会话流中的component
        const componentsInDialog = _.filter(
            components,
            com => !_.includes(DIALOG_ITEM_NOT_IN_DIALOGS, com.componentType)
        );

        if (componentsInDialog.length > 1) {
            handleNewsVisibleChange(true);
        }

        // 然后进行兜底逻辑判断，dialogs内容变化，就要主动判断一次
        const panel = panelRef.current;
        const {scrollTop, clientHeight, scrollHeight} = panel;
        // 判断是否滚动到底部，需要消失“新消息”提醒
        if ((scrollTop + clientHeight) + 10 >= scrollHeight) {
            handleNewsVisibleChange(false);
        }

    }, [dialogs, scrollToBottom, handleNewsVisibleChange]);

    return {
        panelRef,
        scrollToBottom,
        bottomContainerRef
    };
};
