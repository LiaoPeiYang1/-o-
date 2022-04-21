/**
 * @file hooks/useBang
 * @description 刘海屏相关设置
 * @author dingyang
 */

import {useCallback, useEffect, useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

export default () => {
    const [height, setHeight] = useState(0);

    // 是否考虑刘海屏
    const withBangRedux = useSelector(state => _.get(state, 'aida.userConfig.withBang'));
    // 主题相关配置项
    const isFullScreen = useSelector(state => _.get(state, 'aida.userConfig.isFullScreen'));

    const withBang = useMemo(() => {
        // 兼容字符串
        let withBang = false;
        if (_.isBoolean(withBangRedux)) {
            withBang = withBangRedux;
        }
        else {
            withBang = withBangRedux === 'true';
        }
        return withBang;
    }, [withBangRedux]);

    // 刘海屏处理相关逻辑
    const handleBangChange = useCallback(() => {
        if (withBang && isFullScreen) {

        }
    }, [withBang, isFullScreen]);

    useEffect(() => {
        handleBangChange();
    }, [handleBangChange]);

    return {
        height
    };
};
