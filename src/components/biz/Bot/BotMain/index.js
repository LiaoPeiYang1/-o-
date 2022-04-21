/**
 * @file components/biz/BotMain
 * @desc 百度bot机器人main区域
 * @author dingyang
 */

import {useBotSpread} from '../hooks';
import ZoneDialog from '../ZoneDialog';
import ZoneCommand from '../ZoneCommand';
import ZoneAction from '../ZoneAction';

import './index.less';

export default (props = {}) => {
    const {spread, spreadBot} = useBotSpread();

    return (
        <div className="bd-layout-main-module">
            <div className="layout-main-dialog">
                <ZoneDialog {...props} />
            </div>

            <div className="layout-main-command">
                {spread && <ZoneCommand />}
            </div>

            <div className="layout-main-action" onClick={spreadBot}>
                <ZoneAction />
            </div>
        </div>
    );
};
