/**
 * @file components/biz/Bot/DialogZone/components/feed/components/goods
 * @desc 商品
 * @author v_liaopeiyang
 */

import _ from 'lodash';

import GoodsItem from '../GoodsItem';

import './index.less';

export default props => {
    const {component} = props;
    const goodsList = _.get(component, 'resources[0].content.params[0].value', []);

    return (
        <div className="feed-goods-wrap">
            <div className="feed-goods-wrap-block">
                {_.map(goodsList, (item, index) => (
                    <div key={index} className="feed-goods-item-block">
                        <GoodsItem {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
};