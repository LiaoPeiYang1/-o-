/**
 * @file components/biz/Bot/widget/Texts
 * @desc texts文本集合组件
 * @author dingyang
 */

import {useMemo} from 'react';
import _ from 'lodash';

import {DIALOG_BUTTON_SHOW_TYPE} from 'constants/constants';

import Text from '../new/Text';
import Button from '../Button';

import './index.less';

export default props => {
    const {text: textResource = {}, buttons: weakButtonResources = [], component} = props;
    const {text = '', showType} = _.get(textResource, 'content', {});

    // 渲染文本
    const renderText = useMemo(() => {
        const textClassName = showType === DIALOG_BUTTON_SHOW_TYPE.HIGHLIGHT ? 'bd-bot-widget-text-highlight' : '';
        return (<Text value={text} className={textClassName} />);
    }, [text, showType]);

    return (
        (text || weakButtonResources.length > 0) && (
            <div className="bd-bot-widget-text-weak-buttons">
                {renderText}

                {weakButtonResources.length > 0 && (
                    <div className="text-weak-buttons-box">
                        {_.map(weakButtonResources, (btnResource, index) => (
                            <Button
                                key={index}
                                className="bd-bot-inline-button"
                                data={btnResource}
                                component={component}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    );
};
