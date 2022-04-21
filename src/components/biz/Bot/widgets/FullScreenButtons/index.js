/**
 * @file components/biz/Bot/widgets/FullScreenButtons
 * @desc 全屏buttons
 * @author dingyang
 */

import _ from 'lodash';

import Button from '../Button';

import './index.less';

export default props => {
    const {className = '', buttons: buttonResources = [], component = {}} = props;

    return (
        <>
            {buttonResources.length > 0 && (
                <div className={`bd-bot-normal-buttons ${className}`}>
                    {_.map(buttonResources, (item, index) => (
                        <Button
                            key={index}
                            className="bd-bot-inline-button"
                            highlightClassName="highlight-button"
                            data={item}
                            component={component}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
