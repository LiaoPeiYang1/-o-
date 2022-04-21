/**
 * @file hooks/useWebHook
 * @description webhook相关处理
 * @author v_liaopeiyang
*/

import {useMemo} from 'react';
import {useOriginalCopy} from '@huse/previous-value';
import _ from 'lodash';

import {webHookUtil} from 'utils';
import {WEB_HOOK_TYPE} from 'constants/constants';

const {formatTextData, formatMultiImageData, formatImageData} = webHookUtil;

const MAPPING_FORMAT_FUNCTION = {
    text: formatTextData,
    multiImages: formatMultiImageData,
    image: formatImageData
};

export default (components = []) => {
    // 是否是数组，决定返回数据格式是array还是单个component对象
    const isComponentArray = _.isArray(components);
    const formatComponents = _.isArray(components) ? components : [components];

    // 此处转换为了避免上层component={}情况造成多次reRender
    const currentComponents = useOriginalCopy(formatComponents);

    // webhook数据格式兼容方法
    const newComponents = useMemo(() => _.map(
        currentComponents,
        item => {
            const {componentType, type} = item;
            return type === WEB_HOOK_TYPE.CUSTOM
                ? MAPPING_FORMAT_FUNCTION[componentType](item)
                : item;
        }
    ), [currentComponents]);

    return {
        componentData: isComponentArray ? newComponents : (newComponents[0] || {})
    };
};
