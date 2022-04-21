/* eslint-disable react/no-danger */
/**
 * @file FormItem
 * @author sunwen05
 */

import _ from 'lodash';
import {memo} from 'react';
import {InputItem, List, Picker, Checkbox} from 'antd-mobile';

import {useLayoutSize} from '../../hooks';
import city from './city';

const FORM_ITEM_TYPE_MAP = {
    INPUT: 'input',
    SELECT: 'select',
    AUTHORIZE: 'authorize',
    TEXT: 'text'
};
const FORM_ITEM_INPUT_TYPE_CONFIG = {
    text: {
        type: 'text'
    },
    number: {
        type: 'digit'
    },
    phone: {
        type: 'number',
        pattern: /^1[3|4|5|7|8][0-9]{9}$/,
        maxLength: 11
    },
    wechat: {
        type: 'text'
    },
    qq: {
        type: 'number',
        pattern: /^[1-9][0-9]{4,}$/
    }
};
const FORM_ITEM_SELECT_TYPE_CONFIG = {
    address: {
        data: city,
        cols: 2
    },
    default: {
        cols: 1
    }
};

const joinArray = (longArr, arr) => {
    const newArr = [];
    _.each(longArr, (item, index) => {
        newArr.push(item);
        newArr.push(JSON.parse(arr[index] || '{}'));
    });
    return newArr;
};

export default memo(props => {
    const {control, form, values} = props;
    const {label, required = true} = control;
    const {getFieldProps, getFieldError} = form;
    const {type, subType, name, placeholder, defaultValue, config = {}} = control;
    const {options, htmlText} = config;
    const initialValue = values[name] || defaultValue;

    const {clientWidth} = useLayoutSize();

    if (!name) {
        return;
    }
    switch (type) {
        case FORM_ITEM_TYPE_MAP.INPUT: {
            const typeConfig = FORM_ITEM_INPUT_TYPE_CONFIG[subType] || {};
            return (
                <InputItem
                    {...getFieldProps(name, {
                        rules: [
                            {required, message: placeholder},
                            ...(typeConfig.pattern ? [{pattern: typeConfig.pattern}] : [])
                        ],
                        initialValue
                    })}
                    type={typeConfig.type || 'text'}
                    maxLength={typeConfig.maxLength}
                    className={getFieldError(name) ? 'bd-form-item-error' : ''}
                    placeholder={placeholder}
                >
                    {label}
                </InputItem>
            );
        }
        case FORM_ITEM_TYPE_MAP.SELECT: {
            const typeConfig = FORM_ITEM_SELECT_TYPE_CONFIG[subType] || {};
            return (
                <div className={getFieldError(name) ? 'bd-form-item-error' : ''}>
                    <Picker
                        {...getFieldProps(name, {
                            rules: [
                                {required, message: placeholder}
                            ],
                            initialValue
                        })}
                        className="bd-form-item-picker-view"
                        style={{maxWidth: clientWidth, marginLeft: -clientWidth / 2}}
                        data={!_.isEmpty(options) ? options : typeConfig.data}
                        cols={typeConfig.cols || 1}
                        extra={placeholder}
                    >
                        <List.Item arrow="horizontal">{label}</List.Item>
                    </Picker>
                </div>
            );
        }
        case FORM_ITEM_TYPE_MAP.AUTHORIZE: {
            const reg = new RegExp(/\{.*?\}/, 'ig');
            const textConfig = joinArray(htmlText.split(reg), htmlText.match(reg));
            return (
                <Checkbox.AgreeItem
                    {...getFieldProps(name, {
                        rules: [
                            {required, message: placeholder},
                            {validator: (__, value) => (value ? Promise.resolve() : Promise.reject('error'))}
                        ],
                        initialValue
                    })}
                >
                    {_.map(textConfig, (text, index) => (_.isObject(text) ? (
                        <a href={text.url} target="_blank" rel="noreferrer" key={index}>{text.title}</a>
                    ) : (
                        <span key={index}>{text}</span>
                    )))}
                </Checkbox.AgreeItem>
            );
        }
        case FORM_ITEM_TYPE_MAP.TEXT: {
            return (
                <label className="bd-form-item-text">
                    <h3>{label}</h3>
                    <div>{values[name] || defaultValue}</div>
                </label>
            );
        }
    }
});
