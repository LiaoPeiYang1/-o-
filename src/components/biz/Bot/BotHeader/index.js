/**
 * @file components/biz/Bot/BotHeader
 * @desc 顶部icon
 * @author dingyang
 */

import {useBotSpread} from '../hooks';

import './index.less';

export default () => {
    const {spread, spreadBot} = useBotSpread();

    const wrapClassName = spread ? 'bot-header-icon-spread' : 'bot-header-icon-fold';
    return (
        <div
            className={`bot-header-tip-icon ${wrapClassName}`}
            onClick={() => spreadBot(false)}
        />
    );
};
