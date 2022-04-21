/**
 * @file components/biz/Bot/BotFullScreenMain
 * @desc 全屏模式下内容区域
 * @author dingyang
 */

import {memo, useMemo} from 'react';
import _ from 'lodash';

import {dialogs} from '../hooks';
import {FullScreenComposite} from '../widgets';
import ZoneAction from '../ZoneAction';
import {filterSessionComponents} from '../helper';

import './index.less';

const {useNodeLastReply} = dialogs;

export default memo((props = {}) => {
    const {videoCanPlay} = props;

    // 获取最后一个reply节点
    const lastReplyNode = useNodeLastReply();

    // const {
    //     speak: speakText,
    //     textDisappearAfterSpeak = true
    // } = useMemo(() => _.get(lastReplyNode, 'digitalHumanConfig', {}), [lastReplyNode]);
    // const speakTextVisible = useMemo(() =>
    //     !(textDisappearAfterSpeak !== false && !speaking), [speaking, textDisappearAfterSpeak]
    // );
    const components = useMemo(() => _.get(lastReplyNode, 'components', []), [lastReplyNode]);
    const context = useMemo(() => _.get(lastReplyNode, 'context', {}), [lastReplyNode]);
    const nodeId = useMemo(() => _.get(lastReplyNode, 'nodeId', ''), [lastReplyNode]);
    // 获取会话流中的components
    const sessionComponents = useMemo(() => filterSessionComponents(components), [components]);

    return (
        <div className="bd-layout-fullscreen-main-module">
            {/* <Tooltip text={speakText} visible={speaking} className="layout-main-widget-tooltip" /> */}
            {videoCanPlay && (
                <div className="layout-main-widget">
                    {_.map(sessionComponents, component => (
                        <div key={component.componentFrontId}>
                            <FullScreenComposite component={component} context={context} nodeId={nodeId} />
                        </div>
                    ))}
                </div>
            )}
            <div className="layout-main-action">
                <ZoneAction />
            </div>
        </div>
    );
});
