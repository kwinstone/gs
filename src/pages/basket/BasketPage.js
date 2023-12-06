import './BasketPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import { Col, message, Row } from 'antd';
import Input from '../../components/Input/Input';
import Pl from '../../components/Pl/Pl';
import BasketExList from './components/BasketExList/BasketExList';
import BasketCutleryList from './components/BasketCutleryList/BasketCutleryList';
import BasketPromo from './components/BasketPromo/BasketPromo';
import BasketRec from './components/BasketRec/BasketRec';
import Button from '../../components/Button/Button';

import Checkbox from '../../components/Checkbox/Checkbox';
import BasketOnlinePay from './components/BasketOnlinePay/BasketOnlinePay';
import BasketGift from './components/BasketGift/BasketGift';
import { useState } from 'react';
import BasketTable from './modals/BasketTable/BasketTable';

import {motion } from 'framer-motion';
import pageEnterAnimProps from '../../funcs/pageEnterAnimProps';
import { useSelector } from 'react-redux';
import bsService from '../../services/bsService';
import { useEffect } from 'react';
import SaveIcon from '../../icons/SaveIcon/SaveIcon';
import catService from '../../services/catService';


const bs = new bsService();
const cs = new catService();



// const AllowedDeliveryTypesObj = {
//     onlyDelivery: '0',
//     onlyLocal: '1',
//     both: '2',
//     none: '3'
// }

// const AllowedPayDeliveryTypesObj = {
//     onlyDelivery: '0',
//     onlyLocal: '1',
//     both: '2',
//     none: '3'
// }



