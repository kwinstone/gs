import './EditMass.scss';
import {message, Modal, Tabs} from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import catService from '../../../../services/catService';
import {checkIsBao} from "../../../../utils/checkIsBao";


const cs = new catService()

const EditMass = ({visible, close, selected, plateId, update}) => {
    const {token} = useSelector(state => state)
    const [localMass, setLocalMass] = useState('');
    const [localMassKz, setLocalMassKz] = useState('');
    const [localMassEn, setLocalMassEn] = useState('');
    const [localPrice, setLocalPrice] = useState('');
    const [localDiscount, setLocalDiscount] = useState('');
    const [saveLoad, setSaveLoad] = useState(false)
    const [deleteLoad, setDeleteLoad] = useState(false)
    
    useEffect(() => {
        if(selected) {
            
            setLocalMass(selected?.Mass)
            setLocalMassEn(selected?.Mass_en)
            setLocalMassKz(selected?.Mass_kz)

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
            Mass_en: localMassEn,
            Mass_kz: localMassKz,
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

    const massTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={localMass}
                onChange={(e) => setLocalMass(e.target.value)}
                placeholder={'Масса'}/>,
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={localMassKz}
                onChange={(e) => setLocalMassKz(e.target.value)}
                placeholder={'Масса на казахском языке'}/>,
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={localMassEn}
                onChange={(e) => setLocalMassEn(e.target.value)}
                placeholder={'Масса на английском языке'}/>,
        },
    ];

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
                    {
                        checkIsBao() ? (
                            <Tabs defaultActiveKey="1" items={massTabs} onChange={() => {}} style={{ width: '100%'}} />
                        ) : massTabs[0].children
                    }
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