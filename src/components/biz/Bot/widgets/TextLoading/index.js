/**
 * @file components/biz/Bot/DialogZone/components/TextLoading
 * @desc loading
 * @author dingyang
 */

import {useSelector} from 'react-redux';
import _ from 'lodash';

import './index.less';

export default () => {
    const loading = useSelector(state => _.get(state, 'show.loading', false));

    return (
        <div>
            {loading && (
                <div id="bd-bot-loading" className="bd-bot-dialog-item bd-bot-widget-text-reply">
                    <div className="text-item bd-bot-loading">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}
        </div>
    );
};
