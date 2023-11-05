import './DishItem.scss';
import pl from '../../../../assets/img/pl-plate.png';
import checkDomain from '../../../../funcs/checkDomain';

const DishItem = ({
    style,
    ID,
    Name,
    ThumbnailPicture,
    Price
}) => {
    return (
        <div className="DishItem" style={style}>
            <div className="DishItem__img">
                <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt={Name} />
            </div>
            <div className="DishItem__body">
                <div className="DishItem__body_name">
                    {Name}
                </div>
                {
                    Price ? (
                        <div className="DishItem__body_price">
                            {Price ? Price : 0}{checkDomain('₽', '₸')}
                        </div>
                    ) : null
                }
                

            </div>
        </div>
    )
}

export default DishItem;