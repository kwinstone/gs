import './SubCard.scss';
import Button from '../../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import pl from '../../../../../assets/img/pl-plate.png'
import { useState } from 'react';


const SubCard = (props) => {
    const {
        data,
        selectEdit,
        Link
    } = props
    const {
        ThumbnailPicture,
        Name,
    } = data || {}
    const nav = useNavigate()
    const [tm, setTm] = useState(null)

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
            nav(Link)
        }
    }

    return (
        <div className="SubCard draggable">
            <div className="SubCard__main" onMouseUp={checkClick} onMouseDown={clickHandle}>
                <div className="SubCard__img">
                    <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt="" />
                </div>
                <div className="SubCard__name">
                    {Name}
                </div>
            </div>
            <div className="SubCard__action">
                <Button 
                    onClick={() => selectEdit(data)} 
                    text={'Изменить'}
                    />
            </div>

        </div>  
    )
}

export default SubCard;