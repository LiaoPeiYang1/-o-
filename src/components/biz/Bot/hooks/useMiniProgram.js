/**
 * @file useMiniProgram 微信小程序相关api
 * @author sunwen05
 */

import {useRef, useEffect, useCallback} from 'react';

/* globals wx */
export default () => {
    const inMiniprogram = useRef(false);

    // 小程序跳转
    const miniProgramNavigateTo = useCallback(config => {
        const {url, fail} = config;
        const failCallBack = () => {
            fail && fail(inMiniprogram.current);
        };
        if (inMiniprogram.current && !/https|http/.test(url)) {
            wx.miniProgram.navigateTo({...config, fail: failCallBack});
            return;
        }
        failCallBack();
    }, []);

    // 判断是否在小程序中
    useEffect(() => {
        if (window.wx) {
            wx.miniProgram.getEnv(res => {
                inMiniprogram.current = res.miniprogram;
            });
        }
    }, []);

    return {miniProgramNavigateTo};
};
