/**
 * @file components/biz/Bot/DialogZone/components/feed/Image
 * @desc 图片展示
 * @author dingyang
 */

import CommonCard from '../CommonCard';

import './index.less';

export default props => {
    const {data, inList, listIndex} = props;
    const {imgUrl, author, publicTime, title, url} = data;

    return inList ? (
        <CommonCard data={data} listIndex={listIndex} />
    ) : (
        <div className="feed-img-wrap">
            <a rel="noreferrer" target="_blank" href={url}>
                <div className="feed-img-box" style={{backgroundImage: `url('${imgUrl}')`}}>
                    <div className="feed-img-box-title">{title}</div>
                    <div className="feed-img-author">
                        <span>{author}</span>
                        <span>{publicTime}</span>
                    </div>
                </div>
            </a>
        </div>
    );
};
