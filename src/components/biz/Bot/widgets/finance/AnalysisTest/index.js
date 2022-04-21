/**
 * @file components/biz/Bot/DialogZone/components/finance/components/analysis/analysisText
 * @desc 组合信息
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import './index.less';

export default props => {
    const {component = {}} = props;
    const componentData = _.get(component, 'resources[0].content.params[0].value[0]');

    return (
        <div className="bd-bot-dialog-item finance-analysis-text-wrap">
            <div className="finance-analysis-text-box">
                <div className="analysis-text-content">
                    <div className="analysis-text-name">{componentData.name}</div>
                    <div className="analysis-text-desc">{componentData.description}</div>
                </div>
                <a rel="noreferrer" target="_blank" href={componentData.joinUrl}>
                    <div className="analysis-tex-button">
                        开始测试
                    </div>
                </a>
            </div>
        </div>
    );
};