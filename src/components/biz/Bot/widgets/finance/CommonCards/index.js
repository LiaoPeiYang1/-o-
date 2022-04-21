/**
 * @file components/biz/Bot/DialogZone/finance/components/card
 * @desc cards
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import Card from '../CommonCard';
import UpdateButton from '../../UpdateButton';
import {FINANCE_WEB_HOOK_TYPE} from '../constants/constants';
import usePathListChange from '../../../hooks/usePathListChange';

import './index.less';

export default props => {
    const {component = {}, componentType} = props;
    // 渲染数据获取
    const cardsData = _.get(component, 'resources[0].content.params[0].value', []);
    const cardsLength = cardsData.length;

    const {showPageData, handleDataRefresh, handleDataMore} = usePathListChange(cardsData);

    const inList = cardsLength > 1;
    const isCardsMore = cardsLength > 3;
    // 换一批按钮
    const isShowChange = componentType === FINANCE_WEB_HOOK_TYPE.FUND_RANKING_CARD;
    const isShowMore = isShowChange && isCardsMore && (cardsLength !== showPageData.length);
    return (
        <div className="bd-bot-dialog-item bot-finance-cards-wrap">
            <div className="bot-finance-cards">
                <div className="finance-card-list">
                    {_.map(showPageData, (card, index) => {
                        const commProps = {
                            key: index,
                            listIndex: index + 1,
                            inList,
                            componentType,
                            component: card
                        };
                        return (
                            <div className="finance-cards-item" key={index}>
                                <Card {...commProps} />
                            </div>
                        );
                    })}
                </div>
                {isShowMore && <div className="finance-cards-more" onClick={handleDataMore}>
                    查看更多
                </div>}
            </div>
            {(!isShowChange && isCardsMore) && <UpdateButton handleDataRefresh={handleDataRefresh} />}
        </div>
    );

};