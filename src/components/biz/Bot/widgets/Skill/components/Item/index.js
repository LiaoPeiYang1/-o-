/**
 * @file components/biz/Bot/DialogZone/components/Skills/Item
 * @desc 机器人技能 技能Item
 * @author v_liaopeiyang
 */

export default props => {
    const {data} = props;
    const {content} = data;

    return (
        <div className="bd-bot-widget-skill-item">
            <img className="bd-bot-widget-skill-item-img" src={content.iconUrl} />
            <div className="bd-bot-widget-skill-item-name">{content.skillName}</div>
        </div>
    );
};
