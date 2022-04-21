/**
 * @file components/biz/Bot/widgets/new/Image
 * @desc 机器人image图片widget
 * @author dingyang
 */

import _ from 'lodash';
import {PhotoProvider, PhotoConsumer} from 'react-photo-view';
import 'react-photo-view/dist/index.css';

import './index.less';

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {image: imageResource = {}, className = ''} = props;

    // 显示文本
    const {imgUrl, caption, subCaption} = _.get(imageResource, 'content', {});

    return (
        <div className={`bd-bot-widget-image-new ${className}`}>
            <div className="image-content">
                <div className="image-image-box">
                    {imgUrl && (<PhotoProvider>
                        <PhotoConsumer src={imgUrl}>
                            <img className="widget-img" src={imgUrl} />
                        </PhotoConsumer>
                    </PhotoProvider>)}
                </div>
                <div className="image-caption-box">
                    {!!caption && (
                        // eslint-disable-next-line react/no-danger
                        <div className="image-caption" dangerouslySetInnerHTML={{__html: caption}} />
                    )}
                    {!!subCaption && (
                        // eslint-disable-next-line react/no-danger
                        <div className="image-sub-caption" dangerouslySetInnerHTML={{__html: subCaption}} />
                    )}
                </div>
            </div>
        </div>
    );
};
