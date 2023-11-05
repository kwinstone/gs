import './PolyPrice.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import { useEffect, useState } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import switchCrm from '../../../../funcs/switchCrm';
import { useSelector } from 'react-redux';





const PolyPrice = ({
    visible, 
    close,
    data,
    update,
}) => {
    const {settings} = useSelector(s => s)
    const [MinPrice, setMinPrice] = useState('')
    const [DeliveryPrice, setDeliveryPrice] = useState('')
    const [DeliveryItemID, setDeliveryItemID] = useState('')
    const [DeliveryItemCount, setDeliveryItemCount] = useState('');

    const closeModal = () => {
        setMinPrice('')
        setDeliveryPrice('')
        setDeliveryItemID('')
        setDeliveryItemCount('')
        close()
    }

    useEffect(() => {
        if(data) {
            setMinPrice(data?.MinPrice)
            setDeliveryPrice(data?.DeliveryPrice)
            setDeliveryItemID(data?.DeliveryItemID)
            setDeliveryItemCount(data?.DeliveryItemCount)
        }
    }, [data])

    const onSave = () => {
        if(data) {
            update(state => {
                const r = state;
                const m = r.splice(r.findIndex(item => item.ID == data.ID), 1, {
                    ID: data.ID,
                    MinPrice,
                    DeliveryPrice,
                    Disabled: '0',
                    PolygonID: data.PolygonID,
                    DeliveryItemCount,
                    DeliveryItemID
                })
                return [...r];
            })
            closeModal()
        } else {
            update(state => {
                return [
                    ...state,
                    {
                        MinPrice,
                        DeliveryPrice,
                        Disabled: '0',
                        DeliveryItemCount,
                        DeliveryItemID
                    }
                ]
            })
            closeModal()
        }
        
    }




  


    return (
        <Modal width={550} className='Modal SelectPoly' open={visible} onCancel={closeModal}>
            
            <div className="Modal__head">Добавить цену</div>
            <form className="Modal__form">
                <Row gutter={[0,10]}>
                    <Col span={24}>
                        <Input 
                            scale={5}
                            shadow={true}
                            onChange={e => setMinPrice(e.target.value)}
                            value={MinPrice}
                            placeholder={'Сумма заказа от'}/>
                    </Col>
                    <Col span={24}>
                        <Input
                            scale={5}
                            shadow={true}
                            value={DeliveryPrice}
                            onChange={e => setDeliveryPrice(e.target.value)} 
                            placeholder={'Цена доставки'}/>
                    </Col>
                    <Col span={24}>
                        {
                            switchCrm(settings, 
                                <Input
                                    value={DeliveryItemID}
                                    onChange={e => setDeliveryItemID(e.target.value)}
                                    maskType={String}
                                    placeholder={'ID позиции доставки в IIko'}
                                    shadow
                                    />,
                                <Input
                                    maskType={String}
                                    value={DeliveryItemID}
                                    onChange={e => setDeliveryItemID(e.target.value)}
                                    placeholder={'ID позиции доставки в RKeeper'}
                                    shadow
                                    />,
                                <Input
                                    maskType={String}
                                    value={DeliveryItemID}
                                    onChange={e => setDeliveryItemID(e.target.value)}
                                    placeholder={'ID позиции доставки в 1C'}
                                    shadow
                                    />,
                                <Input
                                    maskType={String}
                                    value={DeliveryItemID}
                                    onChange={e => setDeliveryItemID(e.target.value)}
                                    placeholder={'ID позиции доставки в FrontPad'}
                                    shadow
                                    />
                                )
                        }
                    </Col>
                    <Col span={24}>
                        <Input
                            maskType={Number}
                            value={DeliveryItemCount}
                            onChange={e => setDeliveryItemCount(e.target.value)}
                            placeholder="Количество позиций доставки"
                            shadow
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            styles={{width: '100%'}}
                            onClick={onSave}
                            disabled={!DeliveryPrice || !MinPrice}
                            text={'Сохранить'}
                            type={'button'}
                            before={<SaveIcon color={'#fff'} size={20}/>}
                            />
                        
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}

export default PolyPrice;