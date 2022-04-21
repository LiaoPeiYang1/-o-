/**
 * @file components/biz/Bot/DialogZone/components/feed/components/goods/item
 * @desc 商品item
 * @author v_liaopeiyang
 */

export default props => {
    const {imgUrl, sign, title, price, oldPrice, times, joinUrl} = props;

    const activityClass = !!price ? '' : 'activity-item';
    return (
        <a rel="noreferrer" target="_blank" href={joinUrl}>
            <div className={`feed-goods-item ${activityClass}`}>
                <img className="goods-item-img-block" src={imgUrl} />
                <div className="goods-item-sign">{sign}</div>
                <div className="goods-info">
                    <div className="goods-info-name">{title}</div>
                    {!!price && (<div className="goods-price-block">
                        <div className="goods-real-price"><span>¥</span>{price}</div>
                        {!!oldPrice && <span className="goods-old-price">${oldPrice}</span>}
                        {!!times && <span>X{times}期</span>}
                    </div>)}
                </div>
            </div>
        </a>
    );
};