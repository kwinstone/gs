import {  Modal } from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import { useState } from 'react';
import './BasketTable.scss';
import { useEffect } from 'react';
import BasketTableEdit from '../BasketTableEdit/BasketTableEdit';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';




const BasketTable = ({
    visible, 
    close, 
    data, 
    setCartAdditionsTable
}) => {
    const [editModal, setEditModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const [localData, setLocalData] = useState([])

    const handleClose = () => {
        setSelected(null)
        close();
    }


    useEffect(() => {
        setLocalData(data)
    }, [data])
    

    const selectToEdit = (item) => {
        setSelected(item)
        setEditModal(true)
    }

    const closeEditModal = () => {
        setSelected(null)
        setEditModal(false)
    }

    const addItem = () => {
        setSelected(null)
        setEditModal(true)
    }

    const itemSave = (item) => {
        if(item.ID === '0') {
            setLocalData(state => [...state, item])
        } else {
            const r = localData;
            const rm = r.splice(r.findIndex(i => i.ID == item.ID), 1, item)
            setLocalData(r)
        }
        closeEditModal()
    }
    const itemDelete = (index) => {
        const r = localData;
        const rm = r.splice(index, 1)
        setLocalData(r)
        closeEditModal()
    }


    const onSave = () => {
        setCartAdditionsTable(localData) 
        handleClose()
    }
    
    return (
        <Modal width={500} className='Modal' open={visible} onCancel={handleClose}>

            <BasketTableEdit
                onSave={itemSave}
                onDelete={itemDelete}
                data={selected} 
                visible={editModal} 
                close={() => setEditModal(false)}/>

            <h2 className="Modal__head">Таблица дополнений</h2>
            <form className="Modal__form">
                <div className="BasketTable">
                    <div className="BasketTable__row BasketTable__row-head">
                        <div className="BasketTable__row_item BasketTable__head">Позиции от</div>
                        <div className="BasketTable__row_item BasketTable__head">Позиции до</div>
                        <div className="BasketTable__row_item BasketTable__head">FREE</div>
                    </div>
                    {
                        localData?.map((item, index) => (
                            <div className="BasketTable__row" key={item.ID} onClick={() => selectToEdit({...item, index})}>
                                <div className="BasketTable__row_item">{item.PlateCounterFrom}</div>
                                <div className="BasketTable__row_item">{item.PlateCounterTo}</div>
                                <div className="BasketTable__row_item">{item.CountFree}</div>
                            </div>
                        ))
                    }
                    <Pl 
                        onClick={addItem}
                        shadow={true} 
                        text={'Добавить позицию'} 
                        style={{justifyContent: 'center', backgroundColor: '#fff'}}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        onClick={onSave}
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15}} 
                        before={<SaveIcon color={'#fff'} size={16}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketTable;