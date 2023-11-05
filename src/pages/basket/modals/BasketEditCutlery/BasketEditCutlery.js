import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';

const BasketEditCutlery = ({visible, close}) => {
    const handleClose = () => {
        close();
    }
    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Изменить столовый прибор</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Название'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Максимальное количество'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15, marginBottom: 10}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Удалить столовый прибор'}
                        variant={'danger'}/>
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketEditCutlery;