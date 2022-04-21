/**
 * @file hooks/useBotChat
 * @description 机器人chat请求
 * @author dingyang
 */

import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import actions from 'actions';
import {AIDA_BOT_DIALOG_LOADING} from 'constants/ActionTypes';
import {DIALOG_CHAT_TYPE, UUID} from 'constants/constants';
import {toastErrorMessage} from 'modules/common/helper';

export default (props = {}) => {
    const {init = false} = props;

    const userConfig = useSelector(state => _.get(state, 'aida.userConfig'));

    const dispatch = useDispatch();

    // 获取初始化节点数据
    const getBotReply = useCallback(async (params, withLoading = true) => {
        const {botId = '', skillId = '', uid = '', isPreview: preview = false} = userConfig;

        // isPreview 兼容字符串为string
        const isPreview = _.isString(preview) ? preview === 'true' : preview;
        const timer = params.type === DIALOG_CHAT_TYPE.INIT ? 0 : 400;

        dispatch({
            type: AIDA_BOT_DIALOG_LOADING,
            data: withLoading
        });
        // 然后立即拉到容器底部区域【为了loading效果能够展示出来】
        setTimeout(() => {
            const loadingElement = document.getElementById('bd-bot-loading');
            loadingElement && loadingElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});
        }, 0);

        // 延迟400ms执行 为了给loading充足时间
        setTimeout(async () => {
            try {
                await dispatch(actions.aidaChat({
                    // 以下参数待定
                    botId,
                    skillId,

                    uid,
                    sessionId: UUID,

                    isPreview,

                    type: '',
                    resourceId: '',
                    query: '',
                    realSkillId: '',

                    ...params // 用户自定义参数复写
                }));
                dispatch({
                    type: AIDA_BOT_DIALOG_LOADING,
                    data: false
                });
            }
            catch (error) {
                toastErrorMessage(error);
                dispatch({
                    type: AIDA_BOT_DIALOG_LOADING,
                    data: false
                });
            }
        }, timer);

    }, [userConfig, dispatch]);

    // 发送message消息
    const sendMessage = useCallback((params = {}, withLoading = true) => {
        if (params.query) {
            dispatch(actions.aidaQuery(params.query));
        }
        getBotReply(params, withLoading);
    }, [dispatch, getBotReply]);

    useEffect(() => {
        if (init && !_.isEmpty(userConfig)) {
            getBotReply({type: DIALOG_CHAT_TYPE.INIT});
        }
    }, [init, userConfig, getBotReply]);

    return {
        getBotReply,
        sendMessage
    };
};
