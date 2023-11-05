import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';


const promoTypes = [
    {value: 'Скидка (%)'},
    {value: 'Скидка (₽)'},
    {value: 'Подарок'}
]

const SettingsEditUser = ({visible, close}) => {

    const handleClose = () => {
        close();
    }


    
    return (
        <Modal width={500} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить пользователя</h2>
            <form className="Modal__form">
                
                <div className="Modal__form_row">
                    <Input placeholder={'Имя пользователя'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Логин'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Пароль'} type={'password'}/>
                </div>
                <div className="Modal__form_row">
                    <h3 className="def-label">Роль</h3>
                </div>
                <div className="Modal__form_row">
                    <DropCollapse value={'Администратор'} afterIcon/>
                </div>
                <div className="Modal__form_row">
                    <h3 className="def-label">Разрешения</h3>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать каталог'} id={'set1'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать каталог'} id={'set2'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать организации'} id={'set3'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать организации'} id={'set4'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать настройки'} id={'set5'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать настройки'} id={'set6'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать пользователей админ-панели'} id={'set7'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать заказы'} id={'set8'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать клиентов'} id={'set9'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать сториз'} id={'set10'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать сториз'} id={'set11'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать статистику'} id={'set12'}/>
                </div> 
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать настройки корзины'} id={'set13'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать настройки корзины'} id={'set14'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Просматривать интеграции'} id={'set15'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox text={'Редактировать интеграции'} id={'set16'}/>
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
                        text={'Удалить контакт'}
                        variant={'danger'}/>
                    
                </div>
            </form>
        </Modal>
    )
}

export default SettingsEditUser;