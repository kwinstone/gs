import './ReservItemModal.scss';
import { Modal, Row, Col } from 'antd';
import { useEffect } from 'react';

const ReservItemModal = ({data, visible, close}) => {

    const closeHandle = () => {
        close();
    }



    return (
        <Modal
            open={visible}
            onCancel={closeHandle}
            className='Modal ReservItemModal'
            >
            <h2 className="Modal__head">Бронь №{data?.ID}</h2>
            <div className="ReservItemModal__body">
                <Col span={24}>
                    <Row gutter={[15, 15]}>
                        <Col span={24}>
                            <div className="ReservItemModal__body_item">
                                <div className="ReservItemModal__body_item_label">Клиент</div>
                                <div className="ReservItemModal__body_item_value">{data?.Name}</div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="ReservItemModal__body_item">
                                <div className="ReservItemModal__body_item_label">Телефон</div>
                                <div className="ReservItemModal__body_item_value">{data?.Phone}</div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="ReservItemModal__body_item">
                                <div className="ReservItemModal__body_item_label">Кол-во гостей</div>
                                <div className="ReservItemModal__body_item_value">{data?.Guests}</div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="ReservItemModal__body_item">
                                <div className="ReservItemModal__body_item_label">Комментарий</div>
                                <div className="ReservItemModal__body_item_value">{data?.Comment}</div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="ReservItemModal__body_item">
                                <div className="ReservItemModal__body_item_label">Дата брони</div>
                                <div className="ReservItemModal__body_item_value">{data?.ReservationDate}</div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="ReservItemModal__body_item">
                                <div className="ReservItemModal__body_item_label">Дата создания</div>
                                <div className="ReservItemModal__body_item_value">{data?.DateCreated}</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </div>
        </Modal>
    )
}

export default ReservItemModal;