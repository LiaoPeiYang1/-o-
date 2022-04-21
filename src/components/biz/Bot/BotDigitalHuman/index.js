/**
 * @file BotDigitalHuman 数字人相关组件
 * @author sunwen05
 */

import _ from 'lodash';
import {useSelector} from 'react-redux';
import {Icon} from 'antd-mobile';
import {useMemo} from 'react';

import {DIGITAL_HUMAN_MODE_TYPE} from 'constants/constants';

import {useBotMin} from '../hooks';
import VideoBg from '../digitalHumanVideo';
import BotFullScreenMain from '../BotFullScreenMain';
import BotInfo from '../BotInfo';
import BotMain from '../BotMain';
import ScrollText from '../ScrollText';
import './index.less';

export default props => {
    const {spread, videoCacheMap, videoConfig, config} = props;

    // 获取数字人相关配置
    const {
        modeType,
        currentVideoUrl,
        videoSize,
        digitalHumanExist,
        currentDigitalHumanExist,
        lastReplyNode = {}
    } = config;
    // 数字人视频播放相关配置
    const {
        videoCanPlay,
        currentVideoPlaying
    } = videoConfig;

    const replyTextParams = useMemo(() => {
        const {speak: replyText, textDisappearAfterSpeak = true} = _.get(lastReplyNode, 'digitalHumanConfig', {}) || {};
        return {replyText, textDisappearAfterSpeak};
    }, [lastReplyNode]);
    const backgroundImage = useSelector(state => _.get(state, 'aida.serverConfig.digitalHumanBackgroundImageUrl', ''));
    const entry = useSelector(state => _.get(state, 'aida.userConfig.entry', false));

    const {handleControlBotClose} = useBotMin();

    const isFullScreenMode = modeType === DIGITAL_HUMAN_MODE_TYPE.FULL;
    const isHalfMode = modeType === DIGITAL_HUMAN_MODE_TYPE.HALF;
    const isStaticMode = modeType === DIGITAL_HUMAN_MODE_TYPE.STATIC;
    const wrapVideoClass = currentDigitalHumanExist ? 'video-visible' : '';
    const wrapFullScreenVideoClass = isFullScreenMode ? 'fullscreen-video' : '';
    const styles = {
        ...videoSize,
        ...videoSize.display,
        height: currentDigitalHumanExist ? _.get(videoSize, 'display.height', videoSize.height) : 0,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : null
    };
    return (
        <div className="bd-layout-container">
            {/* 静态模式下的头像展示 */}
            {isStaticMode ? (
                <div className="bd-layout-avatar">
                    {spread && <BotInfo />}
                </div>
            ) : (
                <div
                    className={`bd-layout-digitalhuman-module ${wrapVideoClass} ${wrapFullScreenVideoClass}`}
                    style={styles}
                >
                    {digitalHumanExist && (
                        <>
                            {/* 手动点击全屏模式下的返回按钮 */}
                            {(entry && currentDigitalHumanExist) && (
                                <a
                                    className="control-bot-back-icon"
                                    onClick={handleControlBotClose}
                                >
                                    <Icon type="cross" />
                                </a>
                            )}
                            <VideoBg
                                currentVideoUrl={currentVideoUrl}
                                videoCacheMap={videoCacheMap}
                                config={videoConfig}
                                styles={_.pick(styles, ['width', 'height'])}
                            />
                            {/* 滚动文字 */}
                            {(isHalfMode && videoCanPlay) && (
                                <ScrollText {...replyTextParams} speaking={currentVideoPlaying} />
                            )}
                            {/* bot单个元件全屏模式内容区域 */}
                            {isFullScreenMode && (
                                <div className="bd-layout-fullscreen-main">
                                    <BotFullScreenMain videoCanPlay={videoCanPlay} speaking={currentVideoPlaying} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
            <div className={`bd-layout-main ${isFullScreenMode ? 'bd-layout-main-hide' : ''}`}>
                <BotMain isHalfMode={isHalfMode} />
            </div>
        </div>
    );
};
