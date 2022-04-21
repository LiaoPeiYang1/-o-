/**
 * @file components/biz/Bot/ZoneCommand
 * @desc 机器人对话底部需要用户操作的commands
 * @author dingyang
 */

import React from 'react';
import _ from 'lodash';

import {useDialogs} from '../hooks';
import {OUT_BUTTONS} from '../hooks/useDialogs';
import {Button as BotButton} from '../widgets';

import './index.less';

export default () => {
    const {outButtonsInfo = {}} = useDialogs(OUT_BUTTONS);

    const {buttons: locationOutButtons, component} = outButtonsInfo;
    return (
        <div className="bd-bot-command-zone layout-column">
            {_.map(locationOutButtons, (item, index) => (
                <BotButton
                    key={`${item.resourceId}${index}`}
                    className="bd-bot-radio-button"
                    highlightClassName="highlight-radio"
                    data={item}
                    component={component}
                    prefix={<span className="radio-button-prefix">{index + 1}</span>}
                />
            ))}
        </div>
    );
};
