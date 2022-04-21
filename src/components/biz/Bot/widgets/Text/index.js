/**
 * @file components/biz/Bot/DialogZone/components/Text
 * @desc 机器人text文本widget
 * @author dingyang
 */

import _ from 'lodash';

import {
    DIALOG_ITEM_SUBTYPE,
    DIALOG_BUTTON_SHOW_TYPE,
    DIALOG_BUTTON_LOCATION_TYPE
} from 'constants/constants';

import {useButtons, useWebHook} from '../../hooks';
import Avatar from '../Avatar';
import BotButtons from '../Buttons';

import './index.less';

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {withAvatar = false, context, component = {}} = props;

    const {componentData} = useWebHook(component, context);

    const {resources = []} = componentData;
    // 筛选获取text文本resource
    const textResource = _.find(resources, {resourceType: DIALOG_ITEM_SUBTYPE.TEXT});

    // 当前元件是否存在button
    const inButtons = useButtons({component: componentData, type: DIALOG_BUTTON_LOCATION_TYPE.INNER});
    const hasButtons = inButtons.length > 0;

    // 显示文本
    const {text = '', showType = false} = _.get(textResource, 'content', {});

    // 如果存在元件内button，此时需要居中显示button
    const textWidgetClassName = hasButtons ? 'text-item-center' : 'text-item-left';
    const textClassName = showType === DIALOG_BUTTON_SHOW_TYPE.HIGHLIGHT ? 'text-text-highlight' : '';
    return text ? (
        <div className="bd-bot-dialog-item bd-bot-widget-text-reply">
            {withAvatar && <Avatar size="small" />}
            <div className={`text-item ${textWidgetClassName}`}>
                <div className={textClassName}>{text}</div>
                <BotButtons component={component} />
            </div>
        </div>
    ) : null;
};
