/**
 * @file components/biz/Bot/DialogZone/components/Button
 * @desc button
 * @author dingyang
 */

import {useCallback} from 'react';

import {
    DIALOG_CHAT_TYPE,
    DIALOG_BUTTON_SHOW_TYPE,
    DIALOG_BUTTON_ACTION_TYPE
} from 'constants/constants';

import {useBotChat, useBotSpread, useNavigateTo} from '../../hooks';
import useTrack, {TRACK_TARGET_TYPE} from '../../hooks/useTrack';

import './index.less';

export default props => {
    const {
        component = {},
        data: buttonResource = {},
        className = '',
        highlightClassName = '',
        prefix = '' // 前缀
    } = props;
    const {realSkillId, context, nodeId} = component;
    const {resourceId, content = {}} = buttonResource;
    const {
        caption: tagName,
        winOpenType = '_blank',
        url,
        actionType,
        showType
    } = content;

    const {sendMessage} = useBotChat();
    const {spreadBot} = useBotSpread();
    const {sendTrackMessage} = useTrack();
    const {navigateTo} = useNavigateTo();

    const handleButtonLink = useCallback(async () => {
        await sendTrackMessage({
            type: TRACK_TARGET_TYPE.CLICK,
            param: {resourceId, pageView: url},
            nodeId
        });
        navigateTo(url, winOpenType);
    }, [url, winOpenType, resourceId, nodeId, sendTrackMessage, navigateTo]);

    const handleButtonNext = useCallback(() => {
        sendMessage({
            type: DIALOG_CHAT_TYPE.BUTTON,
            resourceId,
            query: tagName,
            realSkillId,
            context
        });
        sendTrackMessage({
            type: TRACK_TARGET_TYPE.CLICK,
            param: {resourceId},
            nodeId
        });
        spreadBot();
    }, [resourceId, context, nodeId, tagName, realSkillId, sendMessage, sendTrackMessage, spreadBot]);

    // 是否需要高亮突出展示
    const highlightClass = showType === DIALOG_BUTTON_SHOW_TYPE.HIGHLIGHT ? highlightClassName : '';
    // tagOptions
    const tagOptions = {
        key: resourceId,
        className: `bd-bot-btn ${className} ${highlightClass}`
    };
    switch (actionType) {
        case DIALOG_BUTTON_ACTION_TYPE.NEXT_NODE: {
            return (
                <div
                    {...tagOptions}
                    onClick={handleButtonNext}
                >
                    {prefix}
                    <span>{tagName}</span>
                </div>
            );
        }
        case DIALOG_BUTTON_ACTION_TYPE.URL: {
            return (
                <div {...tagOptions}>
                    <div className="bd-bot-link" onClick={handleButtonLink}>
                        {prefix}
                        <span>{tagName}</span>
                    </div>
                </div>
            );
        }
        default:
            return null;
    }
};
