/**
 * @file components/biz/Bot/Navigation
 * @desc 静态模式的导航
 * @author v_liaopeiyang
 */

import {useCallback, useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {DIALOG_ITEM_SUBTYPE} from 'constants/constants';
import {classUtil} from 'utils';

import {useBotChat, useNavigation} from '../hooks';
import useTrack, {TRACK_TARGET_TYPE} from '../hooks/useTrack';
import SkillItem from './components/item';

import './index.less';

const {addClass, removeClass} = classUtil;

export default () => {
    const skillNavigation = useSelector(state => state.aida.serverConfig.skillNavigation);

    const [navigationAnimating, setNavigationAnimating] = useState();

    const {sendMessage} = useBotChat();
    const {sendTrackMessage} = useTrack();
    const {navigationVisible, setNavigationVisible} = useNavigation();

    const timerRef = useRef();

    const handleSkillSwitch = useCallback(item => {
        const {skillId, skillName} = item;
        sendMessage({
            type: DIALOG_ITEM_SUBTYPE.NEXT_SKILL,
            query: skillName,
            skillId
        });
        sendTrackMessage({
            type: TRACK_TARGET_TYPE.CLICK,
            param: {skillId}
        });
        setNavigationVisible(false);
    }, [sendMessage, sendTrackMessage, setNavigationVisible]);

    useEffect(() => {
        const dialogContent = document.getElementById('dialog-content');
        clearTimeout(timerRef.current);
        if (navigationVisible) {
            setNavigationAnimating(navigationVisible);
            addClass(dialogContent, 'navigation-open');
        }
        else {
            removeClass(dialogContent, 'navigation-open');
            timerRef.current = setTimeout(() => {
                setNavigationAnimating(navigationVisible);
            }, 150);
        }
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [navigationVisible]);

    // 新增dom是 样式是不生效的 避免使用setTimeout css 样式改变 dom高度
    const navigationLeaveClass = navigationAnimating ? 'navigation-leave' : '';
    const navigationShowClass = navigationVisible ? 'navigation-join' : navigationLeaveClass;
    return (
        <div className={`bd-bot-navigation-wrap ${navigationShowClass}`} onClick={() => setNavigationVisible(false)} >
            {navigationAnimating && <div className="bd-bot-navigation-block">
                <div className="bd-bot-navigation" onClick={e => e.stopPropagation()}>
                    {_.map(skillNavigation, (classItem, index) => (
                        <div className="bd-bot-navigation-class" key={index}>
                            <div className="navigation-class-name">{classItem.columnName}</div>
                            <div className="navigation-class-block">
                                {_.map(classItem.skillList, (item, index) => (
                                    <div
                                        className="navigation-item-block"
                                        key={`${item.resourceId}${index}`}
                                        onClick={() => handleSkillSwitch(item)}
                                    >
                                        <SkillItem data={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
};
