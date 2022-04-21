/**
 * @file components/biz/Bot/BotInfo
 * @desc 会话状态展示的机器人信息
 * @author v_liaopeiyang
 */

import {useSelector} from 'react-redux';
import _ from 'lodash';

import {useBotDrag} from '../hooks';
import {Avatar} from '../widgets';

import './index.less';

export default () => {
    const titleName = useSelector(state => _.get(state, 'aida.serverConfig.titleName', ''));

    const {avatarBig} = useBotDrag();

    const titleVisible = avatarBig && !!titleName; // 是否显示机器人title标志
    const avatarHeightClass = avatarBig ? 'bd-bot-big-height' : 'bd-bot-small-height';
    const avatarNameHeightClass = titleVisible ? 'bd-bot-name-height' : '';
    return (
        <div className={`bd-layout-header-image ${avatarHeightClass} ${avatarNameHeightClass}`}>
            <Avatar />
            {titleVisible && (
                <div className="bd-bot-name">{titleName}</div>
            )}
        </div>
    );
};
