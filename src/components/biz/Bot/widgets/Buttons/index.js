/**
 * @file components/biz/Bot/DialogZone/components/Buttons
 * @desc 机器人text文本widget
 * @author dingyang
 */

import _ from 'lodash';

import {DIALOG_BUTTON_SHOW_TYPE, DIALOG_BUTTON_LOCATION_TYPE} from 'constants/constants';

import {useButtons} from '../../hooks';
import BotButton from '../Button';

import './index.less';

export default props => {
    const {component = {}} = props;

    // 获取元件内buttons
    const inButtons = useButtons({component, type: DIALOG_BUTTON_LOCATION_TYPE.INNER});
    // 元件是否存在default(元件内)buttons
    const defaultButtons = _.filter(inButtons, btn => btn.content.showType !== DIALOG_BUTTON_SHOW_TYPE.WEAK);
    // 获取文本对对应menu:buttons
    const weakButtons = _.filter(inButtons, btn => btn.content.showType === DIALOG_BUTTON_SHOW_TYPE.WEAK);

    return (
        <>
            {defaultButtons.length > 0 && (
                <div className="bd-bot-inline-default-buttons">
                    {_.map(defaultButtons, (item, index) => (
                        <BotButton
                            key={`${item.resourceId}${index}`}
                            className="bd-bot-inline-button"
                            highlightClassName="highlight-button"
                            data={item}
                            component={component}
                        />))}
                </div>
            )}

            {weakButtons.length > 0 && (
                <div className="bd-bot-inline-menu-buttons">
                    {_.map(weakButtons, (item, index) => (
                        <BotButton
                            key={`${item.resourceId}${index}`}
                            className="bd-bot-inline-button"
                            data={item}
                            component={component}
                        />))}
                </div>
            )}
        </>
    );
};
