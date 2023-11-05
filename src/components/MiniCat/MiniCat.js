import './MiniCat.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MiniCat = ({
    AllowedDeliveryTypes,
    CanOverwriteByIIko,
    Disabled,
    HiddenInOrganisations,
    ID,
    IIkoID,
    ItemOrder,
    Name,
    Link,
    HideInApp,
    selectEdit,
}) => {
    const nav = useNavigate()
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
            nav(Link)
        }
    }
    return (
        <div className="MiniCat" onMouseUp={checkClick} onMouseDown={clickHandle}>
            <div className="MiniCat__name">
                {Name}
            </div>
            <div className="MiniCat__action">
                <Button
                    onClick={() => selectEdit({ID, IIkoID, HideInApp, ItemOrder, Name, HiddenInOrganisations, Disabled, CanOverwriteByIIko, AllowedDeliveryTypes})}
                    justify={'center'}
                    styles={{width: '100%'}}
                    text={'Изменить'}
                    />
            </div>
        </div>
    )
}

export default MiniCat;