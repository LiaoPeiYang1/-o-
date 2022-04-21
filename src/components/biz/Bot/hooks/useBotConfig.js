/**
 * @file hooks/useBotConfig
 * @description 机器人相关设置项
 * @author dingyang
 */

import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import actions from 'actions';
import {toastErrorMessage} from 'modules/common/helper';

export default () => {
    const userConfig = useSelector(state => _.get(state, 'aida.userConfig'));

    const dispatch = useDispatch();

    // 获取机器人配置项
    const getBotConfig = useCallback(() => {
        try {
            dispatch(actions.aidaConfig({
                botId: userConfig.botId || ''
            }));
        }
        catch (error) {
            toastErrorMessage(error);
        }
    }, [userConfig, dispatch]);

    useEffect(() => {
        if (!_.isEmpty(userConfig)) {
            getBotConfig();
        }
    }, [userConfig, getBotConfig]);
};
