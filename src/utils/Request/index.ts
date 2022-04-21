/**
 * @file utils/Request.js 针对bce业务做过二次封装Request工具库
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import Ajax, {AjaxOption} from './Ajax';

export interface ResponseMessage {
    redirect?: string;
    global?: string;
}

export interface Response {
    success: boolean;
    message?: ResponseMessage;
    result?: object;
    page?: object;
}

export class Request extends Ajax {
    static instance: any;

    constructor() {
        super();
        if (Request.instance) {
            return Request.instance;
        }
        Request.instance = this;
    }

    /*
    beforeSend(options) {
        // 可以对data进行操作
        // 可以对header进行操作
    }
    */

    failHandler(response: Response, options?: AjaxOption) {
        if (response.message) {
            if (response.message.redirect) {
                window.location.href = response.message.redirect;
            }
            if (options && !options.silent) {
                // response.message.global && message.error(response.message.global);
            }
            return response.message;
        }
        return {};
    }

    beforeSuccess(response: Response, options?: AjaxOption) {
        if (response.success) {
            // 成功之后的返回
            return response.page || response.result;
        }
        return Promise.reject(this.failHandler(response, options));
    }
}

export default new Request();
