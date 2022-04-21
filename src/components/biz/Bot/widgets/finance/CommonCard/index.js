/**
 * @file components/biz/Bot/DialogZone/finance/components/card
 * @desc card
 * @author v_liaopeiyang
 */

import {memo, useMemo} from 'react';

import {FINANCE_WEB_HOOK_TYPE} from '../constants/constants';
import NormalCard from '../NormalCard';
import PriceCard from '../PriceCard';

import './index.less';

export default memo(props => {
    const {componentType} = props;

    const componentWidget = useMemo(() => {
        switch (componentType) {
            case FINANCE_WEB_HOOK_TYPE.FUND_CARD:
            case FINANCE_WEB_HOOK_TYPE.INCOME_CARD:
            case FINANCE_WEB_HOOK_TYPE.FUND_RANKING_CARD:
                return <NormalCard {...props} />;
            case FINANCE_WEB_HOOK_TYPE.INSURE_CARD:
                return <PriceCard {...props} />;
            default:
                return null;
        }
    }, [componentType, props]);

    return (
        <div className="bd-bot-dialog-item bot-finance-card">
            {componentWidget}
        </div>
    );
});