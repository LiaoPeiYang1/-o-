/**
 * @file useFilterTimeOut 获取最后一个reply节点
 * @author sunwen05
 */

import {useMemo} from 'react';
import _ from 'lodash';

import {DIALOG_CHAT_TYPE, DIALOG_ITEM_TYPE} from 'constants/constants';

export default (props = {}) => {
    const {dialogs, isHalfMode} = props;
    // 重新格式化
    const formatDialogs = useMemo(() => {
        if (!isHalfMode) {
            return dialogs;
        }
        const withoutTimeoutList = _.filter(dialogs, item => {
            const {data = {}} = item;
            const {hitType} = data;
            return hitType !== DIALOG_CHAT_TYPE.TIMEOUT;
        });
        const lastReply = _.findLastIndex(withoutTimeoutList, {type: DIALOG_ITEM_TYPE.REPLY});
        return _.slice(withoutTimeoutList, 0, lastReply + 1);
    }, [dialogs, isHalfMode]);

    return formatDialogs;
};