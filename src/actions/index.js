/**
 * @file Actions
 * @author zhangzhe
 */

import * as botActions from 'actions/bot';
import * as showActions from './show';

export default {
    ...botActions,
    ...showActions
};
