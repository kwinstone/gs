import './DialogModal.scss';
import { Modal } from 'antd';
import {Row, Col} from 'antd';
import Button from '../Button/Button';

const DialogModal = ({
    close,
    visible,
    accept,
    cancel,
    text
}) => {

    const closeHandle = () => {
        close()
    }


    return (
        <Modal 
            width={500}
            open={visible}
            onCancel={closeHandle}
            className='DialogModal Modal'>
            <div className="DialogModal__text">
                {text}
            </div>
            <div className="DialogModal__action">
                <Row gutter={[20,20]}>
                    <Col span={12}>
                        <Button
                            styles={{width: '100%', justifyContent: 'center'}}
                            onClick={accept}
                            text={'Сохранить'}
                            />
                    </Col>
                    <Col span={12}>
                        <Button
                            styles={{width: '100%', justifyContent: 'center'}}
                            onClick={cancel}
                            variant={'danger'}
                            text={'Удалить'}
                            />
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default DialogModal;