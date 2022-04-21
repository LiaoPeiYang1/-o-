/**
 * @file ScrollText
 * @author v_zhangyibo01
 */

import {useRef, useCallback, useEffect, useMemo, useState} from 'react';

import './index.less';

const TIMER = 4;

export default props => {
    const {replyText, textDisappearAfterSpeak, speaking} = props;

    const [showReplyText, setShowReplyText] = useState(true);

    const replyTextRef = useRef();
    const replyScrollTimerRef = useRef();
    const scrollAnimateTimerRef = useRef();

    const speakTextVisible = useMemo(() => (
        !(textDisappearAfterSpeak !== false && !speaking) && showReplyText
    ), [speaking, textDisappearAfterSpeak, showReplyText]);

    // 滚动动画
    const onScrollAnimate = useCallback((replyEle, moveTo) => {
        clearTimeout(scrollAnimateTimerRef.current);
        const {scrollTop} = replyEle;
        if (scrollTop === moveTo) {
            return;
        }
        const timer = moveTo / 2;
        scrollAnimateTimerRef.current = setTimeout(() => {
            replyEle.scrollTop = scrollTop + 1;
            onScrollAnimate(replyEle, moveTo);
        }, timer);
    }, []);

    // 开始文字滚动
    const onReplyScroll = useCallback(() => {
        clearTimeout(replyScrollTimerRef.current);
        const replyEle = replyTextRef.current;
        if (!replyEle) {
            return;
        }
        const {clientHeight, scrollHeight, scrollTop} = replyEle;
        // 需要滚动
        const needScroll = scrollHeight > clientHeight;
        const isScrollBottom = scrollHeight === (clientHeight + scrollTop);
        const scrollDistance = clientHeight / 2;
        // 如果不需要滚动，TIMER m后移除提示
        if (replyEle && needScroll && !isScrollBottom && scrollDistance) {
            replyScrollTimerRef.current = setTimeout(() => {
                // 平滑滚动到指定位置
                onScrollAnimate(replyEle, scrollTop + scrollDistance);
                onReplyScroll();
            }, TIMER * 1000);
        }
    }, [onScrollAnimate]);

    useEffect(() => {
        speakTextVisible && onReplyScroll();
        // 清除定时器
        return () => {
            clearTimeout(replyScrollTimerRef.current);
            clearTimeout(scrollAnimateTimerRef.current);
        };
    }, [speakTextVisible, onReplyScroll]);

    return speakTextVisible ? (
        <div className="bd-layout-scrolltext-main">
            <div className="reply-text-container" ref={replyTextRef}>{replyText}</div>
            <div className="reply-text-close-contailer" onClick={() => setShowReplyText(false)}>
                <i className="reply-text-close" />
            </div>
        </div>
    ) : null;
};
