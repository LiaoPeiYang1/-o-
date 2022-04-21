/**
 * @file widgets 入口
 * @author v_liaopeiyangs
 */

import {memo} from 'react';

import CommonCards from './CommonCards';
import CommonPurchase from './CommonPurchase';
import InsurePurchase from './InsurePurchase';
import AnalysisCard from './AnalysisCard';
import AnalysisTest from './AnalysisTest';
import ExperienceCard from './ExperienceCard';
import RiskCard from './RiskCard';
import {FINANCE_WEB_HOOK_TYPE} from './constants/constants';

export default memo(props => {
    const {componentType} = props;

    switch (componentType) {
        case FINANCE_WEB_HOOK_TYPE.INSURE_CARD:
        case FINANCE_WEB_HOOK_TYPE.FUND_CARD:
        case FINANCE_WEB_HOOK_TYPE.INCOME_CARD:
        case FINANCE_WEB_HOOK_TYPE.FUND_RANKING_CARD:
            return (<CommonCards {...props} />);
        case FINANCE_WEB_HOOK_TYPE.INCOME_PURCHASE:
        case FINANCE_WEB_HOOK_TYPE.FUND_PURCHASE:
            return (<CommonPurchase {...props} />);
        case FINANCE_WEB_HOOK_TYPE.INSURE_PURCHASE:
            return (<InsurePurchase {...props} />);
        case FINANCE_WEB_HOOK_TYPE.ANALYSIS_CARD:
            return <AnalysisCard {...props} />;
        case FINANCE_WEB_HOOK_TYPE.ANALYSIS_TEST:
            return <AnalysisTest {...props} />;
        case FINANCE_WEB_HOOK_TYPE.EXPERIENCE_CARD:
            return <ExperienceCard {...props} />;
        case FINANCE_WEB_HOOK_TYPE.RISK_CARD:
            return <RiskCard {...props} />;
    };
    return null;
});
