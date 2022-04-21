/**
 * @file components/biz/Bot
 * @desc 百度bot机器人
 * @author dingyang
 */

import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDrag} from 'react-use-gesture';
import _ from 'lodash';

import {useBtnActive} from 'hooks';

import {
    useDialogs,
    useBotMin,
    useBotChat,
    useBotConfig,
    useTheme,
    useBotSpread,
    useBotDrag,
    useTrack,
    useFreeChat,
    useNavigateTo,
    useLayoutSize,
    dialogs
} from './hooks';
import {VIRTUAL, AUTO_SKILL} from './hooks/useDialogs';
import Entry from './Entry';
import BotHeader from './BotHeader';
import BotDigitalHuman from './BotDigitalHuman';
import {useVideoCache, useVideoBg} from './digitalHumanVideo';

import './index.less';

const defaultBackImg = 'https://bce.bdstatic.com/ai2b/aida/resource/pufaLogo.png';

const {useNodeDigitalHumanConfig} = dialogs;
export const DigitalHumanContext = React.createContext({});

export default () => {
    const withLogo = useSelector(state => _.get(state, 'aida.userConfig.logo'));
    const backgroundUrl = useSelector(state => _.get(state, 'aida.config.backgroundUrl'));
    const aidaBackImage = backgroundUrl || (withLogo === 'true' ? defaultBackImg : '');
    const isFullScreen = useSelector(state => _.get(state, 'aida.userConfig.isFullScreen'));
    const entry = useSelector(state => _.get(state, 'aida.userConfig.entry', false));

    const {full, clientWidth} = useLayoutSize();
    useBtnActive();
    useBotConfig(); // 获取全局配置项
    const {themeOptions} = useTheme(); // 主题色设置
    // 第一次进入初始化会话
    useBotChat({init: true});
    // 第一次进入初始化埋点
    useTrack({init: true});

    // 闲时话术
    useFreeChat();
    // 注册跳转方法的pauseCallback
    const {registerPauseMethod} = useNavigateTo();

    const {spread, setSpread} = useBotSpread(true);
    const {
        min,
        minAnimating,
        setMin,
        changeBotShowStyle,
        setTouchEnd
    } = useBotMin();
    const {handleGestureChange} = useBotDrag();

    // 获取数字人相关配置
    const nodeDigitalHumanConfig = useNodeDigitalHumanConfig();
    const {
        lastReplyNode,
        currentVideoUrl,
        preloadVideoUrls,
        videoSize
    } = nodeDigitalHumanConfig;
    // dialogs
    const {handleAutoSkillRequest} = useDialogs(AUTO_SKILL, nodeDigitalHumanConfig);
    const {handleVirtualRequest} = useDialogs(VIRTUAL, nodeDigitalHumanConfig);
    // 视频缓存处理
    const videoCacheMap = useVideoCache({current: currentVideoUrl, list: preloadVideoUrls});
    // 处理视频展示
    const handleCurrentVideoEnd = useCallback(() => {
        handleAutoSkillRequest();
        handleVirtualRequest();
    }, [handleAutoSkillRequest, handleVirtualRequest]);
    const videoConfig = useVideoBg({
        currentVideoUrl,
        videoCacheMap,
        ...videoSize,
        onCurrentVideoEnd: handleCurrentVideoEnd
    });
    const {handleCurrentVideoPlay} = videoConfig;

    // 监控手势
    const renderDragPropsMethod = useDrag(e => handleGestureChange(e));
    const renderDragProps = renderDragPropsMethod();

    // 全屏
    const setFullScreen = useCallback(() => {
        if (isFullScreen && !entry) {
            setMin(false);
            setSpread(true);
        }
    }, [isFullScreen, entry, setMin, setSpread]);

    useEffect(() => {
        setFullScreen();
    }, [setFullScreen]);
    useEffect(() => {
        registerPauseMethod(videoConfig.handleCurrentVideoStop);
    }, [registerPauseMethod, videoConfig.handleCurrentVideoStop]);

    const layoutBotStyle = !full ? {
        width: clientWidth,
        left: '50%',
        marginLeft: -(clientWidth / 2)
    } : {};
    const {themeBgImageClassName} = themeOptions; // 主题背景色
    const wrapNormalSpreadClass = spread ? 'layout-spread' : 'layout-fold';
    // 点击到全屏模式样式
    const wrapControlSpreadClass = spread ? 'layout-control-fullScreen' : 'layout-control-min';
    const wrapSpreadClass = (entry && isFullScreen) ? wrapControlSpreadClass : wrapNormalSpreadClass;
    const wrapMinMaxClass = min ? 'layout-min' : 'layout-max';
    const wrapFullScreenClass = (!entry && isFullScreen) ? 'full_screen_wrap' : `${wrapMinMaxClass} ${wrapSpreadClass}`;
    // 未准备好的情况下，都不展示
    if (_.isEmpty(lastReplyNode) || (currentVideoUrl && _.isEmpty(videoCacheMap))) {
        return null;
    }
    return (
        <DigitalHumanContext.Provider value={videoConfig}>
            {minAnimating ? (
                <>
                    {entry && <Entry onBotMax={handleCurrentVideoPlay} />}
                </>
            ) : (
                <div
                    className={`bd-bot-layout-wrap ${wrapFullScreenClass}`}
                    onTouchEnd={setTouchEnd}
                    onTouchStart={changeBotShowStyle}
                >
                    <div
                        {...(isFullScreen ? {} : renderDragProps)}
                        className={`bd-bot-layout ${themeBgImageClassName}`}
                        style={layoutBotStyle}
                        onTouchStart={e => e.stopPropagation()}
                    >
                        {/* 非全屏模式的箭头标识 */}
                        <div className="bd-layout-header">
                            {!isFullScreen && <BotHeader />}
                        </div>
                        {/* 内容区域 */}
                        <BotDigitalHuman
                            spread={spread}
                            videoConfig={videoConfig}
                            videoCacheMap={videoCacheMap}
                            config={nodeDigitalHumanConfig}
                        />
                        {/* bot水印部分 */}
                        {aidaBackImage && (
                            <div
                                className="bd-layout-watermark"
                                style={{backgroundImage: `url(${aidaBackImage})`}}
                            />
                        )}
                    </div>
                </div>
            )}
        </DigitalHumanContext.Provider>
    );
};
