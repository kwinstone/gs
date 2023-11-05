import './EditTime.scss';
import {  Modal, Row, Col } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash, BsClock} from 'react-icons/bs';
import { useEffect, useState, useCallback } from 'react';
import TimePicker from 'react-time-picker';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';


const EditTime = ({
    editIndex, 
    visible, 
    close, 
    values, 
    save, 
    name, 
    rest, 
    plate,
    enabledVal,
    ddisabledVal
}) => {
    
    const [disabled, setDisabled] = useState(false);
    const [checked, setChecked] = useState(false)
    const [enabled, setEnabled] = useState(false)
    const [ddisabled, setDdisabled] = useState(false)
    const [valsArray, setValsArray] = useState([])


    const closeModal = () => {
        setChecked(false)
        setEnabled(false)
        setDdisabled(false)
        setValsArray([{start: 0, end: 0}])
        close();
    }

    useEffect(() => {
        setChecked(rest)
        setEnabled(enabledVal)
        setDdisabled(ddisabledVal)
        if(rest || enabledVal || ddisabledVal) {
            setDisabled(true)
        }
    }, [rest, visible, enabledVal, ddisabledVal])

    useEffect(() => {
        setValsArray(values)

    }, [values, visible])

    const handleWeekend = (e) => {
        setChecked(e.target.checked);
        if(e.target.checked) {
            setDisabled(true);
            setValsArray([{start: 0, end: 0}])
        } else {
            setDisabled(false)
        }
    } 

    const handleEnabled = (e) => {
        setEnabled(e.target.checked)
        if(e.target.checked) {
            setDisabled(true) //input
            setDdisabled(false)
            setValsArray([{start: 0, end: 0}])
        } else {    
            setDisabled(false)//input
            setDdisabled(false)
        }   
    } 

    const handleDdisabled = (e) => {
        setDdisabled(e.target.checked)
        if(e.target.checked) {
            setDisabled(true) //input
            setEnabled(false)
            setValsArray([{start: 0, end: 0}])
        } else {
            setDisabled(false)
            setEnabled(false)
        }
    }



    const handleSave = useCallback(() => {
        if(!plate) {
            if(!checked) {
                console.log('no rest')
                console.log(valsArray)
                const val = {
                    name: name,
                    // values: {
                    //     start: startVal,
                    //     end: endVal
                    // },
                    values: valsArray,
                    rest: checked ? 'Выходной' : ''
                }
                save(editIndex, val);
            } else {
                console.log('rest')
                const val = {
                    name: name,
                    // values: {
                    //     start: startVal,
                    //     end: endVal
                    // },
                    values: valsArray,
                    rest: 'Выходной'
                }
                save(editIndex, val);
            }
            
            close() 
        } else {
            // if() {
            //     const val = {
            //         name: name,
            //         // values: {
            //         //     start: startVal,
            //         //     end: endVal
            //         // },
            //         values: valsArray,
            //         enabled: '',
            //         disabled: ''
            //     }
            //     save(editIndex, val);
            // } else {
            //     const val = {
            //         name: name,
            //         // values: {
            //         //     start: startVal,
            //         //     end: endVal
            //         // },
            //         values: valsArray,
            //         enabled: enabled ? 'Весь день' : '',
            //         disabled: ddisabled ? 'Выключено' : ''
            //     }
            //     save(editIndex, val);
            // }
            const val = {
                name: name,
                // values: {
                //     start: startVal,
                //     end: endVal
                // },
                values: valsArray,
                enabled: enabled ? 'Весь день' : '',
                disabled: ddisabled ? 'Выключено' : ''
            }
            save(editIndex, val);
            
            close() 
        }
        
    }, [valsArray, checked, ddisabled, enabled])





    return (
        <Modal className='Modal' open={visible} onCancel={closeModal}>
            
            <h2 className="Modal__head">Выбрать время</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    {
                        valsArray?.map((item,index) => (
                            <div className={"Modal__form_time" + (disabled ? ' disabled ' : '')}>
                                <TimePicker 
                                    disabled={disabled}  
                                    hourPlaceholder='00' 
                                    minutePlaceholder='00' 
                                    className={"Modal__form_time_item"}   
                                    disableClock 
                                    format='HH:mm' 
                                    onChange={(e) => {
                                        console.log(e)
                                        setValsArray(s => {
                                            const rm = s;
                                            const m = rm.splice(index, 1, {start: e, end: rm[index].end})
                                            return [...rm];
                                        })
                                    }}  
                                    value={item?.start} 
                                    />
                                <span className='Modal__form_time_space'>-</span>
                                <TimePicker 
                                    disabled={disabled} 
                                    hourPlaceholder='00' 
                                    minutePlaceholder='00' 
                                    className={"Modal__form_time_item"}  
                                    disableClock 
                                    format='HH:mm' 
                                    onChange={(e) => setValsArray(s => {
                                        const rm = s;
                                        const m = rm.splice(index, 1, {start: rm[index].start, end: e})
                                        return [...rm];
                                    })} 
                                    value={item?.end} />

                                {
                                    valsArray?.length > 1 ? (
                                        <button 
                                            onClick={() => {
                                                const rm = valsArray
                                                const m = rm.splice(index, 1)
                                                setValsArray([...rm])
                                            }}
                                            className="time-delete">
                                            <BsTrash/>
                                        </button>
                                    ) : null
                                }
                            </div>
                        ))
                    }
                    
                </div>
               
                
                {
                    plate ? (
                        <>
                            <div className="Modal__form_row">
                                <Checkbox 
                                    shadow={true} 
                                    checked={enabled} 
                                    onChange={handleEnabled} 
                                    id={'dayAll'} 
                                    text={'Весь день'}/>
                            </div>
                            <div className="Modal__form_row">
                                <Checkbox 
                                    shadow={true} 
                                    checked={ddisabled} 
                                    onChange={handleDdisabled} 
                                    id={'dayOff'} 
                                    text={'Выключено'}/>
                            </div>
                        </>
                    ) : (
                        <div className="Modal__form_row">
                            <Checkbox 
                                shadow={true} 
                                checked={checked} 
                                onChange={handleWeekend} 
                                id={'weekend'} 
                                text={'Выходной'}/>
                        </div>
                    )
                }
                <div className="Modal__form_action" style={{marginTop: 50}}>
                    <Row gutter={[15,15]}>
                        <Col span={24}>
                            <Button  
                            onClick={() => setValsArray(s => [...s, {start: 0, end: 0}])}
                            text={'Добавить промежуток'} 
                            before={<BsClock size={20} color={'#fff'}/>} 
                            justify={'flex-start'}/>
                        </Col>
                        <Col span={24}>
                            <Button 
                            onClick={handleSave} 
                            text={'Сохранить'} 
                            before={<SaveIcon size={20} color={'#fff'}/>} 
                            justify={'flex-start'}/>
                        </Col>
                    </Row>
                   
                </div>
            </div>
        </Modal>
    )
}

export default EditTime;