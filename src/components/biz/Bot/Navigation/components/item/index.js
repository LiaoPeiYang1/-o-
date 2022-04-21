/**
 * @file components/biz/Bot/Navigation
 * @desc 静态模式的导航item
 * @author v_liaopeiyang
 */

export default props => {
    const {data} = props;
    const {iconUrl, skillName, description} = data;

    return (
        <div className="bd-bot-navigation-item">
            <img className="navigation-skill-item-img" src={iconUrl} />
            <div className="navigation-skill-item-info">
                <div className="skill-info-name">{skillName}</div>
                <div className="skill-info-desc">{description}</div>
            </div>
        </div>
    );
};
