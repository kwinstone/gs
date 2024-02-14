import './OrderInfo.scss';
import {Modal, notification} from 'antd';
import { Row, Col } from 'antd';
import { useState } from 'react';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import OrderPlate from '../../components/OrderPlate/OrderPlate';
import OrderExList from '../../components/OrderExList/OrderExList';
import { useEffect } from 'react';
import checkPay from '../../helpers/checkPay';
import checkDelivery from '../../helpers/checkDelivery';
import { useSelector } from 'react-redux';
import anService from '../../../../services/anService';
import checkDomain from '../../../../funcs/checkDomain';
import Button from '../../../../components/Button/Button';
import { toast } from 'react-toastify';
import endpoints, {BASE_DOMAIN} from "../../../../services/endpoints";
import checkAuth from "../../../../services/checkAuth";

const anl = new anService();

const pays = [
    {
        value: 'Оплачено',
        ID: '1'
    },
    {
        value: 'Не оплачено',
        ID: '0'
    }
]



const OrderInfo = ({ visible, close, order, data, updateList }) => {
    const { token } = useSelector(state => state)
    const [dataL, setDataL] = useState(null)
    const [orderPlates, setOrderPlates] = useState([])
    const [loadStatus, setLoadStatus] = useState(false)
    const [loadPay, setLoadPay] = useState(false)

    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        if (data) {
            console.log(data)
            setDataL(data)
            setOrderPlates(data.Plates)
        }
    }, [data])


    const closeHandle = () => {
        close();
    }

    // useEffect(() => {
    //     if(data?.OrganisationID && token) {

    //     }
    // }, [data, token])


    useEffect(() => {
        if (token) {
            anl.getStatuses(token).then(res => {
                setStatuses(res?.Statuses?.map(i => ({ ID: i.ID, value: i.Name })))

            })
        }
    }, [token])

    const editStatus = (status, index, id) => {

        setLoadStatus(true)
        anl.editOrderStatus(token, { OrderID: dataL?.ID, Status: id }).then(res => {

            if (res?.error === false) {
                setDataL(state => {
                    return {
                        ...state,
                        Status: id
                    }
                })
                updateList()
            } else {
                toast.error('Возникла ошибка при изменении статуса')
            }
        }).finally(_ => setLoadStatus(false))
    }

    const editPay = (value, index, id) => {
        setLoadPay(true)
        anl.editOrderPaidStatus(token, { OrderID: dataL?.ID, Status: id }).then(res => {
            if (res.error === false) {
                setDataL(state => {
                    return {
                        ...state,
                        IsPaid: id
                    }
                })
                updateList()
            }
        }).finally(_ => setLoadPay(false))
    }

    const handlePort = async () => {
        const response = await anl.portOrder(token, dataL?.ID)
        console.log(response)
    }

    const handleDeleteOrder = async () => {
        try {
            let res = await fetch(`${BASE_DOMAIN}/analytics/delOrder`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    ID: dataL?.ID
                })
            })

            const result = await checkAuth(res)
            console.log(result)
            if (!result.error) {
                notification.success({ message: 'Заказ успешно удален' })
                closeHandle()
                updateList()
            } else {
                notification.error({ message: 'Ошибка при удалении заказа' })
            }
        } catch (err) {
            notification.error({ message: 'Ошибка при удалении заказа' })
        }
    }



    return (
        <Modal className='Modal OrderInfo' width={dataL?.Additions.length == 0 && dataL?.Cutlery.length == 0 ? 800 : 1200} open={visible} onCancel={closeHandle}>

            <h2 className="Modal__head">Заказ №{dataL?.ID}</h2>
            <div className="Modal__form">
                <Row gutter={[30, 0]}>
                    <Col span={dataL?.Additions.length == 0 && dataL?.Cutlery.length == 0 ? 12 : 8}>
                        <div className="OrderInfo__main panel">
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Клиент</div>
                                <div className="OrderInfo__main_item_value">{dataL?.UserName != '' ? dataL?.UserName : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Телефон</div>
                                <div className="OrderInfo__main_item_value">{dataL?.UserPhone != '' ? dataL?.UserPhone : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Цена</div>
                                <div className="OrderInfo__main_item_value">{dataL?.Price != '' ? dataL?.Price : 'Не указано'}{checkDomain('₽', '₸')}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Цена со скидкой</div>
                                <div className="OrderInfo__main_item_value">{dataL?.SalePrice != '' ? dataL?.SalePrice : 'Не указано'}{checkDomain('₽', '₸')}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Бонусов получено</div>
                                <div className="OrderInfo__main_item_value">{dataL?.BonusesRecieved != '' ? dataL?.BonusesRecieved : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Бонусов потрачено</div>
                                <div className="OrderInfo__main_item_value">{dataL?.BonusesSpent != '' ? dataL?.BonusesSpent : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Бонусов у клиента</div>
                                <div className="OrderInfo__main_item_value">{dataL?.BonusesHad != '' ? dataL?.BonusesHad : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Тип доставки</div>
                                <div className="OrderInfo__main_item_value">{checkDelivery(Number(dataL?.DeliveryType))}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Ресторан</div>
                                <div className="OrderInfo__main_item_value">{dataL?.OrganisationID}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Дата заказа</div>
                                <div className="OrderInfo__main_item_value">{dataL?.DateCreated != '' ? dataL?.DateCreated : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Дата подачи</div>
                                <div className="OrderInfo__main_item_value">{dataL?.OrderDate == 'now' ? 'Как можно быстрее' : dataL?.OrderDate}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Комментарий</div>
                                <div className="OrderInfo__main_item_value">{dataL?.Comment != '' ? dataL?.Comment : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Промокод</div>
                                <div className="OrderInfo__main_item_value">{dataL?.Promocode != '' ? dataL?.Promocode : 'Не указано'}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Подарок</div>
                                <div className="OrderInfo__main_item_value">
                                    {
                                        dataL?.GiftID != '' ?
                                            dataL?.GiftID.split('\\n').map(item => (
                                                <div>{item}</div>
                                            )) : 'Не указано'
                                    }
                                </div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Способ оплаты</div>
                                <div className="OrderInfo__main_item_value">{checkPay(Number(dataL?.PayType))}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Сдача с</div>
                                <div className="OrderInfo__main_item_value">{dataL?.CountCashChange}{checkDomain('₽', '₸')}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Количество платных дополнений</div>
                                <div className="OrderInfo__main_item_value">{dataL?.CountPaidAdditions != '' ? dataL?.CountPaidAdditions : 'Не указано'}</div>
                            </div>
                            {
                                dataL?.DeliveryType == 1 && (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Адрес</div>
                                        <div className="OrderInfo__main_item_value">
                                            {dataL?.City && dataL?.City}
                                            {dataL?.Street && `, ул.${dataL?.Street}`}
                                            {dataL?.HouseNumber && `, дом ${dataL?.HouseNumber}`}
                                            {dataL?.Apt && `, кв.${dataL?.Apt}`}
                                            {dataL?.Entrance && `, подъезд ${dataL?.Entrance}`}
                                            {dataL?.Floor && `, этаж ${dataL?.Floor}`}
                                            {dataL?.DoorPhone && `, домофон ${dataL?.DoorPhone}`}
                                        </div>
                                    </div>
                                )
                            }
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Комментарий к адресу</div>
                                <div className="OrderInfo__main_item_value">{dataL?.AddressComment != '' ? dataL?.AddressComment : 'Не указано'}</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={dataL?.Additions.length == 0 && dataL?.Cutlery.length == 0 ? 12 : 8}>
                        <div className="OrderInfo__md">
                            <Col span={24}>
                                <Row gutter={[10, 10]}>
                                    <Col span={24}>
                                        <Row gutter={[10, 10]}>
                                            <Col span={6} style={{ paddingTop: 14 }}>
                                                <span style={{ color: '#989898', width: '100px', fontWeight: '600' }}>Статус</span>
                                            </Col>
                                            <Col span={18}>
                                                <DropCollapse
                                                    load={loadStatus}
                                                    justify={'justifyLeft'}
                                                    selectItem={editStatus}
                                                    list={statuses}
                                                    shadow={true}
                                                    styles={{ width: '100%' }}
                                                    beforeIcon
                                                    value={statuses.find(i => i.ID == dataL?.Status)?.value} />
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[10, 10]}>
                                            <Col span={6} style={{ paddingTop: 14 }}>
                                                <span style={{ color: '#989898', width: '100px', fontWeight: '600' }}>Оплата</span>
                                            </Col>
                                            <Col span={18}>
                                                <DropCollapse
                                                    load={loadPay}
                                                    justify={'justifyLeft'}
                                                    selectItem={editPay}
                                                    list={pays}
                                                    shadow={true}
                                                    styles={{ width: '100%' }}
                                                    beforeIcon
                                                    value={dataL?.IsPaid == '1' ? 'Оплачено' : 'Не оплачено'} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        orderPlates?.length > 0 ? (
                                            <Col span={24}>
                                                <div style={{ fontWeight: 600, color: '#989898', marginBottom: '15px' }}>Блюда заказа</div>
                                                {
                                                    orderPlates?.length > 0 ? (
                                                        orderPlates.map((item, index) => (
                                                            <OrderPlate
                                                                key={index}
                                                                {...item}
                                                            />
                                                        ))
                                                    ) : null
                                                }
                                            </Col>
                                        ) : null
                                    }
                                    <Col span={24}>
                                        <Button text='Портировать заказ' onClick={handlePort} />
                                        <div style={{ marginTop: '12px' }}>
                                            <Button text='Удалить заказ' variant={'danger'} onClick={handleDeleteOrder} />
                                        </div>

                                    </Col>
                                </Row>
                            </Col>




                        </div>
                    </Col>
                    {
                        dataL?.Additions.length == 0 && dataL?.Cutlery.length == 0 ? (
                            null
                        ) : (
                            <Col span={8}>
                                {
                                    dataL?.Additions.length > 0 ? (
                                        <OrderExList list={dataL?.Additions} name={'Дополнения к заказу'} />
                                    ) : null
                                }
                                {
                                    dataL?.Cutlery.length > 0 ? (
                                        <OrderExList list={dataL?.Cutlery} name={'Столовые приборы'} />
                                    ) : null
                                }

                            </Col>
                        )
                    }

                </Row>
            </div>
        </Modal>
    )
}

export default OrderInfo;