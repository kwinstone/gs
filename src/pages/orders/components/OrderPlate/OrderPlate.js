import './OrderPlate.scss';
import plPlate from '../../../../assets/img/pl-plate.png';
import checkDomain from '../../../../funcs/checkDomain';

const OrderPlate = ({
    Comment,
    Count,
    ID,
    Mass,
    Modifiers,
    Name,
    Price,
    ThumbnailPicture
}) => {
    return (
        <div className="OrderPlate">
            <div className="OrderPlate__main">
                <div className="OrderPlate__main_img">
                    <img src={ThumbnailPicture ? ThumbnailPicture : plPlate} alt={Name} />
                </div>
                <div className="OrderPlate__main_info">
                    <div className="OrderPlate__main_info_top">
                        <div className="OrderPlate__main_info_top_name">{Count} x {Name}</div>
                        <div className="OrderPlate__main_info_top_ms">{Mass}</div>
                    </div>
                    <div className="OrderPlate__main_info_price">
                        Цена: {Price}{checkDomain('₽', '₸')}
                    </div>
                </div>
            </div>
            {
                !Modifiers && !Comment ? (
                    null
                ) : (
                    <div className="OrderPlate__body">
                        {
                            Modifiers ? (
                                <div className="OrderPlate__body_part">
                                    <div className="OrderPlate__body_part_name">Модификаторы</div>
                                    <div className="OrderPlate__body_part_value">
                                    {
                                        Modifiers.split('\n').map(item => (
                                            <div>{item}</div>
                                        ))
                                    }
                                    </div>
                                </div>
                            ) : null
                        }
                        
                        {
                            Comment ? (
                                <div className="OrderPlate__body_part">
                                    <div className="OrderPlate__body_part_name">Комментарий</div>
                                    <div className="OrderPlate__body_part_value">
                                        {
                                            Comment.split('\n').map(item => (
                                                <div>{item}</div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                )
            }
            
        </div>
    )
}

export default OrderPlate;