/**
 * @file utils/rem.js 移动端自适应方案
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {getLayoutWidth} from 'components/biz/Bot/helper';

const BASE_FONT_SIZE = 16;

export function setRem() {
    const change = () => {
        const {clientWidth} = getLayoutWidth();
        document.documentElement.style.fontSize = BASE_FONT_SIZE * clientWidth / 375 + 'px';
    };
    change();

    window.addEventListener('resize', function () {
        change();
    });
}
