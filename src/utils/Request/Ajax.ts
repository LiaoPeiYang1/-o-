/**
 * @file utils/Request/Ajax.js Ajax库封装
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import _ from 'lodash';
import {Toast} from 'antd-mobile';
import axios from 'axios';

const codeMessage = {
    400: '400：发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '401：用户没有权限（令牌、用户名、密码错误）。',
    403: '403：用户得到授权，但是访问是被禁止的。',
    404: '404：发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '406：请求的格式不可得。',
    410: '410：请求的资源被永久删除，且不会再得到的。',
    422: '422：当创建一个对象时，发生一个验证错误。',
    500: '500：服务器发生错误，请检查服务器。',
    502: '502：网关错误。',
    503: '503：服务不可用，服务器暂时过载或维护。',
    504: '504：网关超时。'
};

axios.defaults.withCredentials = true;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type']
    = 'application/json; charset=UTF-8';
axios.defaults.timeout = 60000 * 20; // zhangzhe 2019-04-16 超时时长临时放宽到20分钟，要改回来

export interface AjaxOption {
    silent?: boolean
    [propName: string]: any;
}

export default class Ajax {

    setHeaders(headers: object) {
        axios.defaults.headers.common = {...axios.defaults.headers.common, ...headers};
    }

    beforeSend(options?: AjaxOption) {
        return options;
    }

    beforeSuccess(data: any, options?: AjaxOption) {
        if (options || !options) {
            return data;
        }
    }

    request(url: string, options?: AjaxOption) {
        const opts
            = typeof this.beforeSend === 'function'
                ? this.beforeSend(options) || options
                : options;

        return axios({url, ...opts})
            .then(response => {
                const {status, statusText} = response;
                if (status > 400 || status < 200) {
                    const error = new Error(
                        `API ${url} status is ${status} (${statusText})`
                    );
                    return Promise.reject(error);
                }
                return response.data;
            })
            .then(data => {
                if (typeof this.beforeSuccess === 'function') {
                    return this.beforeSuccess(data, options);
                }
                return data;
            })
            .catch(error => {
                if (error && error.message && (!options || (options && !options.silent))) {
                    const errorCode = _.get(error, 'response.status');
                    const errorMessage = (errorCode && codeMessage[errorCode]) ? codeMessage[errorCode] : error.message;
                    Toast.fail(errorMessage);
                }
                return Promise.reject(error);
            });
    }

    post(url: string, data?: any, options?: AjaxOption) {
        const opts = {
            method: 'post',
            data,
            ...options
        };
        return this.request(url, opts);
    }

    get(url: string, data?: any, options?: AjaxOption) {
        const opts = {
            method: 'get',
            data,
            ...options
        };
        return this.request(url, opts);
    }

    put(url: string, data?: any, options?: AjaxOption) {
        const opts = {
            method: 'put',
            data,
            ...options
        };
        return this.request(url, opts);
    }
}
