/**
 * @file components/biz/Bot/DialogZone/finance/components/purchase
 * @desc purchase
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import {FINANCE_WEB_HOOK_TYPE} from '../constants/constants';

import './index.less';

export default props => {
    const {component = {}} = props;
    const componentData = _.get(component, 'resources[0].content.params[0].value[0]');
    const componentType = _.get(component, 'componentType');

    const isFunPurchase = componentType === FINANCE_WEB_HOOK_TYPE.FUND_PURCHASE;
    return (
        <div className="bd-bot-dialog-item bot-finance-purchase-wrap">
            <div className="bot-finance-purchase-card">
                <div className="purchase-card-top">
                    <div className="purchase-top-sign">{componentData.level}</div>
                </div>
                {isFunPurchase ? (
                    <div>
                        <div className="finance-purchase-name">{componentData.name}</div>
                        <div className="finance-purchase-desc">{componentData.description}</div>
                        <div className="finance-purchase-num">
                            {_.get(componentData, 'lastThreeYearRatio.value', '')}%
                        </div>
                        <div className="finance-purchase-time-slot">
                            {_.get(componentData, 'lastThreeYearRatio.label', '')}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="income-purchase-content">
                            <div className="income-purchase-name">{componentData.name}</div>
                            <div className="income-purchase-desc">{componentData.description}</div>
                            <div className="purchase-tags-list">
                                {_.map(componentData.tags, (item, index) => (
                                    <div key={index} className="purchase-tags-item">
                                        <div className="purchase-tags-item-value">{item.value}</div>
                                        <div className="purchase-tags-item-label">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) }
                <a rel="noreferrer" target="_blank" href={componentData.joinUrl}>
                    <div className="finance-purchase-button">立即购买</div>
                </a>
            </div>
        </div>
    );

};