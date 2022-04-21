/**
 * @file VideoBg
 * @author sunwen05
 */

import {useEffect, useState, useRef} from 'react';
import {useToggle} from '@huse/boolean';

import './index.less';

export default props => {
    const {currentVideoUrl, videoCacheMap = {}, config, styles} = props;
    const {currentVideoRef, currentVideoCanvasRef, onVideoEnd, onVideoError} = config;

    const callbackRef = useRef({});
    callbackRef.current = {onVideoEnd};

    // 静音状态
    const [mute, handleMute] = useToggle(false);
    // 当前播放url
    const [videoPlayUrl, setVideoPlayUrl] = useState();

    // 设置播放url，如果下一个视频未缓存好，则保持上一个视频url，为了使数字人恢复初始状态
    useEffect(() => {
        setVideoPlayUrl(prev => videoCacheMap[currentVideoUrl] || prev);
    }, [videoCacheMap, currentVideoUrl]);
    // 组件销毁后，默认video播放结束
    useEffect(() => {
        return () => callbackRef.current.onVideoEnd && callbackRef.current.onVideoEnd();
    }, []);

    return (
        <div className="bd-dh-video-bg" style={styles}>
            <canvas ref={currentVideoCanvasRef} />
            <div className="video-content">
                <video
                    controls={false}
                    preload="auto"
                    ref={currentVideoRef}
                    src={videoPlayUrl}
                    muted={mute}
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-fullscreen="true"
                    x5-video-player-type="h5-page"
                    onEnded={onVideoEnd}
                    onError={onVideoError}
                />
            </div>
            <a className="video-mute-btn-wrap" onClick={handleMute}>
                <i className={mute ? 'speaker-close' : 'speaker-open'}></i>
            </a>
        </div>
    );
};
