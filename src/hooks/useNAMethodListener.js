/**
 * @file useNAMethodListener
 * @description 监听NAtive端消息
 * @author dingyang
 */

import {useEffect, useCallback} from 'react';

export default (nativeFunctionName, bindFunction) => {
    const addNAMethodListener = useCallback(() => {
        window[nativeFunctionName] = msgBody => {
            bindFunction(msgBody);
        };
    }, [nativeFunctionName, bindFunction]);

    useEffect(() => {
        addNAMethodListener();
    }, [addNAMethodListener]);
};
