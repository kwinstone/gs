import './StorieItem.scss';
import img from '../../../../assets/img/org.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {BsPlusLg, BsTrash} from 'react-icons/bs';

const StorieItem = ({
    selectStorie,
    openStorie,
    startShow,
    startSelected,
    setStartSelected,
    selected,
    data
}) => {
    const {
        ID,
        images
    } = data || {}
    const [tm, setTm] = useState(false)
    const [time, setTime] = useState()
    

    const clickHandle = () => {
        setTime(setTimeout(() => {
            setTm(true)
        }, 200))
    
    }

    const checkClick = () => {
        if(tm) {
            setTm(false)
            return;
        } else {
            clearTimeout(time)
            selectStorie(data)
            openStorie()
        }
    }

    return (
        <div className={"StorieItem" + (startSelected?.ID == ID ? ' selected ' : '')}>
            <div className="StorieItem__main" onMouseUp={checkClick} onMouseDown={clickHandle}>
                <div className="StorieItem__img">
                    <img src={data?.PictureThumbnail} alt="" />
                </div>
            </div>
            {
                startShow && startSelected?.ID != ID ? (
                    <button onClick={() => {
                        if(startSelected?.ID == ID) {
                            setStartSelected(null)
                        } else {
                            setStartSelected(data)
                        }
                    }} 
                    className={"StorieItem__add" + (startSelected?.ID == ID ? ' StorieItem__add-danger ' : '')}>
                        <BsPlusLg/>
                    </button>
                ) : null
            }
            
        </div>
    )
}

export default StorieItem;