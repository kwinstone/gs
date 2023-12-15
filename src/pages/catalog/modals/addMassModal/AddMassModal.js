import './AddMassModal.scss';
import {message, Modal, Tabs} from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';
import {checkIsBao} from "../../../../utils/checkIsBao";


const cs = new catService()

const AddMassModal = ({visible, close, update, plateId}) => {
    const {token} = useSelector(state => state);
    const [Mass, setMass] = useState('')
    const [MassEn, setMassEn] = useState('')
    const [MassKz, setMassKz] = useState('')

    const [Price, setPrice] = useState('')
    const [SalePrice, setSalePrice] = useState('')
    const [load, setLoad] = useState(false)


    const massTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                shadow
                value={Mass}
                maskType={String}
                onChange={e => setMass(e.target.value)}
                placeholder={'Масса'}/>
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                shadow
                value={MassKz}
                maskType={String}
                onChange={e => setMassKz(e.target.value)}
                placeholder={'Масса'}/>
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                shadow
                value={MassEn}
                maskType={String}
                onChange={e => setMassEn(e.target.value)}
                placeholder={'Масса'}/>
        },
    ];



    const closeHandle = () => {
        close();
        setMass('')
        setPrice('')
        setSalePrice('')
    }

    const onSave = () => {
        setLoad(true)
        const body = {
            ItemID: plateId,
            Mass,
            Mass_en: MassEn,
            Mass_kz: MassKz,
            Price,
            SalePrice: SalePrice ? SalePrice : 0
        }
       
        cs.addPriceMass(token, body).then(res => {
        
            update(res)
            message.success('Дополнительная масса добавлена')
        }).finally(_ => {
            setLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal className='Modal' width={700} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Добавить массу</h2>
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
                        shadow 
                        value={Price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder={'Цена'}/>
                </div>
                <div className="Modal__form_row">
                    <Input
                        maskType={String}
                        scale={5}
                        shadow
                        value={SalePrice}
                        onChange={e => setSalePrice(e.target.value)}
                        placeholder={'Старая цена'}/>
                </div>
                <div className="Modal__form_action">
                    <Button
                        onClick={onSave}
                        disabled={!Mass || !Price}
                        load={load}
                        type={'button'}  
                        before={<BsTrash size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default AddMassModal;