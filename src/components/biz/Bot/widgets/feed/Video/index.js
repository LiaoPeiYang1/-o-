/**
 * @file components/biz/Bot/DialogZone/components/feed/Video
 * @desc 视频展示
 * @author dingyang
 */

import {getVideoDuration} from '../utils/timeUtils';
import CommonCard from '../CommonCard';
import Image from '../Image';
import playUrl from '../../../../../../../assets/img/play.png';

import './index.less';

export default props => {
    const {data, inList, listIndex} = props;
    const {videoDuration, url} = data;

    return inList ? (
        <CommonCard data={data} listIndex={listIndex} />
    ) : (
        <div className="feed-video-wrap">
            <div className="feed-video-box">
                <Image {...props} />
                <div className="feed-video-play">
                    <a rel="noreferrer" target="_blank" href={url}>
                        <img src={playUrl} />
                    </a>
                </div>
                <div className="feed-video-duration">
                    {getVideoDuration(videoDuration)}
                </div>
            </div>
        </div>
    );
};
