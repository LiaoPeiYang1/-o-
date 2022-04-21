/**
 * @file hooks/useNavigation
 * @description 折叠导航的功能
 * @author v_liaopeiyang
 */

import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import actions from 'actions';

export default () => {
    const navigationVisible = useSelector(state => state.show.isNavigation);

    const dispatch = useDispatch();

    // 监听折叠导航打开
    const setNavigationVisible = useCallback(isNavigation => {
        dispatch(actions.aidaNavigation(isNavigation));
    }, [dispatch]);

    return {
        navigationVisible,
        setNavigationVisible
    };
};
