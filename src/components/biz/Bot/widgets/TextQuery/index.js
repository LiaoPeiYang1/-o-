/**
 * @file components/biz/Bot/DialogZone/components/TextQuery
 * @desc 用户询问text
 * @author dingyang
 */

import _ from 'lodash';

import './index.less';

/**
 * props：data
 * {
 *    resourceType
 *    content: {text: ''}
 * }
 * */

export default props => {
    const text = _.get(props, 'data.content.text', '');

    return (
        <div className="bd-bot-dialog-item bd-bot-widget-text-query widget-text-right">
            <div className="text-item">{text}</div>
        </div>
    );
};
