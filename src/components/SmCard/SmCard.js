import './SmCard.scss';
import img from '../../assets/img/pl-plate.png';
import checkDomain from '../../funcs/checkDomain';


const SmCard = (props) => {
   
    return (
        <div onClick={() => props?.onClick(props?.PlateID)} className={"SmCard shadow"} style={props?.style}>
            <div className="SmCard__img">
                <img src={props?.ThumbnailPicture ? props?.ThumbnailPicture : img} alt="" />
            </div>
            <div className="SmCard__body">
                <div className="SmCard__body_name">{props?.Name}</div>
                {
                    props?.Price ? (
                        <div className="SmCard__body_price">{props?.Price} {checkDomain('₽', '₸')}</div>
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default SmCard;