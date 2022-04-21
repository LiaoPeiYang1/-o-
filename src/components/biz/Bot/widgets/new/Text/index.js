/**
 * @file components/biz/Bot/widget/Text
 * @desc text文本组件
 * @author dingyang
 */

import './index.less';

export default props => {
    const {value = '', className = ''} = props;

    const textClassName = `bd-bot-widget-text-new ${className}`;
    return value ? (
        <div className={textClassName}>{value}</div>
    ) : null;
};
