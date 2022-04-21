/**
 * @file components/biz/Bot/DialogZone/components/Image
 * @desc 机器人image图片widget
 * @author dingyang
 */

import _ from 'lodash';
import {PhotoProvider, PhotoConsumer} from 'react-photo-view';
import 'react-photo-view/dist/index.css';

import {
    DIALOG_ITEM_SUBTYPE,
    DIALOG_ITEM_ALIGN,
    DIALOG_BUTTON_LOCATION_TYPE,
    IMAGE_SHOW_TYPE
} from 'constants/constants';

import {useButtons, useWebHook} from '../../hooks';
import BotButtons from '../Buttons';

import './index.less';

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {component = {}, align} = props;

    const {componentData} = useWebHook(component);

    const {resources = [], showType} = componentData;
    // 用户自定义对齐方式
    const userAlignCenter = align === DIALOG_ITEM_ALIGN.CENTER;
    // 筛选获取image单图resource
    const imageResource = _.find(resources, {resourceType: DIALOG_ITEM_SUBTYPE.IMAGE});

    // 当前元件是否存在button
    const inButtons = useButtons({component: componentData, type: DIALOG_BUTTON_LOCATION_TYPE.INNER});
    const hasButtons = inButtons.length > 0;

    // 显示文本
    const {imgUrl, caption, subCaption} = _.get(imageResource, 'content', {});
    // 如果存在元件内button，此时需要居中显示button
    const imageClassName = (hasButtons || userAlignCenter) ? 'image-item-center' : 'image-item-left';
    // 存在button | 标题 | 副标题
    const withSubContent = hasButtons || userAlignCenter || caption || subCaption;
    // 如果存在下部分内容，则需要去除图片容器左下/右下倒圆角
    const imageWithSubContentClassName = withSubContent ? 'with-sub-content' : '';

    return (
        <div className="bd-bot-widget-image">
            <div className={`image-item ${imageClassName}`}>
                <div className={`image-image-box ${imageWithSubContentClassName}`}>
                    {imgUrl && (<PhotoProvider>
                        <PhotoConsumer src={imgUrl}>
                            <img
                                className={`widget-img ${showType === IMAGE_SHOW_TYPE.PADDING
                                    ? 'padding-show-type' : ''}`}
                                src={imgUrl}
                            />
                        </PhotoConsumer>
                    </PhotoProvider>)}
                </div>
                <div className={`image-caption-box ${imageWithSubContentClassName}`}>
                    {!!caption && (
                        // eslint-disable-next-line react/no-danger
                        <div className="image-caption" dangerouslySetInnerHTML={{__html: caption}} />
                    )}
                    {!!subCaption && (
                        // eslint-disable-next-line react/no-danger
                        <div className="image-sub-caption" dangerouslySetInnerHTML={{__html: subCaption}} />
                    )}
                    <BotButtons component={component} />
                </div>
            </div>
        </div>
    );
};
