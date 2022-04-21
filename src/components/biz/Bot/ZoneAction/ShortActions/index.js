/**
 * @file components/biz/Bot/ZoneAction/ShortActions
 * @desc 底部actions: 预设快捷命令
 * @author dingyang
 */

import React, {useMemo} from 'react';
import _ from 'lodash';

import {DIALOG_BUTTON_SHOW_TYPE, ACTION_MODE_TYPE} from 'constants/constants';

import {useDialogs} from '../../hooks';
import {LAST_TAG} from '../../hooks/useDialogs';
import {Button as BotButton} from '../../widgets';

import './index.less';

export default props => {
    const {mode = ACTION_MODE_TYPE.DEFAULT} = props;
    const {lastTagComponent: tagComponent} = useDialogs(LAST_TAG);
    const tags = _.get(tagComponent, 'resources', []);

    // 置顶标签与一般标签分组
    const groupTags = useMemo(() => {
        const topTags = [];
        const commonTags = [];

        _.forEach(tags, tag => {
            const showType = _.get(tag, 'content.showType');
            if (showType === DIALOG_BUTTON_SHOW_TYPE.TOP && mode !== ACTION_MODE_TYPE.COMMON) {
                topTags.push(tag);
            }
            else {
                commonTags.push(tag);
            }
        });
        return {
            topTags,
            commonTags
        };
    }, [tags]);

    return (
        <div className="bd-bot-actions-short">
            <div className="bd-bot-actions-short-top-block">
                {_.map(groupTags.topTags, (item, index) => (
                    <BotButton
                        key={`${item.resourceId}${index}`}
                        className="bd-bot-actions-short-text"
                        data={item}
                        component={tagComponent}
                    />
                ))}
            </div>

            <div className="bd-bot-actions-short-block">
                {_.map(groupTags.commonTags, (item, index) => (
                    <div className="bd-bot-actions-short-text-box" key={`${item.resourceId}${index}`}>
                        <BotButton
                            className="bd-bot-actions-short-text"
                            highlightClassName="highlight-tag"
                            data={item}
                            component={tagComponent}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
