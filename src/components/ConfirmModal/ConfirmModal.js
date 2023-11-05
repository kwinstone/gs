import './ConfirmModal.scss';
import { Modal } from 'antd';


const ConfirmModal = ({visible, close, text, accept, cancel}) => {


    const closeHandle = () => {
        close()
    }

    return (
        <Modal width={350} className='Modal ConfirmModal' open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head ConfirmModal__head">Подтверждение</h2>
            <div className="ConfirmModal__body">
                <div className="ConfirmModal__body_text">{text}</div>
                <div className="ConfirmModal__body_action">
                    {
                        accept ? (
                            <div onClick={accept} className="ConfirmModal__body_action_btn ConfirmModal__body_action_accept">Выйти без сохранения</div>
                        ) : null
                    } 
                    {
                        cancel ? (
                            <div onClick={cancel} className="ConfirmModal__body_action_btn ConfirmModal__body_action_cancel">Удалить</div>
                        ) : null
                    }
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal;