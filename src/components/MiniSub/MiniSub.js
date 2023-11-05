import './MiniSub.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Tooltip} from 'antd';
import Button from '../Button/Button';
import pl from '../../assets/img/pl-plate.png';

const MiniSub = (props) => {
    const {
        selectEdit,
        Link,
        data
    } = props

    const {
        Name,
        ThumbnailPicture,

    }  = data
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
        <Tooltip
            placement='bottom'
            title={Name}
            >
            <div className="MiniSub" onMouseUp={checkClick} onMouseDown={clickHandle}>
                <div className="MiniSub__main">
                    <div className="MiniSub__main_img">
                        <img src={ThumbnailPicture ? ThumbnailPicture: pl} alt={Name} />
                    </div>
                    <div className="MiniSub__main_name">
                        {Name}
                    </div>
                </div>
                <div className="MiniSub__action">
                    <Button
                        onClick={() => selectEdit(data)} 
                        text={'Изменить'}
                        />
                </div>
            </div>
        </Tooltip>
        
    )
}

export default MiniSub;