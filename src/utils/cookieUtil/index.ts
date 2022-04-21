/**
 * @file utils/cookie.js cookie相关工具类
 * @author zhangzhe(zhangzhe@baidu.com)
 */

export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

export function getCookie(name: string, cookieText = '') {
    if (isBrowser()) {
        cookieText = document.cookie;
    }
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = cookieText.match(reg);

    return arr ? decodeURIComponent(arr[2]) : '';
}

export function setCookie(name: string, value: any) {
    document.cookie = name + '=' + escape(value) + '; path=/';
}

export function removeCookie(name: string) {
    const value = getCookie(name);

    if (value) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 10000);
        document.cookie
            = name + '=' + value + '; expires=' + exp.toUTCString() + '; path=/';
    }
}
