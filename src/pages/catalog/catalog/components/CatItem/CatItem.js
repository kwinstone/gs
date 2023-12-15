import './CatItem.scss';
import Button from '../../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const CatItem = ({
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
    ...rest
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
        <div className="CatItem">
            <div className="CatItem__main" onMouseUp={checkClick} onMouseDown={clickHandle}>
                <div className="CatItem__main_name">
                    {Name}
                </div>
            </div>
            <div className="CatItem__action">
                <Button
                    onClick={() => selectEdit({ID, IIkoID, HideInApp, ItemOrder, Name, HiddenInOrganisations, Disabled, CanOverwriteByIIko, AllowedDeliveryTypes, ...rest})}
                    justify={'center'}
                    styles={{width: '100%'}}
                    text={'Изменить'}/>
            </div>
        </div>
    )
    
}

export default CatItem;