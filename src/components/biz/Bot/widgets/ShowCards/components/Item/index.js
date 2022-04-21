/**
 * @file components/biz/Bot/widgets/showCards/components/Item
 * @desc 机器人技能 技能Item
 * @author v_liaopeiyang
 */

export default props => {
    const {data} = props;

    return (
        <div className="bd-bot-widget-cards-item">
            <img className="bd-bot-widget-cards-item-img" src={data.imgUrl} />
            <div className="bd-bot-widget-name-wrap">
                <div className="bd-bot-widget-cards-item-name">{data.title}</div>
            </div>
        </div>
    );
};
