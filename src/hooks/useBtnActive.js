/**
 * @file hooks/useBtnActive
 * @description 为了使h5端：active伪类样式生效（点击效果）
 * @author dingyang
 */

import {useCallback} from 'react';
import {useDocumentEvent} from '@huse/document-event';

export default () => {
    // 绑定空事件
    const handleBodyTouch = useCallback(() => {}, []);

    useDocumentEvent('touchstart', handleBodyTouch);
};
