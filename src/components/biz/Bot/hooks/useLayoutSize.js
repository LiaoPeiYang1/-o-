/**
 * @file useLayoutSize
 * @author sunwen05
 */

import {useWindowSize} from '@huse/window-size';

import {uaUtil} from 'utils';

const {isMobile} = uaUtil;
const STANDARD_SHOW_SCALE = 414 / 736; // 参考iphone6/7/8plus

export default () => {
    const {innerWidth, innerHeight} = useWindowSize();

    // 如果是手机端 || 竖屏逻辑
    if (isMobile || innerWidth <= innerHeight) {
        return {
            full: true, // 是否100%
            clientWidth: innerWidth,
            clientHeight: innerHeight
        };
    }
    // 返回动态计算宽度
    return {
        full: false, // 是否100%
        clientWidth: STANDARD_SHOW_SCALE * innerHeight,
        clientHeight: innerHeight
    };
};
