/**
 * @file Loading
 * @modify zhangzhe(zhangzhe@baidu.com)
 */

import React, {useState, useRef, useEffect} from 'react';
import {findDOMNode} from 'react-dom';
import {Icon} from 'antd-mobile';

import './index.less';

const CLS_PREFIX = 'du-loading';

export interface LoadingProps {
    text?: string;
}

export default (props: LoadingProps) => {
    const {text = '玩命加载中...'} = props;

    const [height, setHeight]: [string | number, any] = useState('100%');
    const loadingRef: any  = useRef(null);

    useEffect(() => {
        const currentDom = findDOMNode(loadingRef.current) as HTMLElement;
        const parentNode = currentDom.parentNode as HTMLElement;
        const newHeight = parentNode ? parentNode.offsetHeight - 20 : height;
        setHeight(newHeight);
    }, []);

    return (
        <div className={CLS_PREFIX} style={{height}} ref={loadingRef}>
            <Icon type="loading" style={{marginRight: 20}} />{text}
        </div>
    );
};
