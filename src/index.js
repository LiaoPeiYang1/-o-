/**
 * @file index.js 整个sdk入口文件
 * @author zhangzhe
 */


import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {LocaleProvider} from 'antd-mobile';

import PrimaryLayout from 'modules/layout/PrimaryLayout';

import store from './store';
import {setRem} from './utils/remUtil';
import Sdk from './Sdk';

import './modules/common/css/common.less';

const ROOT_DOM_ID = 'aidaProH5Root';

function onDomLoaded() {
    const rootElement = document.createElement('div');
    rootElement.id = ROOT_DOM_ID;
    window.document.body.appendChild(rootElement);
    ReactDOM.render(
        <ReduxProvider store={store}>
            <LocaleProvider>
                <PrimaryLayout />
            </LocaleProvider>
        </ReduxProvider>,
        rootElement,
    );
}

// 设置px2rem
setRem();

// 放到dom上
window.document.addEventListener('DOMContentLoaded', onDomLoaded);

// 核心：sdk实例，暴露给外层调用
const sdk = new Sdk(store);
window.AIDASdk = sdk;

export default sdk;

// 支持开发模式下的热更新
if (module.hot) {
    // 重要：监听入口组件的变化
    module.hot.accept('./modules/layout/PrimaryLayout.js', () => {
        const rootElement = document.getElementById(ROOT_DOM_ID);
        if (rootElement) {
            ReactDOM.render(<PrimaryLayout />, rootElement);
        }
    });
}
