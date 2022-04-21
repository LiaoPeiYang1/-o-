/**
 * @file components/biz/Bot/widgets/FullScreenComposite
 * @desc 机器人text文本widget
 * @author dingyang
 */

import {useMemo} from 'react';
import _ from 'lodash';

import {DIALOG_ITEM_SUBTYPE, DIALOG_BUTTON_LOCATION_TYPE, DIALOG_BUTTON_SHOW_TYPE} from 'constants/constants';

import {useWebHook, useButtons} from '../../hooks';
import Skill from '../Skill';
import TextWeakButton from '../TextWeakButton';
import Card from '../Card';
import FullScreenMultiImage from '../FullScreenMultiImage';
import FullScreenButtons from '../FullScreenButtons';
import Phone from '../Phone';
import Custom from '../Custom';
import Form from '../Form';

import './index.less';

export default props => {
    const {component = {}, context, nodeId} = props;
    const currentComponent = useMemo(() => ({...component, context, nodeId}), [component, context, nodeId]);

    const {componentData} = useWebHook(currentComponent);
    const {componentType} = componentData || {};

    // 获取所有buttons
    const allButtons = useButtons({
        component: currentComponent,
        type: [DIALOG_BUTTON_LOCATION_TYPE.INNER, DIALOG_BUTTON_LOCATION_TYPE.OUTER]
    });
    // 获取文本对对应menu:buttons
    const unWeakButtons = useMemo(() => (
        componentType === DIALOG_ITEM_SUBTYPE.IMAGE
            ? [] : _.filter(allButtons, btn => btn.content.showType !== DIALOG_BUTTON_SHOW_TYPE.WEAK)
    ), [componentType, allButtons]);


    // 渲染单个resource
    const renderComponent = useMemo(() => {
        const {resources = [], components: multiImageComponents = [], componentType} = componentData || {};
        // 获取文本对对应menu:buttons
        const weakButtons = _.filter(allButtons, btn => btn.content.showType === DIALOG_BUTTON_SHOW_TYPE.WEAK);
        // 筛选获取text文本resource
        const textResource = _.find(resources, {resourceType: DIALOG_ITEM_SUBTYPE.TEXT});
        switch (componentType) {
            case DIALOG_ITEM_SUBTYPE.TEXT: {
                return (
                    <Card className="full-screen-text-button-card">
                        <TextWeakButton
                            className="full-screen-widget-text-button"
                            text={textResource}
                            buttons={weakButtons}
                            component={componentData}
                        />
                    </Card>
                );
            }
            case DIALOG_ITEM_SUBTYPE.SKILL: {
                return <Skill component={componentData} showType="center" />;
            }
            case DIALOG_ITEM_SUBTYPE.IMAGE: {
                return <FullScreenMultiImage images={[componentData]} component={componentData} />;
            }
            case DIALOG_ITEM_SUBTYPE.MULTI_IMAGES: {
                return <FullScreenMultiImage images={multiImageComponents} component={componentData} />;
            }
            case DIALOG_ITEM_SUBTYPE.PHONE: {
                return <Phone component={componentData} />;
            }
            case DIALOG_ITEM_SUBTYPE.FORM: {
                return <Form component={componentData} />;
            }
            case DIALOG_ITEM_SUBTYPE.CUSTOM:
                return <Custom component={componentData} />;
            default:
                return null;
        }
    }, [componentData, allButtons]);

    return componentType !== DIALOG_ITEM_SUBTYPE.CUSTOM ? (
        <div className="bd-bot-widget-fullscreen">
            {renderComponent}
            <FullScreenButtons buttons={unWeakButtons} component={componentData} />
        </div>
    ) : (
        <div className="bd-bot-custom-widget-fullscreen">
            {renderComponent}
        </div>
    );
};
