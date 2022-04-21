/**
 * @file common/helper
 * @author zhangzhe
 */

import {Toast} from 'antd-mobile';

export function toastErrorMessage(error: any) {
    if (error && error.global) {
        Toast.fail(error.global);
    }
}
