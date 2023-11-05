import './Discount.scss';

import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {  useState } from 'react';

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';


registerLocale('ru', ru);





const Discount = ({visible, close, onSave, load}) => {

    const [sale, setSale] = useState('')
    const [message, setMessage] = useState('')
    const [date, setDate] = useState(null);

    const closeHandle = () => {
        close();
    }

    const handleSave = () => { 
        onSave({
            Sale: sale,
            Message: message,
            StopDate: date
        })
    }



    return (
        <Modal className='Modal Discount' width={600} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Персональная скидка</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input 
                        shadow
                        value={sale}
                        onChange={e => setSale(e.target.value)}
                        placeholder={'Скидка (%)'}/>
                </div>
                <div className="Modal__form_row">
                    <Input 
                        shadow
                        maskType={String}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder={'Сообщение пользователю'}/>
                </div>
                <div className="Modal__form_row gs-datepicker">
                    <DatePicker 
                        selected={date} 
                        onChange={(d) => setDate(d)} 
                        locale={'ru'} 
                        placeholderText="Дата окончания"/>
                </div>
                <div className="Modal__form_action">
                    <Button load={load} onClick={handleSave} text={'Сделать скидку'}/>
                </div>
            </div>
        </Modal>
    )
}

export default Discount;