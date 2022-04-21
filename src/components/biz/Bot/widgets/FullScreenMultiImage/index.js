/**
 * @file components/biz/Bot/widgets/FullScreenMultiImage
 * @desc 机器人image图片widget
 * @author dingyang
 */

import {useState, useMemo} from 'react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import _ from 'lodash';
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';

import {DIALOG_BUTTON_LOCATION_TYPE} from 'constants/constants';

import {useButtons} from '../../hooks';
import FullScreenButtons from '../FullScreenButtons';
import {Image} from '../new';

import './index.less';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {images: imageComponents = [], component = {}} = props;
    const multiImagesResources = _.map(imageComponents, imgComponent => (_.get(imgComponent, 'resources[0]')));

    // 当前active的imageComponents
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImageComponent = useMemo(() => imageComponents[activeIndex], [imageComponents, activeIndex]);

    // 获取所有buttons
    const allButtons = useButtons({
        component: activeImageComponent,
        type: [DIALOG_BUTTON_LOCATION_TYPE.INNER, DIALOG_BUTTON_LOCATION_TYPE.OUTER]
    });

    // 是否展示底部分页提示
    const wrapClassName = imageComponents.length < 2 ? 'without-pagination' : '';

    return (
        <div className={`bd-bot-widget-fullscreen-multi-image ${wrapClassName}`}>
            <div className="multi-image-item">
                <Swiper
                    key="multi-image-swiper"
                    navigation
                    pagination={{clickable: true}}
                    spaceBetween={5}
                    slidesPerView={1}
                    onSlideChange={target => setActiveIndex(target.activeIndex)}
                >
                    {_.map(multiImagesResources, (res, index) => (
                        <SwiperSlide key={index}>
                            <Image className="override-image-widget" image={res} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <FullScreenButtons className="multi-image-buttons" buttons={allButtons} component={component} />
        </div>
    );
};
