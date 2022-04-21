/**
 * @file components/biz/Bot/DialogZone/finance/components/purchase
 * @desc purchase
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import './index.less';

export default props => {
    const {component = {}} = props;
    const componentData = _.get(component, 'resources[0].content.params[0].value[0]');

    return (
        <div className="bd-bot-dialog-item finance-insure-purchase-wrap">
            <div className="finance-insure-purchase-card">
                <div className="purchase-card-top">
                    <div className="purchase-top-sign">{componentData.level}</div>
                </div>
                <div className="purchase-name">{componentData.name}</div>
                <div className="purchase-desc">
                    {_.map(componentData.tags, (item, index) => (
                        <div key={index} className="purchase-desc-tags-item">{item}</div>
                    ))}
                </div>
                <div className="insure-purchase-join">
                    <div className="purchase-join-price">
                        {componentData.price}<span>元起</span>
                    </div>
                    <a rel="noreferrer" target="_blank" href={componentData.joinUrl}>
                        <div className="purchase-join-button">立即加入</div>
                    </a>
                </div>
            </div>
        </div>
    );

};