/**
 * @file hooks/useButtons
 * @description 获取locationType元件内/外buttons
 * @author dingyang
 */

import {useMemo} from 'react';
import _ from 'lodash';

import {DIALOG_BUTTON_LOCATION_TYPE} from 'constants/constants';

import {getButtonFromComponentWithLocationType} from '../helper';

export default ({component = {}, type = DIALOG_BUTTON_LOCATION_TYPE.INNER}) => {
    // 兼容数组形式
    const locationTypes = useMemo(() => (_.isArray(type) ? type : [type]), [type]);

    // 获取文本对对应in/out:buttons
    const buttons = useMemo(
        () => getButtonFromComponentWithLocationType(component, locationTypes),
        [locationTypes, component]
    );

    return buttons;
};
