/**
 * @file Button 纯展示button组件
 * @author sunwen05
 */

import {memo} from 'react';

import './index.less';

const BUTTON_TYPE = {
    primary: {className: 'bd-bot-primary-button'},
    normal: {className: 'bd-bot-normal-button'},
    inline: {className: 'bd-bot-inline-button'},
    link: {className: 'bd-bot-link'}
};

export default memo(props => {
    const {onClick, type = 'primary', children, className, disabled} = props;
    const onClickFn = () => {
        if (!disabled) {
            onClick && onClick();
        }
    };

    const typeCls = BUTTON_TYPE[type].className;
    const disabledCls = disabled ? 'bd-bot-disabled' : '';
    return (
        <div
            className={`bd-bot-button ${typeCls} ${className} ${disabledCls}`}
            onClick={onClickFn}
        >
            <span>{children}</span>
        </div>
    );
});
