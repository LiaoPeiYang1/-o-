/**
 * @file hooks/useComputedStyle
 * @description 获取dom的样式表
 * @author v_zhangyibo01
 */

import {useMemo} from 'react';
import _ from 'lodash';

export default (props = {}) => {
    const {ele, styleNames = []} = props;
    const computedStyle = useMemo(() => {
        if (_.isEmpty(styleNames) || !ele) {
            return null;
        }
        let styleObj = {};
        _.each(styleNames, styleName => {
            const style = window.getComputedStyle(ele, null).getPropertyValue(styleName);
            styleObj[styleName] = style;
        });
        return styleObj;
    }, [ele, styleNames]);
    return computedStyle;
};
