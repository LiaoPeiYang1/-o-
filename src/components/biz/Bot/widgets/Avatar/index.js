/**
 * @file components/biz/Bot/DialogZone/components/Avatar
 * @desc 机器人头像
 * @author dingyang
 */

import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import bot_business from '../../../../../../assets/img/bot_business.png';
import bot_cartoon from '../../../../../../assets/img/bot_cartoon.png';
import bot_sportorange from '../../../../../../assets/img/bot_sportorange.png';

import {useBotSpread, useBotMin, useBotDrag} from '../../hooks';

import './index.less';

const IMG_MAPPDING = {
    'bot_business': bot_business,
    'bot_cartoon': bot_cartoon,
    'bot_sportorange': bot_sportorange
};

export default props => {
    const {size = 'small', style = {}} = props;
    const botConfig = useSelector(state => _.get(state, 'aida.serverConfig'));

    const {spread, setSpread} = useBotSpread();
    const {min, minAnimating} = useBotMin();
    const {avatarBig} = useBotDrag();

    // 折叠时点击头像折叠状态展开
    const handleBotSpread = useCallback(() => {
        if (!min && !spread) {
            setSpread(true);
        }
    }, [spread, min, setSpread]);

    const aidaDialogTopClass = avatarBig ? 'head-portrait-big' : 'head-portrait-small';
    const aidaAvatarClass = spread && !minAnimating ? aidaDialogTopClass : '';
    const avatarImg = botConfig.botAvatarUrl || IMG_MAPPDING[botConfig.botAvatar] || IMG_MAPPDING.bot_business;
    return (
        <div
            className={`bd-bot-avatar bot-avatar-${size} ${aidaAvatarClass}`}
            style={style}
            onClick={handleBotSpread}
        >
            <img className="bd-bot-avatar-head" src={avatarImg} />
        </div>
    );
};
