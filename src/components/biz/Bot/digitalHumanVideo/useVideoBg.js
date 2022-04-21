/**
 * @file useVideoBg
 * @author sunwen05
 */

import {useState, useCallback, useRef, useEffect, useMemo} from 'react';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

export default props => {
    const {currentVideoUrl, videoCacheMap, onCurrentVideoEnd, width, height} = props;

    // video-canplay
    const [videoCanPlay, setVideoCanPlay] = useState(false);
    // video是否在播放中
    const [currentVideoPlaying, setCurrentVideoPlaying] = useState(false);

    // video实例
    const currentVideoRef = useRef();
    // canvas实例
    const currentVideoCanvasRef = useRef();
    // 动画
    const animationRef = useRef();
    // 存放不依赖项
    const dependenceRef = useRef();

    // 获取canvas的context对象
    const canvasContext = useMemo(() => {
        if (currentVideoCanvasRef.current) {
            currentVideoCanvasRef.current.width = width * DEVICE_PIXEL_RATIO;
            currentVideoCanvasRef.current.height = height * DEVICE_PIXEL_RATIO;
            return currentVideoCanvasRef.current.getContext('2d');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVideoCanvasRef.current, width, height]);

    // 将video绘制在canvas上
    const videoToCanvas = useCallback(() => {
        if (!currentVideoRef.current || !canvasContext) {
            return;
        }
        const {videoWidth, videoHeight} = currentVideoRef.current;
        const widthScale = width / videoWidth;
        const heightScale = height / videoHeight;
        const scale = widthScale >= heightScale ? widthScale : heightScale;
        const currentWidth = videoWidth * scale;
        const currentHeight = videoHeight * scale;
        const offset = widthScale >= heightScale ? [0, (height - currentHeight) / 2] : [(width - currentWidth) / 2, 0];
        // 将video上的图片的每一帧以图片的形式绘制的canvas上
        canvasContext.drawImage(
            currentVideoRef.current,
            offset[0] * DEVICE_PIXEL_RATIO, offset[1] * DEVICE_PIXEL_RATIO,
            currentWidth * DEVICE_PIXEL_RATIO, currentHeight * DEVICE_PIXEL_RATIO
        );
        animationRef.current = requestAnimationFrame(() => dependenceRef.current.videoToCanvas());
    }, [canvasContext, width, height]);
    dependenceRef.current = {videoToCanvas, videoCanPlay, currentVideoPlaying};

    const handleCurrentVideoPlay = useCallback(() => {
        if (currentVideoRef.current) {
            // console.log('----------video-play----------');
            setCurrentVideoPlaying(true);
            currentVideoRef.current.play();
        }
    }, []);
    // 暂停播放
    const handleCurrentVideoPause = useCallback(() => {
        if (currentVideoRef.current) {
            // console.log('----------video-pause----------');
            setCurrentVideoPlaying(false);
            currentVideoRef.current.pause();
        }
    }, []);
    const handleCurrentVideoStop = useCallback(() => {
        if (currentVideoRef.current) {
            // console.log('----------video-stop----------');
            currentVideoRef.current.pause();
            currentVideoRef.current.load();
        }
    }, []);

    // 视频播放结束
    const onVideoEnd = useCallback(() => {
        // console.log('----------video-end----------');
        // 设置关键视频播放状态为false
        setCurrentVideoPlaying(false);
        // 其他操作
        onCurrentVideoEnd && onCurrentVideoEnd();
    }, [onCurrentVideoEnd]);
    // 视频播放失败
    const onVideoError = useCallback(() => {
        if (currentVideoRef.current) {
            // console.log('----------video-error----------');
            currentVideoRef.current.load();
            currentVideoRef.current.play();
        }
    }, []);

    // 监听video变化了，表示要切换视频播放
    useEffect(() => {
        if (currentVideoUrl) {
            // console.log('----------video-change----------');
            setVideoCanPlay(false);
            handleCurrentVideoStop();
        }
    }, [currentVideoUrl, handleCurrentVideoStop]);
    // 在视频不可以播放时，监听到当前需要播放的视频已缓存成功，就置该播放视频可以开始播放
    useEffect(() => {
        if (!videoCanPlay && videoCacheMap[currentVideoUrl]) {
            // console.log('----------video-canplay----------');
            setVideoCanPlay(true);
            setTimeout(() => handleCurrentVideoPlay(), 100);
        }
    }, [videoCanPlay, currentVideoUrl, videoCacheMap, handleCurrentVideoPlay]);
    // 检测到视频开始播放则开始渲染canvas
    useEffect(() => {
        if (currentVideoPlaying) {
            dependenceRef.current.videoToCanvas();
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                    animationRef.current = null;
                }
            };
        }
    }, [currentVideoPlaying]);

    return {
        currentVideoRef,
        currentVideoCanvasRef,
        videoCanPlay,
        currentVideoPlaying,
        onVideoEnd,
        onVideoError,
        handleCurrentVideoPlay,
        handleCurrentVideoPause,
        handleCurrentVideoStop
    };
};
