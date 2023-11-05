import './RevInfo.scss';
import {  Modal } from 'antd';
import {Row, Col} from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import {Rate} from 'antd';
import checkDomain from '../../../funcs/checkDomain';


const RevInfo = ({
    visible,
    close,
    data,
}) => {
    const [dataL, setDataL] = useState(null)

    const onClose = () => {
        setDataL(null)
        close()
    }

    useEffect(() => {
        if(data) {
            setDataL(data)
        }
    }, [data])


    return (
        <Modal
            open={visible}
            onCancel={onClose}
            className='Modal RevInfo'
            >
            <h2 className='Modal__head'>
                Отзыв №{dataL?.ID} 
            </h2>
            <div className='RevInfo__body'>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <div className="def-label">Клиент</div>
                        <div className='RevInfo__value'>
                            {dataL?.UserName ? dataL?.UserName : 'Не указано'}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Телефон</div>
                        <div className='RevInfo__value'>
                            {dataL?.Phone ? dataL?.Phone : 'Не указано'}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Оценка</div>
                        <div className='RevInfo__value'>
                            <Rate 
                                style={{pointerEvents: 'none', color: 'var(--violet)'}}
                                className="star-rating"
                                value={dataL?.Stars}/>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Опции</div>
                        <div className='RevInfo__value'>
                            {dataL?.Options ? dataL?.Options : 'Не указано'}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Комментарий</div>
                        <div className='RevInfo__value'>
                            {dataL?.Comment ? dataL?.Comment : 'Не указано'}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Сумма</div>
                        <div className='RevInfo__value'>
                            {dataL?.Price ? dataL?.Price + checkDomain('₽', '₸') : 'Не указано'}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Тип доставки</div>
                        <div className='RevInfo__value'>
                            {dataL?.DeliveryType}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Тип оплаты</div>
                        <div className='RevInfo__value'>
                            {dataL?.PayType}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="def-label">Дата заказа</div>
                        <div className='RevInfo__value'>
                            {dataL?.DateCreated}
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}


export default RevInfo;