/**
 * @file components/biz/Bot/DialogZone/components/Custom
 * @desc custom组件
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useMemo} from 'react';

import {DIALOG_ITEM_SUBTYPE} from 'constants/constants';
import {webHookUtil} from 'utils';

import {FINANCE_WEB_HOOK_TYPE} from '../finance/constants/constants';

import {
    // 文本,单图,多图兼容
    SingleImage,
    MultiImage,
    Text,
    ShowCards,
    // feed 模块
    FeedCards,
    FeedGoods,
    // finance 模块
    Finance
} from '../../widgets';

const {formatComponentData} = webHookUtil;

export default props => {
    const componentData = useMemo(() => formatComponentData(props), [props]);
    const componentType = _.get(componentData, 'component.resources[0].content.showComponentType');

    const componentWidget = useMemo(() => {
        switch (componentType) {
            case DIALOG_ITEM_SUBTYPE.TEXT:
                return <Text {...componentData} />;
            case DIALOG_ITEM_SUBTYPE.IMAGE:
                return <SingleImage {...componentData} />;
            case DIALOG_ITEM_SUBTYPE.MULTI_IMAGES:
                return <MultiImage {...componentData} />;
            case DIALOG_ITEM_SUBTYPE.SHOW_CARDS: {
                return <ShowCards {...componentData} />;
            }
            case DIALOG_ITEM_SUBTYPE.FEED:
                return <FeedCards {...componentData} />;
            case DIALOG_ITEM_SUBTYPE.FEED_GOODS:
                return <FeedGoods {...componentData} />;
            default:
                if (_.includes(FINANCE_WEB_HOOK_TYPE, componentType)) {
                    return <Finance {...componentData} componentType={componentType} />;
                }
        }
    }, [componentType, componentData]);

    return (
        <div>{componentWidget}</div>
    );

};