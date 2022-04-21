/**
 * @file uaUtil class相关操作
 * @author dingyang
 */

import _ from 'lodash';
import UAParser from 'ua-parser-js';

const uaParser = new UAParser();
const uaResult = uaParser.getResult();
const uaLowerCase = uaResult.ua.toLowerCase();

// 平台映射关系
export const OS_PLATFORM = {
    IOS: 'iOS',
    ANDROID: 'Android'
};

export const isIOS = uaResult.os.name === OS_PLATFORM.IOS;
export const isAndroid = uaResult.os.name === OS_PLATFORM.ANDROID;
export const isMobile = !!uaLowerCase.match(/applewebkit.*mobile.*/);

// 浏览器类型
export const BAIDUHI = 'BAIDUHI';
export const UC = 'UC';

// platform:reg映射关系
export const PLATFORM_MAPPING = {
    [BAIDUHI]: /(baiduhi|baiduwallet)/,
    [UC]: /uc/
};

/**
 * getBrowser
 * @description 获取当前平台类型
 */
export function getBrowser() {
    let browser = '';
    _.forEach(PLATFORM_MAPPING, (value, key) => {
        if (uaLowerCase.match(value)) {
            browser = key;
            return false;
        }
    });
    return browser;
};

/**
 * phoneType
 * @description 相关机型判断
 */
export const phoneType = {
    // 是否为iphoneX
    isIPhoneX() {
        return isIOS && screen.height === 812 && screen.width === 375;
    }
};

/**
 * browserType
 * @description 浏览器判断
 */
export const browserType = {
    // UC
    isUC: getBrowser() === UC,
    // 百度HI
    isBAIDUHI: getBrowser() === BAIDUHI
};
