/**
 * @file components/biz/Bot/DialogZone/components/Skills
 * @desc 机器人技能
 * @author v_liaopeiyang
 */

import {useCallback} from 'react';
import _ from 'lodash';

import {DIALOG_ITEM_SUBTYPE} from 'constants/constants';

import {useBotChat, useBotSpread} from '../../hooks';
import useTrack, {TRACK_TARGET_TYPE} from '../../hooks/useTrack';
import SkillItem from './components/Item';

import './index.less';

export default props => {
    const {component = {}, showType = ''} = props;
    const {resources, realSkillId = '', context, nodeId} = component;

    const {sendMessage} = useBotChat();
    const {spreadBot} = useBotSpread();
    const {sendTrackMessage} = useTrack();

    const handleSkillSwitch = useCallback(item => {
        const {resourceId, content} = item;
        const {skillId, skillName} = content;
        sendMessage({
            type: DIALOG_ITEM_SUBTYPE.BUTTON,
            query: skillName,
            resourceId,
            realSkillId,
            context
        });
        sendTrackMessage({
            type: TRACK_TARGET_TYPE.CLICK,
            param: {skillId},
            nodeId
        });
    }, [realSkillId, nodeId, context, sendMessage, sendTrackMessage]);

    const showTypeClassWrap = showType === 'center' ? 'bd-bot-widget-center' : '';
    return (
        <div className={`bd-bot-widget-skill ${showTypeClassWrap}`}>
            <div className="bd-bot-widget-skill-block" onClick={spreadBot}>
                {_.map(resources, (item, index) => (
                    <div
                        className="widget-skill-item-block"
                        key={`${item.resourceId}${index}`}
                        onClick={() => handleSkillSwitch(item)}
                    >
                        <SkillItem data={item} type="inLine" />
                    </div>
                ))}
            </div>
        </div>
    );
};
