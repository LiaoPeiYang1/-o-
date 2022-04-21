/**
 * @file Form元件
 * @author sunwen05
 */

import _ from 'lodash';
import {useCallback, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createForm} from 'rc-form';

import {DIALOG_CHAT_TYPE} from 'constants/constants';
import actions from 'actions';

import FormItem from '../FormItem';
import Button from '../new/Button';
import {useBotChat, useBotSpread} from '../../hooks';
import useTrack, {TRACK_TARGET_TYPE} from '../../hooks/useTrack';
import './index.less';

const Form = props => {
    const {form, component} = props;
    const {resources = [], realSkillId = '', context, nodeId} = component;
    const {resourceId, content, resourceFrontId} = resources[0] || {};
    const {caption, controls, title, userParams} = content || {};

    const [submit, setSubmit] = useState(false);

    const {sendMessage} = useBotChat();
    const {spreadBot} = useBotSpread();
    const {sendTrackMessage} = useTrack();
    const dispatch = useDispatch();
    const formValues = useSelector(state => _.get(state, 'aida.forms'));

    const defaultValues = useMemo(() => (
        {...(formValues[resourceFrontId]?.value), ...userParams}
    ), [userParams, formValues, resourceFrontId]);

    // 提交表单
    const handleSubmit = useCallback(() => {
        spreadBot();
        form.validateFields({force: true}, async (error, value = {}) => {
            if (!error) {
                try {
                    if (submit) {
                        return;
                    }
                    setSubmit(true);
                    sendMessage({
                        type: DIALOG_CHAT_TYPE.COMMIT,
                        query: '',
                        realSkillId,
                        resourceId,
                        context,
                        attachResources: [
                            {
                                resourceId,
                                params: _.map(value, (value, key) => ({key, value}))
                            }
                        ]
                    });
                    sendTrackMessage({
                        target: 'form',
                        type: TRACK_TARGET_TYPE.SUBMIT,
                        param: value,
                        nodeId
                    });
                    dispatch(actions.updateFormDatas({[resourceFrontId]: {value, submit: true}}));
                }
                catch (error) {
                    setSubmit(false);
                }
            }
            else {
                console.log(error);
            }
        });
    }, [
        form,
        submit,
        resourceId,
        resourceFrontId,
        context,
        realSkillId,
        nodeId,
        spreadBot,
        sendMessage,
        sendTrackMessage,
        dispatch
    ]);

    return (
        <div className="bd-form-container">
            {title && <div className="bd-form-title">{title}</div>}
            <div className="bd-form-content">
                {_.map(controls, control => (
                    <div className="bd-form-item-container" key={control.name}>
                        <FormItem form={form} control={control} values={defaultValues} />
                    </div>
                ))}
                <div className="bd-form-btn">
                    <Button onClick={handleSubmit} disabled={submit || formValues[resourceFrontId]?.submit}>
                        {caption || '提交'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default createForm()(Form);
