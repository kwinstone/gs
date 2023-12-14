import './Settings.scss';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import stService from '../../../../services/stService';
import {PulseLoader} from 'react-spinners';


const st = new stService();



const Settings = ({
    data, 
    startShow, 
    setStartShow, 
    startSelected, 
    setStartSelected,
    list = []
}) => {
    const {token} = useSelector(state => state)
    const [IsShowStorieOnStart, setIsShowStorieOnStart] = useState('0')
    const [ShowType, setShowType] = useState('1')
    const [StorieBundleID, setStorieBundleID] = useState('')
    const [load, setLoad] = useState(false);

    // const handleCheck = (e) => {
    //     if(e.target.checked) {
    //         setIsShowStorieOnStart('1')
    //         setStartShow(true)
    //     } else {
    //         setIsShowStorieOnStart('0')
    //         setStartShow(false)
    //         setStartSelected(null)
    //     }
    // }


    
    useEffect(() => {
        if(token && list?.length > 0) {
            setLoad(true)
            st.getStorieSettings(token).then(res => {
                setStartSelected(list.find(item => item.ID == res.StorieBundleID))
                setIsShowStorieOnStart(res.IsShowStorieOnStart)
                setShowType(res.ShowType)
                setStartShow(res.IsShowStorieOnStart == '1')
            }).finally(_ => setLoad(false))
        }
    }, [token, list])
    
    
    useEffect(() => {
        if(startSelected && list?.length > 0 && token) {
            setStorieBundleID(startSelected?.ID)
            setLoad(true)
            st.editStorieSettings(token, {
                IsShowStorieOnStart: '1',
                ShowType,
                StorieBundleID: startSelected?.ID
            }).finally(_ => setLoad(false))
        } else {
            setStorieBundleID('0')
        }
    }, [startSelected, list, token])

    const deleteStorieFromSet = () => {
        setStartSelected(null)
        const body = {
            IsShowStorieOnStart,
            ShowType,
            StorieBundleID: '0'
        }
        setLoad(true)
        st.editStorieSettings(token, body).finally(_ => setLoad(false))
    }

    

    



    return (
        <div className="Settings panel">
            <div className={"Settings__load" + (load ? ' active ' : '')}>
                {PulseLoader}
            </div>
            <h3 className="panel-label">
                Настройки
            </h3>
            <div className="Settings__body">
                <Checkbox
                    onChange={e => {
                        if(e.target.checked) {
                            setIsShowStorieOnStart('1')
                            setStartShow(true)
                        } else {
                            setIsShowStorieOnStart('0')
                            setStartSelected(null)
                            setStartShow(false)
                            setLoad(true)
                            st.editStorieSettings(token, {
                                IsShowStorieOnStart: '0',
                                ShowType,
                                StorieBundleID: '0'
                            }).finally(_ => setLoad(false))
                        }
                    }} 
                    checked={IsShowStorieOnStart == '1'} 
                    shadow={true} 
                    text={'Показывать клиентам сториз при старте приложения'} 
                    id={'showStorie'}/>
                {
                    IsShowStorieOnStart == '1' ? (
                        <div className={"Settings__body_selects" + (startSelected ? ' selected ' : '')} style={{ fontSize: '20px'}}>
                            {
                                !startSelected ? (
                                    <div className="Settings__body_selects_pl">
                                        Выберите сториз нажав на <span><BsPlus/></span>
                                    </div>
                                ) : null
                            }
                            {
                                startSelected ? (
                                    <>
                                        <div className="Settings__body_selects_label">
                                        Сториз выбрано
                                        </div>
                                        <div className="Settings__body_selects_item">
                                            <button onClick={deleteStorieFromSet} className="Settings__body_selects_item_btn">
                                                <BsTrash/>
                                            </button>
                                            <img src={startSelected?.PictureThumbnail} alt="" />
                                        </div>
                                    </>
                                ) : null
                            }
                        </div>
                    ) : null
                }
                
                
            </div>
        </div>
    )
}

export default Settings;