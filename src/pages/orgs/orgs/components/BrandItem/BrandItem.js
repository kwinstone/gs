import './BrandItem.scss';
import Button from '../../../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const BrandItem = ({
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
        <div className="BrandItem">
             <div  onMouseUp={checkClick} onMouseDown={clickHandle} className="BrandItem__img">
                {
                    LogoUrl ? (
                        <img src={LogoUrl} alt=""/>
                    ) : null
                }
                </div>
            <div className="BrandItem__action">
                <Button
                    onClick={() => editModal(ID, ItemOrder, LogoUrl, MarkerID)}
                    text={'Изменить'}
                    justify={'center'}/>
            </div>
        </div>
    )
}

export default BrandItem;