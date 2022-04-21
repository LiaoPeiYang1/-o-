/**
 * @file components/biz/Bot/DialogZone/finance/CommonCard/priceCard
 * @desc priceCard
 * @author v_liaopeiyang
 */

import _ from 'lodash';
import {useCallback} from 'react';

import {useNavigateTo} from '../../../hooks';

const JOIN_TYPE = '_blank';

export default props => {
    const {component = {}} = props;

    const {navigateTo} = useNavigateTo();

    const handleUrlOpen = useCallback(() => {
        navigateTo(component.joinUrl, JOIN_TYPE);
    }, [component, navigateTo]);

    const imgStyle = {
        'backgroundImage': `url(${component.imageUrl})`
    };
    return (
        <div className="bot-finance-card-wrap" onClick={handleUrlOpen}>
            {component.imageUrl ? (
                <div className="bot-finance-card-box">
                    <div className="finance-card-box-content insure-card-content">
                        <div
                            style={imgStyle}
                            className="finance-insure-box-image"
                        >
                            <div className="insure-image-name">{component.imageName}</div>
                        </div>
                        <div className="card-content-right finance-insure-box-right">
                            <div className="content-right-info">{component.name}</div>
                            <div className="desc-list">
                                {_.map(component.tags, (item, index) => (
                                    <div key={index} className="card-content-desc">{item}</div>
                                ))}
                            </div>
                            <div className="insure-price insure-price-block">{component.price}<span>元起</span></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bot-finance-card-box">
                    <div className="finance-card-box-content insure-normal-card-content">
                        <div className="insure-normal-card-left">
                            <div className="insure-normal-card-title">{component.name}</div>
                            <div className="desc-list">
                                {_.map(component.tags, (item, index) => (
                                    <div key={index} className="card-content-desc">{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className="insure-normal-card-right">
                            <div className="insure-price">{component.price}<span>元起</span></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};