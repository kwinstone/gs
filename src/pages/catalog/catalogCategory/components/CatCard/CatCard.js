import './CatCard.scss';
import pl from '../../../../../assets/img/pl-plate.png'
import { useRef } from 'react';
import { useState } from 'react';
import checkDomain from '../../../../../funcs/checkDomain';

const CatCard = ({
    AllowedDeliveryTypes,
    Calories,
    CanOverwriteByIIko,
    Carbohydrates,
    CategoryID,
    Composition,
    CountAdditions,
    Disabled,
    Fats,
    HiddenInOrganisations,
    ID,
    IIkoID,
    IsHit,
    IsNew,
    IsSubCategory,
    ItemOrder,
    MaxCount,
    Name,
    ParentID,
    Pictures,
    Prices,
    Proteins,
    ThumbnailPicture,
    editPlate
}) => {

    const nameRef = useRef()

    const [tm, setTm] = useState(false)

    const clickHandle = () => {
        setTimeout(() => {
            setTm(true)
        }, 200)
    }

    const checkClick = () => {
        if(tm) {
            setTm(false)
            return;
        } else {
            editPlate(ID, Name)
        }
    }


    return (
        <div className="CatCard draggable" onMouseUp={checkClick} onMouseDown={clickHandle}>
            <div className="CatCard__img">
                <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt="" />
            </div>
            <div className="CatCard__body">
                <div className={"CatCard__body_name"}>
                    {Name}
                                    
                </div>
                
                {/* <div className="CatCard__body_price">
                    <div className="CatCard__body_price_actual">{Number(Prices[0]?.SalePrice) > 0 ? Prices[0]?.SalePrice : Prices[0]?.Price}₽</div>
                    {
                        Number(Prices[0]?.SalePrice) > 0 ? (
                            <div className="CatCard__body_price_main">{Prices[0]?.Price}₽</div>
                        ) : null
                    }                    
                </div> */}
                <div className="CatCard__body_price">
                    <div className="CatCard__body_price_actual">{Prices[0]?.Price ? Prices[0]?.Price : 0} {checkDomain('₽', '₸')}</div>
                    {
                        Number(Prices[0]?.SalePrice) ? (
                            <div className="CatCard__body_price_main">{Prices[0]?.SalePrice} {checkDomain('₽', '₸')}</div>
                        ) : null
                    }                    
                </div>
            </div>
        </div>
    )
}

export default CatCard;