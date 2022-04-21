/**
 * @file components/biz/Bot/DialogZone/finance/CommonCard/NormalCard
 * @desc NormalCard
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useCallback} from 'react';

import {useNavigateTo} from '../../../hooks';
import {FINANCE_WEB_HOOK_TYPE} from '../constants/constants';
import firstImgUrl from '../../../../../../../assets/img/first.png';
import secondImgUrl from '../../../../../../../assets/img/second.png';
import thirdImgUrl from '../../../../../../../assets/img/third.png';

const RANKING_IMG_URL = [firstImgUrl, secondImgUrl, thirdImgUrl];
const TAG_COLOR_MAPPING = {
    blend: {background: '#F5E8FD', color: '#A328B4'},
    bond: {background: '#E6F2FE', color: '#3C8EDF'},
    shares: {background: '#FEEFEA', color: '#FE5E5E'},
    currency: {background: '#FEF7E7', color: '#DC9F23'}
};
// 显示基金，固收类型卡片时 里面 样式：排名和普通（list）
const CARD_TYPE = [
    FINANCE_WEB_HOOK_TYPE.FUND_CARD,
    FINANCE_WEB_HOOK_TYPE.INCOME_CARD
];

const JOIN_TYPE = '_blank';

export default props => {
    const {component = {}, componentType, listIndex} = props;

    const {navigateTo} = useNavigateTo();

    const handleUrlOpen = useCallback(() => {
        navigateTo(component.joinUrl, JOIN_TYPE);
    }, [component, navigateTo]);

    const rankingClass = _.includes(CARD_TYPE, componentType)
        ? 'bot-finance-normal-list' : 'bot-finance-ranking-class';
    return (
        <div className="bot-finance-card-box" onClick={handleUrlOpen}>
            <div className={`finance-card-box-content ${rankingClass}`}>
                <div className="bot-finance-card-box-left">
                    {(listIndex <= 3) ? (
                        <img src={RANKING_IMG_URL[listIndex - 1]} />
                    ) : (
                        <div className="card-box-left-num">{listIndex}</div>
                    )}
                </div>
                <div className="bot-finance-card-box-right">
                    <div className="finance-card-top-block">
                        {component.level && <div className="card-top-sign">{component.level}</div>}
                        {component.name}
                        <div
                            className="card-top-tag"
                            style={TAG_COLOR_MAPPING[_.get(component, 'types.key', '')]}
                        >
                            {_.get(component, 'types.value', '')}
                        </div>
                    </div>
                    <div className="finance-card-content">
                        <div className="card-content-left">
                            <div>
                                {_.get(component, 'lastThreeYearRatio.value', '')}%
                            </div>
                            <div className="card-content-desc content-left-desc">
                                { _.get(component, 'lastThreeYearRatio.label', '')}
                            </div>
                        </div>
                        <div className="card-content-right">
                            <div className="content-right-info">{component.description}</div>
                            <div className="desc-list">
                                {_.map(component.tags, (item, index) => (
                                    <div key={index} className="card-content-desc">{item}</div>
                                ))}
                            </div>
                            <div className="insure-price">{component.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};