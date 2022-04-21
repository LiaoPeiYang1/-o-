/**
 * @file components/biz/Bot/DialogZone/components/updateButton
 * @desc 换一批按钮
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useSelector} from 'react-redux';

import Icon from 'components/biz/Icon';

import './index.less';

export default props => {
    const {handleDataRefresh, showType = 'center'} = props;

    const config = useSelector(state => _.get(state, 'aida.serverConfig'));
    const {theme = 'blue'} = config;

    const btnIcon = theme === 'blue' ? 'refreshBlue' : 'refreshGold';
    const showTypeClass = showType === 'center' ? 'update-button-center' : '';
    return (
        <div className={`bd-update-button-wrap  ${showTypeClass}`}>
            <div className="bd-update-button" onClick={handleDataRefresh}>
                换一批
                <Icon tag={btnIcon} />
            </div>
        </div>
    );
};