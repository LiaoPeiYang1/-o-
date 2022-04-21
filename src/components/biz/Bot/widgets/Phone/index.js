/**
 * @file components/biz/Bot/DialogZone/components/Text
 * @desc 机器人text文本widget
 * @author dingyang
 */

import {useCallback, useEffect, useState, useRef} from 'react';
import {InputItem} from 'antd-mobile';
import _ from 'lodash';

import {DIALOG_ITEM_SUBTYPE, DIALOG_CHAT_TYPE} from 'constants/constants';
import {toastErrorMessage} from 'modules/common/helper';
import actions from 'actions';

import {useBotChat, useBotSpread} from '../../hooks';
import useTrack, {TRACK_TARGET_TYPE} from '../../hooks/useTrack';
import Avatar from '../Avatar';

import './index.less';

const VSCODE_COUNT_DOWN_SECONDS = 60; // 验证码倒计时时间60s
// 格式化手机号去除空格
const formatPhone = value => value.replace(/\s/g, '');
// 手机号验证
const phoneReg = /^1\d{10}$/;

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {component = {}, withVSCode = false, withAvatar = false} = props;
    const {resources = [], realSkillId = '', context, nodeId} = component;

    const [phone, setPhone] = useState('');
    const [vscode, setVSCode] = useState('');
    const [hasError, setHasError] = useState(false);
    const [hasVSCodeError, setHasVSCodeError] = useState(false);
    const [vscodeCountDownSeconds, setVSCodeCountDownSeconds] = useState(0);

    const timerRef = useRef(); // 倒计时ref
    const {sendMessage} = useBotChat(); // bot会话请求
    const {spreadBot} = useBotSpread();
    const {sendTrackMessage} = useTrack();

    // 获取输入文本resource
    const phoneResource = _.find(resources, {resourceType: DIALOG_ITEM_SUBTYPE.USER_INPUT});
    // 获取手机号配置相关信息
    const {resourceId = '', content: resourceContent = {}} = phoneResource || {};
    const {text = '手机号', key: paramKey = '', caption, vsCodeUrl, vsCodeKey} = resourceContent;

    // timer清空
    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // phone手机号变化
    const handlePhoneChange = useCallback(value => {
        setPhone(value);
        setHasError(false);
    }, []);

    // phone-vscode change
    const handleVSCodeChange = useCallback(value => {
        setVSCode(value);
        setHasVSCodeError(false);
    }, []);

    // 发送手机验证码
    const sendVSCode = useCallback(async (url, params = {}) => {
        try {
            await actions.aidaVSCode(url, params);
        }
        catch (error) {
            toastErrorMessage(error);
        }
    }, []);

    // 单击发送验证码
    const handleVSCodeSend = useCallback(() => {
        const newPhone = formatPhone(phone);
        const testRes = phoneReg.test(newPhone);
        if (newPhone && testRes && !vscodeCountDownSeconds) {
            // 首先发送验证码获取-todo
            sendVSCode(vsCodeUrl, {phone: newPhone});

            // 然后开启倒计时
            clearTimer();
            setVSCodeCountDownSeconds(VSCODE_COUNT_DOWN_SECONDS);
        }
        else if (!phone) {
            setHasError(true);
        }
    }, [phone, vscodeCountDownSeconds, vsCodeUrl, clearTimer, sendVSCode]);

    // 输入手机号埋点
    const handleInputBlur = useCallback(() => {
        sendTrackMessage({
            target: 'phoneNum',
            type: TRACK_TARGET_TYPE.BLUR,
            param: phone,
            nodeId
        });
    }, [phone, nodeId, sendTrackMessage]);

    // 验证码提交
    const handleSubmit = useCallback(() => {
        spreadBot();

        // 首先进行手机号验证
        const newPhone = formatPhone(phone);
        const testRes = phoneReg.test(newPhone);
        if (!newPhone || !testRes) {
            setHasError(true);
            return;
        }

        // 如果携带验证码，需要验证码验证
        if (withVSCode && !vscode) {
            setHasVSCodeError(true);
            return;
        }

        // 发送机器人交互会话请求
        sendMessage({
            type: DIALOG_CHAT_TYPE.COMMIT,
            query: newPhone,
            realSkillId,
            resourceId,
            context,
            attachResources: [
                {
                    resourceId,
                    params: [{key: paramKey, value: newPhone}]
                }
            ],
            ...(withVSCode ? {vscode, vsCodeKey} : {})
        });
        sendTrackMessage({
            target: 'phoneNum',
            type: TRACK_TARGET_TYPE.SUBMIT,
            param: newPhone,
            nodeId
        });
    }, [
        resourceId,
        nodeId,
        paramKey,
        realSkillId,
        phone,
        vscode,
        context,
        withVSCode,
        vsCodeKey,
        sendMessage,
        spreadBot,
        sendTrackMessage
    ]);

    // 倒计时监听
    useEffect(() => {
        if (!vscodeCountDownSeconds) {
            return;
        }

        timerRef.current = setTimeout(() => {
            setVSCodeCountDownSeconds(c => (c - 1));
        }, 1000);
    }, [vscodeCountDownSeconds]);

    useEffect(() => {
        // 组件卸载时，清空倒计时
        return clearTimer;
    }, [clearTimer]);

    // vscode按钮展示逻辑
    const vscodeClassName = vscodeCountDownSeconds ? 'vscode-disable' : '';
    const vscodeTip = vscodeCountDownSeconds ? `${vscodeCountDownSeconds}s后重发` : '获取验证码';
    return (
        <div className="bd-bot-dialog-item bd-bot-widget-phone-reply">
            {withAvatar && <Avatar size="small" />}
            <div className="phone-item phone-item-center">
                <InputItem
                    type="phone"
                    placeholder={text}
                    error={hasError}
                    value={phone}
                    onChange={handlePhoneChange}
                    onClick={spreadBot}
                    onBlur={handleInputBlur}
                />
                {withVSCode && (
                    <div className="phone-vscode-box">
                        <div className="phone-vscode">
                            <InputItem
                                type="number"
                                placeholder="验证码"
                                maxLength={6}
                                value={vscode}
                                error={hasVSCodeError}
                                onChange={handleVSCodeChange}
                                onClick={spreadBot}
                            />
                        </div>
                        <div
                            className={`bd-bot-btn phone-vscode-send ${vscodeClassName}`}
                            onClick={handleVSCodeSend}
                        >{vscodeTip}</div>
                    </div>
                )}
                <div className="bd-bot-btn bd-bot-phone-submit" onClick={handleSubmit}>{caption}</div>
            </div>
        </div>
    );
};
