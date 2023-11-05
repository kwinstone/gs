import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import { useState } from 'react';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import InputSelect from '../../../../components/InputSelect/InputSelect';
import checkDomain from '../../../../funcs/checkDomain';

const promoTypes = [
    {value: 'Скидка (%)', id: '2'},
    {value: `Скидка (${checkDomain('₽', '₸')})`, id:'1'},
    {value: 'Подарок', id: '3'}
]


const BasketAddPromo = ({
    visible, 
    close,
    data,
    list,
    setList,
    selectList
}) => {
    const [Disabled, setDisabled] = useState('0')
    const [GiftName, setGiftName] = useState('')
    const [ID, setID] = useState('0')
    const [MinCartPrice, setMinCartPrice] = useState('')
    const [Promocode, setPromocode] = useState('')
    const [PromocodeType, setPromocodeType] = useState('0')
    const [SalePercent, setSalePercent] = useState('0')
    const [SalePrice, setSalePrice] = useState('0')
    const [item, setItem] = useState(null)


    useEffect(() => {
        if(data !== null) {
            setDisabled(data?.Disabled)
            setGiftName(data?.GiftName)
            setID(data?.ID)
            setMinCartPrice(data?.MinCartPrice)
            setPromocode(data?.Promocode)
            setPromocodeType(data?.PromocodeType)
            setSalePrice(data?.SalePrice)
            setSalePercent(data?.SalePercent)
            if(data?.PromocodeType == '3') {
                setItem({
                    option: data?.ID,
                    value: data?.GiftName
                })
            } else {
                setItem(null)
            }

        } else {
            setDisabled('0')
            setGiftName('')
            setID('0')
            setMinCartPrice('')
            setPromocode('')
            setPromocodeType('1')
            setSalePrice('0')
            setSalePercent('0')
            setItem(null)
        }
    },[data])


    const handleClose = () => {
        setDisabled('0')
        setGiftName('')
        setID('0')
        setMinCartPrice('')
        setPromocode('')
        setPromocodeType('1')
        setSalePrice('0')
        setSalePercent('0')
        setItem(null)
        close();
    }


    const onSave = (item) => {
        
        if(item.ID != '0') {
            const r = list;
            const rm = r.splice(r.findIndex(i => i.ID == item.ID), 1, item)
            setList([...r])
        } else {
            setList(state => [...state, item])
        }
        handleClose()
    }

    const onDelete = (item) => {
        if(item.ID != '0') {
            const r = list;
            const rm = r.splice(r.findIndex(i => i.ID == item.ID), 1)
            setList([...r])
        } else {
            const r = list;
            const rm = r.splice(item.index, 1)
            setList([...r])
        }   
        handleClose()
    }

    const onEdit = (item) => {
        const r = list;
        const rm = r.splice(r.findIndex(i => i.index == item.index), 1, item);
        setList([...r])
        handleClose()
    }


    const selectPromoType = (value) => {
        setPromocodeType(promoTypes.find(item => item.value == value).id)
    }


    const selectedTypePromoInput = (type) => {
        switch(type) {
            case '1':
                return (
                    <Input
                        shadow
                        value={SalePrice?.toString()}
                        maskType={String}
                        onChange={e => setSalePrice(e.target.value)} 
                        placeholder={`Скидка (${checkDomain('₽', '₸')})`}/>
                )
            case '2':
                return (
                    <Input
                        maskType={String}
                        shadow
                        value={SalePercent?.toString()}
                        onChange={e => setSalePercent(e.target.value)} 
                        placeholder={'Скидка (%)'}/>
                )
            case '3':
                return (
                    // <Input
                    //     maskType={String}
                    //     shadow
                    //     value={GiftName}
                    //     onChange={e => setGiftName(e.target.value)} 
                    //     placeholder={'Подарок'}/>
                    <InputSelect
                        value={item}
                        onSelect={setItem}
                        defaultValue={item}
                        list={selectList}
                        />
                )
            default:
                return null
        }
    }


    useEffect(() => {
        if(item && item?.ID && selectList?.length > 0) {
            setGiftName(selectList.find(i => i.ID == item?.ID)?.Name)
        }
    }, [item, selectList])

    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить промокод</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        shadow
                        value={Promocode}
                        onChange={e => setPromocode(e.target.value)}
                        maskType={String} 
                        placeholder={'Промокод'}/>
                </div>
                <div className="Modal__form_row">
                    <Input 
                        shadow
                        value={MinCartPrice}
                        onChange={e => setMinCartPrice(e.target.value)}
                        placeholder={'Минимальная сумма заказа'}/>
                </div>
                <div style={{fontWeight: 600, color: '#989898', marginBottom: 10}}>Тип промокода</div>
                <div className="Modal__form_row">
                    <DropCollapse 
                        justify={'justifyLeft'}
                        shadow={true}
                        list={promoTypes} 
                        value={promoTypes.find(item => item.id == PromocodeType)?.value} 
                        selectItem={selectPromoType}
                        beforeIcon/>
                </div>
                <div className="Modal__form_row">
                    {selectedTypePromoInput(PromocodeType)}
                </div>
                <div className="Modal__form_action">
                    <Row gutter={[15, 15]}>
                        <Col span={24}>
                            <Button 
                            type={'button'} 
                            before={<SaveIcon color={'#fff'} size={16}/>} 
                            justify={'flex-start'} 
                            text={'Сохранить'}
                            disabled={!Promocode || !MinCartPrice}
                            onClick={() => {
                                if(data?.ID != '0') {
                                    onSave({Disabled, GiftName, MinCartPrice, ID, Promocode, PromocodeType, SalePercent, SalePrice})
                                } else {
                                    onEdit({Disabled, GiftName, MinCartPrice, ID, Promocode, PromocodeType, SalePercent, SalePrice, index: data.index})
                                }
                            }}
                            />
                        </Col>
                        {
                            data != null ? (
                                <Col span={24}>
                                    <Button 
                                    variant={'danger'}
                                    type={'button'} 
                                    before={<BsTrash/>} 
                                    justify={'flex-start'} 
                                    onClick={() => onDelete({Disabled, GiftName, MinCartPrice, ID, Promocode, PromocodeType, SalePercent, SalePrice, index: data.index})}
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

export default BasketAddPromo;