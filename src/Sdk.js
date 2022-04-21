/**
 * @file Sdk.js
 * @author zhangzhe
 */

import _ from 'lodash';
import actions from 'actions';
import version from 'version';
import {MODE_TYPE} from 'constants/constants';

export default class Sdk {

    initConfig = {};

    constructor(store) {
        this.store = store;
    }

    init(initConfig = {}) {
        this.initConfig = initConfig;
        const entryStatus = _.get(initConfig, 'entry', false);
        const entry = _.isString(entryStatus) ? entryStatus === 'true' : entryStatus;
        const isFullScreen = initConfig.mode === MODE_TYPE.FULLSCREEN;
        this.store.dispatch(actions.updateUserConfig({...initConfig, entry, isFullScreen}));
    }

    showDialog() {
        // console.log('showDialog');
    }

    getVersion() {
        return version.version;
    }
};
