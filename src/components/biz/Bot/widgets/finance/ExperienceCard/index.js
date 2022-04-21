/**
 * @file components/biz/Bot/DialogZone/components/finance/components/analysis/ExperienceCard
 * @desc 财富体验卡片
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import './index.less';

export default props => {
    const {component = {}} = props;
    const componentData = _.get(component, 'resources[0].content.params[0].value[0]');

    return (
        <div className="bd-bot-dialog-item finance-analysis-experience-card-wrap">
            <div className="analysis-experience-box">
                <div className="analysis-experience-level">
                    <span>{componentData.level}</span>
                </div>
                <div className="experience-level-num">
                    <div className="level-num-honer">
                        {componentData.levelNumber}
                    </div>
                </div>
                <div className="analysis-experience-desc">
                    {componentData.description}
                </div>
                <div className="analysis-experience-content">
                    <div className="experience-content-item">
                        <div className="experience-content-value">{componentData.money}</div>
                        <div className="experience-content-label">总资产(元)</div>
                    </div>
                    <div className="experience-content-item">
                        <div className="experience-content-value">{componentData.mobility}</div>
                        <div className="experience-content-label">流动性</div>
                    </div>
                    <div className="experience-content-item">
                        <div className="experience-content-value">{componentData.risk}</div>
                        <div className="experience-content-label">风险评估</div>
                    </div>
                </div>
            </div>
        </div>
    );
};