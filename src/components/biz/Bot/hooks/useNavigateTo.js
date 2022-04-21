/**
 * @file useNavigateTo 跳转处理
 * @author sunwen05
 */

import {useCallback} from 'react';

import useMiniProgram from './useMiniProgram';

const WINDOW_OPEN_TYPE = {
    BLANK: '_blank'
};
let onPause = null;

export default () => {
    const {miniProgramNavigateTo} = useMiniProgram();

    const windowNavigateTo = useCallback((url, type, inMiniprogram) => {
        if (type === WINDOW_OPEN_TYPE.BLANK && !inMiniprogram) {
            if (!window.open(url)) {
                window.location.href = url;
            }
        }
        else {
            window.location.href = url;
        }
    }, []);

    const navigateTo = useCallback((url, type) => {
        miniProgramNavigateTo({
            url,
            fail: function (inMiniprogram) {
                windowNavigateTo(url, type, inMiniprogram);
            }
        });
        onPause && onPause();
    }, [miniProgramNavigateTo, windowNavigateTo]);

    const registerPauseMethod = useCallback(callback => {
        onPause = callback;
    }, []);

    return {navigateTo, registerPauseMethod};
};
