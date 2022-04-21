/**
 * @file components/biz/Bot/DialogZone/components/finance/components/analysis/analysisCard
 * @desc 组合信息
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import './index.less';

export default props => {
    const {component = {}} = props;
    const componentData = _.get(component, 'resources[0].content.params[0].value[0]');

    return (
        <div className="bd-bot-dialog-item finance-analysis-card-wrap">
            <div className="finance-analysis-card-box">
                <div className="finance-analysis-card-top">
                    <div className="analysis-card-name">
                        {componentData.title}
                        <span>{componentData.level}</span>
                    </div>
                    <p className="analysis-card-desc">
                        {componentData.desc}
                    </p>
                    <div className="analysis-card-bg-img"></div>
                </div>
                <div className="finance-analysis-card-bottom">
                    <div className="analysis-card-tags">
                        {_.map(componentData.tags, (item, index) => (
                            <div key={index} className="analysis-tags-item" >
                                <p>{item.value}</p>
                                <p>{item.label}</p>
                            </div>
                        )
                        )}
                    </div>
                    <a rel="noreferrer" target="_blank" href={componentData.joinUrl}>
                        <div className="analysis-card-button">查看具体收益</div>
                    </a>
                </div>
            </div>
        </div>
    );
};