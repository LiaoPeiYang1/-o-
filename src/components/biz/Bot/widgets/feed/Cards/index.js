/**
 * @file components/biz/Bot/DialogZone/components/feed/InfoList
 * @desc 组合信息
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useMemo} from 'react';

import UpdateButton from '../../UpdateButton';
import Article from '../Article';
import Image from '../Image';
import Video from '../Video';
import usePathListChange from '../../../hooks/usePathListChange';
import {formatDate} from '../../../helper';

import './index.less';

// contentType类型说明 1:Article 2:Image 3:Video
const CONTENT_TYPE_MAPPING = {
    ARTICLE: 1,
    IMAGE: 4,
    VIDEO: 8
};

const PAGE_SIZE = 3;

export default props => {
    const {component = {}} = props;
    // 渲染数据获取
    const dataList = _.get(component, 'resources[0].content.params[0].value', []);

    const cardsData = useMemo(() => (_.map(dataList, item => ({
        ...item,
        publicTime: formatDate(item.publicTime, 'yyyy-MM-dd')
    }))), [dataList]);

    const {showPageData, handleDataRefresh} = usePathListChange(cardsData);

    // 是否需要list渲染
    const inList = cardsData.length > 1;
    const containerClassName = inList ? 'custom-feed-card-list' : '';
    return cardsData.length ? (
        <div className={`custom-feed-cards ${containerClassName}`}>
            <div className="custom-feed-cards-block">
                {_.map(showPageData, (card, index) => {
                    const {contentType} = card;
                    const commProps = {
                        key: index,
                        listIndex: index + 1,
                        inList,
                        data: card
                    };
                    switch (contentType) {
                        case CONTENT_TYPE_MAPPING.ARTICLE:
                            return (<Article {...commProps} />);
                        case CONTENT_TYPE_MAPPING.IMAGE:
                            return (<Image {...commProps} />);
                        case CONTENT_TYPE_MAPPING.VIDEO:
                            return (<Video {...commProps} />);
                    }
                    return null;
                })}
            </div>
            {(cardsData.length > PAGE_SIZE) && <UpdateButton handleDataRefresh={handleDataRefresh} />}
        </div>
    ) : null;
};
