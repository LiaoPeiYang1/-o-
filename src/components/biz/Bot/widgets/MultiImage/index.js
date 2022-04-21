/**
 * @file components/biz/Bot/DialogZone/components/MultiImage
 * @desc 机器人image图片widget
 * @author dingyang
 */

import {Swiper, SwiperSlide} from 'swiper/react';
import _ from 'lodash';
import {useEffect} from 'react';

import {DIALOG_ITEM_ALIGN} from 'constants/constants';

import {useBotSpread, useWebHook} from '../../hooks';
import Avatar from '../Avatar';
import ImageWidget from '../Image';

import 'swiper/swiper.less';
import './index.less';

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {withAvatar = false, component = {}} = props;

    const {componentData} = useWebHook(component);
    const {spread} = useBotSpread();

    const {components: componentImageComponents = []} = componentData;

    return (
        <div className="bd-bot-dialog-item bd-bot-widget-multi-image">
            {withAvatar && <Avatar size="small" />}
            <div className="multi-image-item">
                <Swiper
                    key={`multi-image-swiper-${spread}`}
                    spaceBetween={5}
                    slidesPerView={1}
                >
                    {_.map(componentImageComponents, (com, index) => (
                        <SwiperSlide key={index}>
                            <ImageWidget component={com} align={DIALOG_ITEM_ALIGN.CENTER} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
