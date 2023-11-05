import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';


const BasketTableAdd = ({visible, close}) => {
    
    const handleClose = () => {
        close();
    }


    
    return (
        <Modal width={500} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить позицию</h2>
            <form className="Modal__form">
                
                <div className="Modal__form_row">
                    <Input placeholder={'Позиции от'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Позиции до'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Позиции FREE'}/>
                </div>
                
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>

                </div>
            </form>
        </Modal>
    )
}

export default BasketTableAdd;