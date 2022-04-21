/**
 * @file components/biz/Bot/DialogZone/components/finance/components/analysis/ExperienceCard
 * @desc 风险评估
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import './index.less';

export default props => {
    const {component = {}} = props;
    const componentData = _.get(component, 'resources[0].content.params[0].value[0]');

    return (
        <div className="bd-bot-dialog-item finance-analysis-risk-card-wrap">
            <div className="analysis-risk-card-box">
                <div className="analysis-risk-card-box-typeName">
                    {componentData.type}
                </div>
                <div className="analysis-risk-card-box-typeDesc">
                    <span>
                        {componentData.typeDesc}
                    </span>
                </div>
                <div className="risk-card-info">
                    {_.map(componentData.infoList, (item, index) => (
                        <div key={index} className="risk-card-info-line">
                            <span>{item.label}</span>:
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
                <a rel="noreferrer" target="_blank" href={componentData.joinUrl}>
                    <div className="risk-card-button">查看详情</div>
                </a>
            </div>
        </div>
    );
};