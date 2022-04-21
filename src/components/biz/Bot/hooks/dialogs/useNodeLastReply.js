/**
 * @file useNodeLastReply 获取最后一个reply节点
 * @author sunwen05
 */

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {DIALOG_ITEM_TYPE} from 'constants/constants';

export default () => {
    // 获取会话数据列表
    const dialogs = useSelector(state => _.get(state, 'aida.dialogs', []));

    // 获取最新reply节点数字人相关参数
    const lastReplyNode = useMemo(() => (
        _.get(_.findLast(dialogs, dialog => {
            const {type, data = {}} = dialog;
            return type === DIALOG_ITEM_TYPE.REPLY && data.hitType !== 'timeout';
        }), 'data', {})
    ), [dialogs]);

    return lastReplyNode;
};