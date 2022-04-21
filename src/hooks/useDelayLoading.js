/**
 * @file useDelayLoading
 * @description 故意延迟请求【为了交互体验】
 * @author dingyang
 */

import {useCallback, useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

export default () => {
    const loading = useSelector(state => _.get(state, 'show.loading', false));

    const [innerLoading, setInnerLoading] = useState(loading);

    const timerRef = useRef();

    // 延迟执行loading为了动画
    const handleLoadingDelay = useCallback(() => {
        if (loading) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            setInnerLoading(true);
        }
        else {
            timerRef.current = setTimeout(() => {
                setInnerLoading(false);
            }, 0);
        }
    }, [loading]);

    useEffect(() => {
        handleLoadingDelay();
    }, [handleLoadingDelay]);

    return innerLoading;
};
