/**
 * @file Tooltip 气泡widget
 * @author sunwen05
 */

import _ from 'lodash';
import {memo} from 'react';
import {useElementSize} from '@huse/element-size';

import Card from '../Card';
import {Text} from '../new';
import './index.less';

export default memo(props => {
    const {text, visible, className = ''} = props;

    // 数字人话术气泡size
    const [cardWrapRef, cardWrapSize = {}] = useElementSize();

    const wrapSpeakClass = `bd-bot-widget-tooltip ${!visible ? 'tooltip-hide' : ''} ${className}`;
    // 数字人话术气泡高度，内容高+三角形高
    const cardHeight = visible ? _.get(cardWrapSize, 'height', 0) : 0;
    return (
        <div className={wrapSpeakClass} style={{height: cardHeight}}>
            <div ref={cardWrapRef}>
                <Card className="bd-bot-widget-card-with-triangle bd-bot-widget-card-inline">
                    <Text value={text} />
                </Card>
            </div>
        </div>
    );
});
