/**
 * @file useDocumentBan 浏览器默认禁止
 * @author sunwen05
 */

import {useEffect} from 'react';

export default item => {
    // 禁止右键及长按功能
    useEffect(() => {
        if (item) {
            item.oncontextmenu = new Function('return false');
            item.oncontextmenu = function () {
                return false;
            };
            item.onselectstart = new Function('return false');
            item.onselectstart = function () {
                return false;
            };
        }
    }, [item]);
};