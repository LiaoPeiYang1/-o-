/**
 * @file components/biz/Bot/DialogZone/components/Card
 * @desc card: widget
 * @author dingyang
 */

import './index.less';

export default props => {
    const {className = '', children} = props;

    return (
        <div className={`bd-bot-widget-card ${className}`}>
            {children}
        </div>
    );
};
