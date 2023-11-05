import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState, useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';


const BasketTableEdit = ({
    visible, 
    close, 
    data,
    setData,
    onSave,
    onDelete
}) => {
    const [ID, setID] = useState('0')
    const [CountFree, setCountFree] = useState('')
    // const [Disabled, setDisabled] = useState('0')
    const [PlateCounterFrom, setPlateCounterFrom] = useState('')
    const [PlateCounterTo, setPlateCounterTo] = useState('')


    useEffect(() => {
        if(data) {
            setID(data?.ID)
            setCountFree(data?.CountFree)
            setPlateCounterFrom(data?.PlateCounterFrom)
            setPlateCounterTo(data?.PlateCounterTo)
        } else {
            setID('0')
            setCountFree('')
            setPlateCounterFrom('')
            setPlateCounterTo('')
        }
    }, [data])


    const handleClose = () => {
        close();
    }
    
    
    return (
        <Modal width={500} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">{data ? 'Изменить позицию' : 'Добавить позицию'}</h2>
            <form className="Modal__form">
                
                <div className="Modal__form_row">
                    <Input
                        value={PlateCounterFrom}
                        onChange={e => setPlateCounterFrom(e.target.value)}
                        maskType={String} 
                        shadow
                        placeholder={'Позиции от'}/>
                </div>
                <div className="Modal__form_row">
                    <Input 
                        shadow
                        value={PlateCounterTo}
                        onChange={e => setPlateCounterTo(e.target.value)}
                        maskType={String}
                        placeholder={'Позиции до'}/>
                </div>
                <div className="Modal__form_row">
                    <Input  
                        value={CountFree}
                        onChange={e => setCountFree(e.target.value)}
                        shadow
                        maskType={String}
                        placeholder={'Позиции FREE'}/>
                </div>
                
                <div className="Modal__form_action">
                    <Row gutter={[10,10]}>
                        <Col span={24}>
                            <Button 
                                onClick={() => onSave({
                                    ID,
                                    CountFree,
                                    Disabled: '0',
                                    PlateCounterFrom,
                                    PlateCounterTo,
                                    index: data?.index
                                })}
                                type={'button'} 
                                before={<SaveIcon color={'#fff'} size={16}/>} 
                                justify={'flex-start'} 
                                text={'Сохранить'}/>
                        </Col>
                        {
                            data ? (
                                <Col span={24}>
                                    <Button 
        
                                        onClick={() => onDelete(data?.index)}
                                        type={'button'} 
                                        before={<BsTrash/>} 
                                        justify={'flex-start'} 
                                        text={'Удалить позицию'}
                                        variant={'danger'}/>
                                </Col>
                            ) : null
                        }
                       
                    </Row>
                    
                    

                </div>
            </form>
        </Modal>
    )
}

export default BasketTableEdit;