const BasketPage = () => {
    const {token} = useSelector(state => state)

    //data
    const [CartAdditions, setCartAdditions] = useState([])
    const [CartAdditionsTable, setCartAdditionsTable] = useState([])
    const [CartCutlery, setCartCutlery] = useState([])
    const [CartGlobalRecomendations, setCartGlobalRecomendations] = useState([])
    const [CartMainData, setCartMainData] = useState([])
    const [Gifts, setGifts] = useState([])
    const [Promocodes, setPromocodes] = useState([])

    //cart main data
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState('0')
    const [AllowedPayDeliveryTypes, setAllowedPayDeliveryTypes] = useState('0')
    const [CanHaveGiftsWhenSale, setCanHaveGiftsWhenSale] = useState('0')
    const [CanHavePromocodeWhenSale, setCanHavePromocodeWhenSale] = useState('0')
    const [CountOfPersonalRecomendations, setCountOfPersonalRecomendations] = useState('0')
    const [ID, setID] = useState('0')
    const [IsHaveMultipleGifts, setIsHaveMultipleGifts] = useState('0')
    const [MaxBonusesPayment, setMaxBonusesPayment] = useState('')
    const [MaxBonusesPercent, setMaxBonusesPercent] = useState('')
    // const [BonusesPercent, setBonusesPercent] = useState('')
    const [OnlyPayOnlineWhen, setOnlyPayOnlineWhen] = useState('0')
    const [OrderBonusesGetMax, setOrderBonusesGetMax] = useState('')
    const [OrderBonusesGetPercent, setOrderBonusesGetPercent] = useState('')
    const [PaidAdditionID, setPaidAdditionID] = useState('')
    const [PriceForAddition, setPriceForAddition] = useState('')


    //chchchchc
    const [payBonusDel, setPayBonusDel] = useState('0')
    const [payBonusLocal, setPayBonusLocal] = useState('0')
    const [bonusDel, setBonusDel] = useState('0')
    const [bonusLocal, setBonusLocal] = useState('0')

    const [selectList, setSelectList] = useState([])


    useEffect(() => {
        switch(AllowedDeliveryTypes) {
            case "0":
                setBonusDel('1')
                setBonusLocal('0')
                break;
            case "1":
                setBonusDel('0')
                setBonusLocal('1')
                break;
            case "2":
                setBonusDel('1')
                setBonusLocal('1')
                break;
            case "3":
                setBonusDel('0')
                setBonusLocal('0')
                break;
            default:
                setBonusDel('0')
                setBonusLocal('0')
        }
    }, [AllowedDeliveryTypes])

    useEffect(() => {
        switch(AllowedPayDeliveryTypes) {
            case "0":
                setPayBonusDel('1')
                setPayBonusLocal('0')
                break;
            case "1":
                setPayBonusDel('0')
                setPayBonusLocal('1')
                break;
            case "2":
                setPayBonusDel('1')
                setPayBonusLocal('1')
                break;
            case "3":
                setPayBonusDel('0')
                setPayBonusLocal('0')
                break;
            default:
                setPayBonusDel('0')
                setPayBonusLocal('0')
                break;
        }
    }, [AllowedPayDeliveryTypes])

    const [basketTable, setBasketTable] = useState(false);
    const [load, setLoad] = useState(false)

    const getSettings = () => {
        bs.getBasketSettings(token).then(res => {
     
            setCartAdditions(res?.CartAdditions)
            setCartAdditionsTable(res?.CartAdditionsTable)
            setCartCutlery(res?.CartCutlery)
            setCartGlobalRecomendations(res?.CartGlobalRecomendations)
            setGifts(res?.Gifts)
            setPromocodes(res?.Promocodes)
            
            //set main data
            setAllowedDeliveryTypes(res?.CartMainData?.AllowedDeliveryTypes)
            setAllowedPayDeliveryTypes(res?.CartMainData?.AllowedPayDeliveryTypes)
            setCanHaveGiftsWhenSale(res?.CartMainData?.CanHaveGiftsWhenSale)
            setCanHavePromocodeWhenSale(res?.CartMainData?.CanHavePromocodeWhenSale)
            setCountOfPersonalRecomendations(res?.CartMainData?.CountOfPersonalRecomendations)
            setID(res?.CartMainData?.ID)
            setIsHaveMultipleGifts(res?.CartMainData?.IsHaveMultipleGifts)
            setMaxBonusesPayment(res?.CartMainData?.MaxBonusesPayment)
            setMaxBonusesPercent(res?.CartMainData?.MaxBonusesPercent)
            setOnlyPayOnlineWhen(res?.CartMainData?.OnlyPayOnlineWhen)
            setOrderBonusesGetMax(res?.CartMainData?.OrderBonusesGetMax)
            setOrderBonusesGetPercent(res?.CartMainData?.OrderBonusesGetPercent)
            setPaidAdditionID(res?.CartMainData?.PaidAdditionID)
            setPriceForAddition(res?.CartMainData?.PriceForAddition)
        })
    }

    useEffect(() => {
        if(token) {
            getSettings()
        }
    }, [token])


    const openBasketTable = () => {
        setBasketTable(true)
    }

    const closeBasketTable = () => {
        setBasketTable(false)
        setCartAdditionsTable(CartAdditionsTable)
    }




    const switchDelTypes = (del, local) => {
        if(del == '1' && local == '1') {
            return '2'
        }
        if(del == '1' && local == '0') {
            return '0'
        }
        if(del == '0' && local == '1') {
            return '1'
        }
        if(del == '0' && local == '0') {
            return '3'
        }
    }




    const onSave = () => {
        setLoad(true)
  
        const body = {
            CartAdditions: CartAdditions.map(item => {
                delete item.index
                return item;
            }),
            CartAdditionsTable: CartAdditionsTable.map(item => {
                delete item.index
                return item
            }),
            CartCutlery: CartCutlery.map(item => {
                delete item.index
                return item;
            }),
            CartGlobalRecomendations: CartGlobalRecomendations?.map(i => {
                return {
                    ID: i.ID,
                    PlateID: i.PlateID
                }
            }),
            CartMainData: {
                AllowedDeliveryTypes: switchDelTypes(bonusDel, bonusLocal),
                AllowedPayDeliveryTypes: switchDelTypes(payBonusDel, payBonusLocal),
                CanHaveGiftsWhenSale,
                CanHavePromocodeWhenSale,
                CountOfPersonalRecomendations,
                ID,
                IsHaveMultipleGifts,
                MaxBonusesPayment,
                MaxBonusesPercent,
                OnlyPayOnlineWhen,
                OrderBonusesGetMax,
                OrderBonusesGetPercent,
                PaidAdditionID,
                PriceForAddition
            },
            Gifts: Gifts.map(item => {
                delete item.index;
                return item;
            }),
            Promocodes: Promocodes.map(item => {
                delete item.index;
                return item;
            })
        }

        console.log(body)

        
        bs.editBasketSettings(token, body).then(res => {
            getSettings();
            if(res) {message.success('Настройки успешно сохранены')} else message.error('Произошла ошибка')
        }).catch(err => {
            message.error('Произошла ошибка')
        }).finally(_ => {
            setLoad(false)
        })
    }


    useEffect(() => {
        if(token) {
            cs.getCatsNames(token, {elements: 'plates'}).then(res => {
                console.log(res)
                setSelectList(res.map(i => {
                    return {
                        ...i,
                        value: i?.ID,
                        label: i.Name
                    }
                }))
            })

            cs.getSearchProd(token, {elements: 'plates'}).then(res => {
                console.log(res)
            })
        }
    }, [token])



    return (
        <motion.div 
            {...pageEnterAnimProps}

            className="BasketPage page">

            <HeaderProfile/>

            <BasketTable 
                setCartAdditionsTable={setCartAdditionsTable}
                data={CartAdditionsTable} 
                visible={basketTable} 
                close={closeBasketTable} 
               />
        
            <div className="pageBody">
                <div className="BasketPage__body pageBody-content">
                    <Row gutter={[30, 0]}>
                        <Col span={12}>
                            <Row className='row-custom'>
                                <Input 
                                    maskType={String}
                                    value={PriceForAddition}
                                    onChange={e => setPriceForAddition(e.target.value)}
                                    placeholder={'Цена за платное дополнение'}/>
                            </Row>
                            <Row className='row-custom'>
                                <Pl style={{
                                    backgroundColor: '#fff', 
                                    justifyContent: 'flex-start',
                                    height: 'unset',
                                    color: '#7B99FF'}} 
                                    text={'Таблица дополнений'}
                                    onClick={openBasketTable}
                                />
                            </Row>
                            <Row className='row-custom'>
                                <BasketExList
                                    selectList={selectList}
                                    setData={setCartAdditions}
                                    data={CartAdditions}
                                    />
                            </Row>
                            <Row className='row-custom'>
                                <BasketCutleryList
                                    selectList={selectList}
                                    setData={setCartCutlery}
                                    data={CartCutlery}
                                    />
                            </Row>

                           
                            <Row className='row-custom'>
                                <BasketPromo
                                    selectList={selectList}
                                    setData={setPromocodes}
                                    data={Promocodes}
                                    />
                            </Row>
                            <Row className="row-custom">
                                <Checkbox 
                                    checked={CanHavePromocodeWhenSale == '1'}
                                    onChange={e => e.target.checked ? setCanHavePromocodeWhenSale('1') : setCanHavePromocodeWhenSale('0')}
                                    text={'Промокоды при активной скидке'} 
                                    id="5"/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox 
                                    checked={CanHaveGiftsWhenSale == '1'}
                                    onChange={e => e.target.checked ? setCanHaveGiftsWhenSale('1') : setCanHaveGiftsWhenSale('0')}
                                    text={'Подарки при активной скидке'} 
                                    id="6"/>
                            </Row>
                            <Row className="row-custom">
                                <Input 
                                    maskType={String}
                                    value={CountOfPersonalRecomendations}
                                    onChange={e => setCountOfPersonalRecomendations(e.target.value)}
                                    placeholder={'Количество персональных рекомендаций'}/>
                            </Row>


                            <Row className="row-custom">
                                <BasketRec
                                    selectList={selectList}
                                    data={CartGlobalRecomendations}
                                    setData={setCartGlobalRecomendations}
                                    />
                            </Row>
                            <Row className="row-custom">
                                <Button
                                    disabled={false}
                                    load={load}
                                    onClick={onSave} 
                                    styles={{width: '100%'}} 
                                    text={'Сохранить'} 
                                    before={<SaveIcon color={'#fff'} size={16}/>}/>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className="row-custom">
                                <Input
                                    value={MaxBonusesPercent}
                                    onChange={e => setMaxBonusesPercent(e.target.value)}
                                    maskType={String}
                                    placeholder={'Процент бонусов для оплаты'}/>
                            </Row>
                            <Row className="row-custom">
                                <Input 
                                    value={MaxBonusesPayment}
                                    onChange={e => setMaxBonusesPayment(e.target.value)}
                                    maskType={String}
                                    placeholder={'Максимальное количество бонусов для оплаты'}/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox 
                                    checked={bonusDel == '1'}
                                    onChange={e => e.target.checked ? setBonusDel('1') : setBonusDel('0')}
                                    text={'Оплата бонусами для доставки'} 
                                    id="1"/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox 
                                    checked={bonusLocal == '1'}
                                    onChange={e => e.target.checked ? setBonusLocal('1') : setBonusLocal('0')}
                                    text={'Оплата бонусами для самовывоза'} 
                                    id="2"
                                    />
                            </Row>
                            <Row className="row-custom">
                                <Input 
                                    maskType={String}
                                    value={OrderBonusesGetPercent}
                                    onChange={e => setOrderBonusesGetPercent(e.target.value)}
                                    placeholder={'Процент получаемых бонусов'}/>
                            </Row>
                            <Row className="row-custom">
                                <Input 
                                    value={OrderBonusesGetMax}
                                    onChange={e => setOrderBonusesGetMax(e.target.value)}
                                    maskType={String}
                                    placeholder={'Максимальный процент получаемых бонусов'}/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox
                                    checked={payBonusDel == '1'}
                                    onChange={e => e.target.checked ? setPayBonusDel('1') : setPayBonusDel('0')}
                                    text={'Получение бонусов при доставке'} 
                                    id="3"/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox
                                    checked={payBonusLocal == '1'}
                                    onChange={e => e.target.checked ? setPayBonusLocal('1') : setPayBonusLocal('0')}
                                    text={'Получение бонусов при самовывозе'} 
                                    id="4"/>
                            </Row>
                            <Row className="row-custom">
                                <BasketOnlinePay
                                    value={OnlyPayOnlineWhen}
                                    setValue={setOnlyPayOnlineWhen}
                                    />
                            </Row>
                            <Row className="row-custom">
                                <BasketGift
                                    selectList={selectList}
                                    data={Gifts}
                                    setData={setGifts}
                                    />
                            </Row>
                            
                        </Col>
                    </Row>
                </div>
            </div>
        </motion.div>
    )
}

export default BasketPage;