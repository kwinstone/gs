import './User.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import {BsLightningCharge} from 'react-icons/bs';
import OrderItem from '../../components/OrderItem/OrderItem';
import DishItem from '../../components/DishItem/DishItem';
import { useEffect } from 'react';
import anService from '../../../../services/anService';
import { useSelector } from 'react-redux';
import Discount from '../discount/Discount';
import moment from 'moment';
import Push from '../push/Push';
import Email from '../email/Email';
import { useCallback } from 'react';
import checkDomain from '../../../../funcs/checkDomain';
import { message as antMessage } from 'antd';
import {toast} from "react-toastify";

const anl = new anService();


const User = ({
    visible, 
    close, 
    updateList,
    data,
    updateTrigger
}) => {
    const {token} = useSelector(state => state)
    const [discount, setDiscount] = useState(false)
    const [push, setPush] = useState(false)
    const [email, setEmail] = useState(false)
    const [sale, setSale]= useState(0)
    const [message, setMessage] = useState('')
    const [date, setDate] = useState('')
    const [addLoad, setAddLoad] = useState(false)
    const [removeLoad, setRemoveLoad] = useState(false)
    const [pushLoad, setPushLoad] = useState(false)
    const [emailLoad, setEmailLoad] = useState(false)

    const [userDataEditLoad, setUserDataEditLoad] = useState(false)

    const [localEmail, setLocalEmail] = useState('')
    const [localPhone, setLocalPhone] = useState('')

    const [Name, setName] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('');



    const closeDiscount = () => setDiscount(false)
    const openDiscount = () => setDiscount(true)
    
    const closePush = () => setPush(false)
    const openPush = () => setPush(true)

    const closeEmail = () => setEmail(false)
    const openEmail = () => setEmail(true)

    useEffect(() => {
        if(data) {
            console.log(data)
            setSale(data.PersonalSale)
            setMessage(data.PersonalSaleMessage)
            setDate(data.PersonalSaleDeadline)

            setLocalEmail(data?.Email)
            setLocalPhone(data?.Phone)

            setName(data?.Name)
            setDateOfBirth(data?.DateOfBirth)

        }
    }, [data])

    const addDiscount = useCallback((body) => {
        setAddLoad(true)
        anl.setPersonalSale(token, {
            ...body,
            StopDate: moment(body.StopDate).format('YYYY-MM-DD'),
            UserID: data.ID
        }).then(res => {
            
            if(!res.error) {
                closeDiscount()
                setMessage(body.Message)
                setSale(body.Sale)
                setDate(moment(body.StopDate).format('YYYY-MM-DD'))
                updateList()
            }
        }).finally(_ => setAddLoad(false))
    }, [data])

    const removeDiscount = () => {
        setRemoveLoad(true)
        anl.removePersonalSale(token, data.ID).then(res => {
            if(!res.error) {
                setMessage('')
                setSale(0)
                setDate('')
                updateList()
            }
        }).finally(_ => setRemoveLoad(false))
    }

    const closeHandle = () => {
        close();
        setSale(0)
        setMessage('')
        setDate('')
    }

   

    const sendPush = (body) => {
        setPushLoad(true)
        anl.sendPushToUsers(token, {
            UsersID: [data.ID],
            ...body 
        }).then(res => {
            if(!res.error) {
                closePush()
            } else {
                //handle error
            }
        }).finally(() => setPushLoad(false))
    }

    const sendMail = (body) => {
        setEmailLoad(true)
        anl.sendMailToUsers(token, {
            UsersID: [data.ID],
            ...body
        }).then(res => {
            if(res?.error === false) {
                closeEmail()
            }
            if(res?.error === true) {
                antMessage.error('Произошла ошибка!')
            }
        }).finally(() => setEmailLoad(false))
    }

    const onSaveUserData = useCallback(() => {
        setUserDataEditLoad(true)
        anl.editUserData(token, {
            UserID: data?.ID,
            Email: localEmail,
            Phone: localPhone,
            Name: Name,
            DateOfBirth: DateOfBirth
        }).then(res => {
            console.log(res)
            closeHandle()
            toast.success('Информация о клиенте обновлена')
            updateTrigger()
        }).finally(_ => setUserDataEditLoad(false))
    }, [localEmail, localPhone, token, data, Name, DateOfBirth])

    const cancelUserData = () => {
        setLocalEmail(data?.Email)
        setLocalPhone(data?.Phone)
    }

    return (
        <Modal className='Modal' width={700} open={visible} onCancel={closeHandle}>
            <Discount
                load={addLoad}
                visible={discount}
                close={closeDiscount}
                onSave={addDiscount}
                updateList={updateList}
                />
            <Push
                load={pushLoad}
                visible={push}
                close={closePush}
                onSave={sendPush}
                />
            <Email
                visible={email}
                close={closeEmail}
                onSave={sendMail}
                load={emailLoad}
                />
            <div className="User">
                <Row
                    gutter={[20, 20]}
                    >
                    <Col span={24}>
                        <div className="User__name">
                            {data?.Name ? data.Name : 'Не указано'} <div className="User__name_badge">{data?.Bonuses} <BsLightningCharge/></div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="User__body">
                            <Row gutter={[10, 10]}>
                                <Col span={24}>
                                    <div className="User__body_info">
                                        <Row gutter={[10,10]}>
                                            <Col span={24}>
                                                <div className="User__body_info_item">
                                                    <div className="User__body_info_item_label">ФИО</div>
                                                    <Input
                                                        maskType={String}
                                                        shadow
                                                        onChange={e => setName(e.target.value)}
                                                        value={Name}/>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <div className="User__body_info_item">
                                                    <div className="User__body_info_item_label">Дата рождения</div>
                                                    <Input
                                                        maskType={String}
                                                        shadow
                                                        onChange={e => setDateOfBirth(e.target.value)}
                                                        value={DateOfBirth}/>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <div className="User__body_info_item">
                                                    <div className="User__body_info_item_label">E-mail</div>
                                                    <Input 
                                                        maskType={String} 
                                                        shadow 
                                                        onChange={e => setLocalEmail(e.target.value)}
                                                        value={localEmail}/>
                                                </div>
                                            </Col>
                                            {
                                                checkDomain(<>
                                                    <Col span={24}>
                                                        <div className="User__body_info_item inputDisabled">
                                                            <div className="User__body_info_item_label">Телефон</div>
                                                            <Input 
                                                                maskType={String}  
                                                                shadow
                                                                type={'error'}
                                                                readOnly
                                                                disabled
                                                                onChange={e => setLocalPhone(e.target.value)}
                                                                value={localPhone}/>
                                                        </div>
                                                    </Col>
                                                </>, null)
                                            }
                                            <Col span={12}>
                                                <div className="User__body_info_item">
                                                    <Button onClick={onSaveUserData} load={userDataEditLoad} styles={{width: '100%'}} text={'Сохранить'}/>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className="User__body_info_item">
                                                    {/*<Button onClick={cancelUserData} styles={{width: '100%'}} text={'Отменить'} variant={'danger'}/>*/}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                {
                                    sale != 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_discount">
                                                <div className="User__body_discount_label">Персональная скидка</div>
                                                
                                                <div className="User__body_discount_item">
                                                    <div className="User__body_discount_item_value">
                                                    {sale}% до {date} {message}
                                                    </div>
                                                    <div className="User__body_discount_item_action">
                                                        <Button 
                                                            load={removeLoad}
                                                            onClick={removeDiscount} 
                                                            before={<BsTrash/>} 
                                                            variant={'danger'} 
                                                            text={'Удалить'}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </Col>
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    data?.LastOrders?.length > 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_list">
                                                <div className="User__body_list_head">Последние заказы:</div>
                                                <div className="User__body_list_in">
                                                    {
                                                        data?.LastOrders.map((item, index) => (
                                                            <div className="User__body_list_item" style={{width: 260}}>
                                                                <OrderItem
                                                                    {...item}
                                                                    />
                                                            </div>
                                                        ))  
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                                {
                                    data?.PersonalRecomendations?.length > 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_list">
                                                <div className="User__body_list_head">Персональные рекомендации</div>
                                                <div className="User__body_list_in">
                                                    {
                                                        data.PersonalRecomendations.map((item, index) => (
                                                            <div className="User__body_list_item" style={{width: 260}}>
                                                                <DishItem
                                                                    {...item}
                                                                    />
                                                            </div>
                                                        ))
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                                {
                                    data?.FavoritePlates?.length > 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_list">
                                                <div className="User__body_list_head">Блюда в избранном</div>
                                                <div className="User__body_list_in">
                                                    {
                                                        data.FavoritePlates.map((item, index) => (
                                                            <div className="User__body_list_item" style={{width: 260}}>
                                                                <DishItem
                                                                    {...item}
                                                                    />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                            </Row>
                            
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="User__action">
                            <Button
                                onClick={openPush} 
                                styles={{marginRight: 15}} 
                                text={'Отправить Push-уведомление'} 
                                justify={'center'}/>
                            {
                                checkDomain(<>
                                     <Button
                                        onClick={openEmail} 
                                        styles={{marginRight: 15}} 
                                        text={'Отправить E-mail'} 
                                        justify={'center'}/>
                                    {
                                        sale == 0 ? (
                                            <Button onClick={openDiscount}  text={'Сделать скидку'} justify={'center'}/>
                                        ) : null
                                    }
                                </>, null)
                            }
                           
                            
                        </div>
                    </Col>
                </Row>
                
                
                
            </div>
        </Modal>
    )
}

export default User;