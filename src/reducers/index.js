/**
 * @file reducers/index
 * @author zhangzhe
 */

import {combineReducers} from 'redux';

import aida from './aida';
import show from './show';

export default combineReducers({
    aida,
    show
});
