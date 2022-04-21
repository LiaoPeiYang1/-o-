/**
 * @file hooks/useTheme
 * @description 系统主题色设置
 * @author dingyang
 */

import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

// 系统预设皮肤
const THEMES = {
    blue: {
        // css相关配置
        css: {
            '--themeColor': '#5EAEFE',
            '--themeColorWeight': '#4578D5',

            '--menuButtonColor': '#2E7FD1', // showType:WEAK 展示颜色

            // 底部标签样式设置
            '--tagColor': '#2E7FD1', // 字体颜色
            '--tagHighLightBorderColor': '#5DAEFE' // 高亮tag边框颜色
        },
        // 其他主题配置项
        options: {
            themeBgImageClassName: 'blue-theme' // 弹窗背景色对应class
        }
    },
    gold: {
        // css相关配置
        css: {
            '--themeColor': '#B89D7B',
            '--themeColorWeight': '#B89D7B',

            '--menuButtonColor': '#796751', // showType:WEAK 展示颜色

            '--signFontBg': '#CBBEAE', // 文字背景色

            '--linear-color-begin': '#F5F2EE', // 背景渐变色
            '--linear-color-end': '#ECE0D1',

            // 底部标签样式设置
            '--tagColor': '#796751', // 字体颜色
            '--tagHighLightBorderColor': '#B89D7B' // 高亮tag边框颜色
        },
        // 其他主题配置项
        options: {
            themeBgImageClassName: 'golden-theme' // 弹窗背景色对应class
        }
    }
};

export default () => {
    const config = useSelector(state => _.get(state, 'aida.serverConfig'));
    const userConfig = useSelector(state => _.get(state, 'aida.userConfig'));

    // 主题相关配置项
    const [themeOptions, setThemeOptions] = useState({});

    // 监听bot:config-change变化，修改主题色
    const handleConfigChange = useCallback(() => {
        const {botId} = userConfig;
        // !!botId是否有传入 botId ？ 机器人预览 : 技能预览
        if (_.isEmpty(config) && !!botId) {
            return;
        }

        const {theme = 'blue'} = config;

        if (THEMES[theme]) {
            const {css, options} = THEMES[theme];
            _.forEach(css, (value, key) => {
                document.documentElement.style.setProperty(key, value);
            });
            setThemeOptions(options);
        }
    }, [config, userConfig]);

    useEffect(() => {
        handleConfigChange();
    }, [handleConfigChange]);

    return {
        themeOptions
    };
};
