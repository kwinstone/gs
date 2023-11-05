import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';

import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import checkDomain from '../../../../funcs/checkDomain';
import InputSelect from '../../../../components/InputSelect/InputSelect';

const delTypes = [
    {ID: '1', value: '1', label: 'Доставка'},
    {ID: '2', value: '2', label: 'Самовывоз'},
    {ID: '3', value: '3', label: 'Доставка и самовывоз'}
]

const promoTypes = [
    {value: 'Скидка (%)'},
    {value: `Скидка ${checkDomain('₽', '₸')}`},
    {value: 'Подарок'}
]

const BasketAddGift = ({
    visible, 
    close,
    list,
    data,
    setList,
    selectList
}) => {
    const [Disabled, setDisabled] = useState('0')
    const [GiftName, setGiftName] = useState('')
    const [ID, setID] = useState('0')
    const [item, setItem] = useState(null);
    const [delType, setDelType] = useState(null)
    const [MinPrice, setMinPrice] = useState()
    const [find, setFind] = useState(null)

    useEffect(() => {
        if(data) {
            console.log(data)
            if(data?.delivery_type) {
                setDelType(delTypes.find(i => i.ID === data?.delivery_type))
            }
            setMinPrice(data?.MinPrice)
            setDisabled(data?.Disabled)
            setGiftName(data?.GiftName)
            setItem({
                ID: data?.PlateID,
                option: data?.ID,
                value: data?.GiftName
            })
            setID(data?.ID)
        } else {
            setDisabled('0')
            setGiftName('')
            setID('0')
        }
    }, [data, list])

    const handleClose = () => {
        setDisabled('0')
        setGiftName('')
        setID('0')
        setItem(null)
        setDelType(null)
        setMinPrice('0')
        close();
    }

    useEffect(() => {
        
        if(item && item?.ID && selectList?.length > 0) {
            !data?.GiftName && setGiftName(selectList.find(i => i.ID == item?.ID)?.Name)
            !data?.MinPrice && setMinPrice(selectList.find(i => i.ID == item?.ID)?.Price)
            setFind(selectList.find(i => i.ID == item?.ID))
        }
    }, [item, selectList, data])


    


    const onSave = (item) => {
        
        if(data) {
            const r = list;
            const rm = r.splice(r.findIndex(i => i.ID == item.ID), 1, item)
            setList([...r])   
        } else {
            setList(state => [...state, item])
        }
        handleClose();
    }

    const onDelete = (item) => {
        const r = list;
        const rm = r.splice(item.index, 1)
        setList([...r])
        handleClose();
    }

    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить подарок</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input 
                        value={GiftName}
                        onChange={e => setGiftName(e.target.value)}
                        maskType={String}
                        shadow={true}
                        placeholder={'Название подарка'}/>
                </div>
                <div className="Modal__form_row">
                    <InputSelect
                        value={item}
                        onSelect={setItem}
                        defaultValue={item}
                        list={selectList}
                        />
                </div>
                <div className='Modal__form_row'>
                    <Input
                        placeholder={'Минимальная цена'}
                        // maskType={Number}
                        shadow={true}
                        value={MinPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        />
                </div>
                <div className='Modal__form_row'>
                    <InputSelect
                        list={delTypes}
                        placeholder={'Способ получения'}
                        value={delType}
                        onSelect={setDelType}
                        />
                </div>
                <div className="Modal__form_action">
                    <Row gutter={[15,15]}>
                        <Col span={24}>
                            <Button 
                            disabled={!(item?.ID && delType)}
                            onClick={() => {
                                if(data) {
                                    onSave({
                                        Disabled, 
                                        ID, 
                                        PlateID: item?.ID, 
                                        GiftName: GiftName ? GiftName : selectList.find(i => i.ID == item?.ID)?.Name, 
                                        index: data.index, 
                                        MinPrice: MinPrice,
                                        IIkoID: find?.IIkoID,
                                        delivery_type: delType?.ID
                                    })
                                } else {
                                    onSave({
                                        Disabled, 
                                        ID, 
                                        GiftName: GiftName ? GiftName : selectList.find(i => i.ID == item?.ID)?.Name, 
                                        PlateID: item?.ID,
                                        MinPrice: MinPrice,
                                        IIkoID: find?.IIkoID,
                                        delivery_type: delType?.ID
                                    })
                                }
                            }}
                            type={'button'} 
                            before={<SaveIcon color={'#fff'} size={16}/>} 
                            justify={'flex-start'} 
                            text={'Сохранить'}/>
                        </Col>
                        {
                            data ? (
                                <Col span={24}>
                                    <Button 
                                    onClick={() => onDelete({Disabled, ID, GiftName, index: data.index})}
                                    variant={'danger'}
                                    type={'button'} 
                                    before={<BsTrash/>} 
                                    justify={'flex-start'} 
                                    text={'Удалить'}/>
                                </Col>
                            ) : null
                        }
                        
                    </Row>
                    
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketAddGift;