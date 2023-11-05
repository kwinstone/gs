import './MiniBrand.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Button/Button';
import pl from '../../assets/img/pl-org.png';

const MiniBrand = ({
    ID,
    ItemOrder,
    Disabled,
    LogoUrl,
    MarkerID,
    editModal
}) => {

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
            nav(`/organizations/${ID}?p=Организации`)
        }
    }


    return (
        <div className="MiniBrand" onMouseUp={checkClick} onMouseDown={clickHandle} >
            <div className="MiniBrand__img">
                <img src={LogoUrl ? LogoUrl : pl} alt={ID} />
            </div>
            <div className="MiniBrand__action">
                <Button
                    onClick={() => editModal(ID, ItemOrder, LogoUrl, MarkerID)}
                    text={'Изменить'}
                    justify={'center'}
                    />
            </div>
        </div>

    )
}

export default MiniBrand;