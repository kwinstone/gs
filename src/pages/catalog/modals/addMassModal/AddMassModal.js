import './AddMassModal.scss';
import { message, Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';


const cs = new catService()

const AddMassModal = ({visible, close, update, plateId}) => {
    const {token} = useSelector(state => state);
    const [Mass, setMass] = useState('')
    const [Price, setPrice] = useState('')
    const [SalePrice, setSalePrice] = useState('')
    const [load, setLoad] = useState(false)




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
                    <Input
                        shadow 
                        value={Mass}
                        maskType={String}
                        onChange={e => setMass(e.target.value)}
                        placeholder={'Масса'}/>
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