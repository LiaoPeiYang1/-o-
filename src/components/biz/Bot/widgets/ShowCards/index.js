/**
 * @file components/biz/Bot/widgets/showCards
 * @desc 在线开卡
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useCallback} from 'react';

import SkillItem from './components/Item';
import {useNavigateTo} from '../../hooks';

import './index.less';

const JOIN_TYPE = '_blank';

export default props => {
    const {component = {}} = props;
    const cardsData = _.get(component, 'resources[0].content.params[0].value', []);

    const {navigateTo} = useNavigateTo();

    const handleUrlOpen = useCallback(url => {
        navigateTo(url, JOIN_TYPE);
    }, [navigateTo]);

    return (
        <div className='bd-bot-widget-cards'>
            <div className="bd-bot-widget-cards-block">
                {_.map(cardsData, (item, index) => (
                    <div
                        className="widget-cards-item-block"
                        key={index}
                        onClick={() => handleUrlOpen(item.joinUrl)}
                    >
                        <SkillItem data={item} type="inLine" />
                    </div>
                ))}
            </div>
        </div>
    );
};
