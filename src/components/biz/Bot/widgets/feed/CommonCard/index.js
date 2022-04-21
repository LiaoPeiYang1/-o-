/**
 * @file components/biz/Bot/DialogZone/components/feed/CommonCard
 * @desc 公共展示样式
 * @author dingyang
 */

import playUrl from '../../../../../../../assets/img/play.png';

import './index.less';

export default props => {
    const {data, listIndex} = props;
    const {
        mImageUrl,
        imgUrl,
        coverImages,
        contentType,
        author,
        publicTime,
        title,
        url
    } = data;

    // 展示的图片地址
    const showImage = mImageUrl || imgUrl || coverImages;
    const isVideo = contentType === 8;
    const imageStyle = {
        backgroundImage: `url(${showImage})`
    };
    return (
        <a rel="noreferrer" target="_blank" href={url}>
            {(listIndex === 1 && !!showImage) ? (
                <div className="custom-feed-list-first-card" style={imageStyle}>
                    <div className="feed-first-card-title">{title}</div>
                    <div className="feed-first-card-info">{author} &nbsp;&nbsp;&nbsp;&nbsp; {publicTime}</div>
                    {isVideo && <img className="feed-first-video-icon" src={playUrl} />}
                </div>
            ) : (
                <div className="custom-feed-common-card">
                    <div className="common-card-left">
                        <div className="card-left-top">{title}</div>
                        <div className="card-left-bottom"><span>{author}</span><span>{publicTime}</span></div>
                    </div>
                    {!!showImage && (
                        <div className="common-card-right" style={imageStyle}>
                            {isVideo && <img className="video-icon" src={playUrl} />}
                        </div>
                    )}
                </div>
            )}
        </a>
    );
};
