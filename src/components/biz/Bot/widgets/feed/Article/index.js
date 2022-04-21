/**
 * @file components/biz/Bot/DialogZone/components/feed/Article
 * @desc 文章展示
 * @author dingyang
 */

import CommonCard from '../CommonCard';

import './index.less';

export default props => {
    const {data, inList, listIndex} = props;
    const {mImageUrl, author, publicTime, title, url, abstractContent} = data;

    const normalArticleClass = mImageUrl ? '' : 'normal-article-class';
    return inList ? (
        <CommonCard data={data} listIndex={listIndex} />
    ) : (
        <div className="feed-article-wrap">
            <a rel="noreferrer" target="_blank" href={url}>
                <div className={`feed-article-box ${normalArticleClass}`}>
                    <div className="article-box-left">
                        <div className="feed-article-title">{title}</div>
                        <div className="feed-article-desc">{abstractContent}</div>
                        <div className="feed-article-author">
                            <span>{author}</span>
                            <span>{publicTime}</span>
                        </div>
                    </div>
                    <div className="article-box-right">
                        <img src={mImageUrl} />
                    </div>
                </div>
            </a>
        </div>
    );
};
