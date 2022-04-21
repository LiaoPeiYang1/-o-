/**
 * @file components/biz/Bot/DialogZone/components/Image
 * @desc 机器人image图片widget
 * @author dingyang
 */

import Avatar from '../Avatar';
import ImageWidget from '../Image';

import './index.less';

export default props => {
    // resources是数组，因为resources会存在文本绑定command：button
    const {withAvatar = false, component = {}} = props;

    return (
        <div className="bd-bot-dialog-item bd-bot-widget-single-image">
            {withAvatar && <Avatar size="small" />}
            <ImageWidget component={component} />
        </div>
    );
};
