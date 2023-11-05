import './EditMass.scss';
import { message, Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import catService from '../../../../services/catService';


const cs = new catService()

const EditMass = ({visible, close, selected, plateId, update}) => {
    const {token} = useSelector(state => state)
    const [localMass, setLocalMass] = useState('');
    const [localPrice, setLocalPrice] = useState('');
    const [localDiscount, setLocalDiscount] = useState('');
    const [saveLoad, setSaveLoad] = useState(false)
    const [deleteLoad, setDeleteLoad] = useState(false)
    
    useEffect(() => {
        if(selected) {
            
            setLocalMass(selected?.Mass)
            setLocalPrice(selected?.Price)
            setLocalDiscount(selected?.SalePrice)
        }
    }, [selected])
    
    const closeHandle = () => {
        close();
        setLocalMass('')
        setLocalPrice('')
        setLocalDiscount('')
    }

    const onSave = () => {
        setSaveLoad(true)
        cs.editPriceMass(token, {
            ID: selected.ID,
            Mass: localMass,
            Price: localPrice,
            SalePrice: localDiscount
        }).then(res => {
            update(res)
            message.success('Дополнительная масса успешно изменена')
        }).finally(_ => {
            setSaveLoad(false)
            closeHandle()
        })
    }

    const onDelete = () => {
        setDeleteLoad(true)
        cs.deletePriceMass(token, {ID: selected.ID}).then(res => {
            update(res)
            message.success('Дополнительная масса удалена')
        }).finally(_ => {
            setDeleteLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal className='Modal' width={700} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Изменить массу</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        maskType={String}
                        shadow={true}
                        value={localMass} 
                        onChange={(e) => setLocalMass(e.target.value)}
                        placeholder={'Масса'}/>
                </div>
                <div className="Modal__form_row">
                    <Input
                        maskType={String}
                        scale={5}
                        shadow={true}
                        value={localPrice} 
                        onChange={(e) => setLocalPrice(e.target.value)}
                        placeholder={'Цена'}/>
                </div>
                <div className="Modal__form_row">
                    <Input 
                        maskType={String}
                        shadow={true}
                        value={localDiscount}
                        onChange={(e) => setLocalDiscount(e.target.value)}
                        placeholder={'Старая цена'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        disabled={!localPrice || !localMass}
                        load={saveLoad}
                        onClick={onSave}
                        type={'button'}  
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    <Button 
                        onClick={onDelete}
                        styles={{marginTop: 15}} 
                        variant={'danger'} 
                        type={'button'}  
                        before={<BsTrash size={20}/>} 
                        justify={'flex-start'} 
                        text={'Удалить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default EditMass;