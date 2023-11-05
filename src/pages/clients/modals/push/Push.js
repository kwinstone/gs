
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import { useState } from 'react';
import Text from '../../../../components/Text/Text';

const Push = ({visible, close, load, onSave}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    const closeHandle = () => {
        setTitle('')
        setBody('')
        close();
    }

    const handleSave = () => {
        onSave({
            Title: title,
            Body: body
        })
    }


    return (
        <Modal className='Modal' width={600} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Отправить Push-уведомление всем пользователям</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input 
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        shadow
                        maskType={String}
                        placeholder={'Заголовок уведомления'}/>
                </div>
                <div className="Modal__form_row">
                    <Text 
                        maskType={String}
                        onChange={e => setBody(e.target.value)}
                        value={body}
                        shadow
                        placeholder={'Тело уведомления'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        load={load}
                        onClick={handleSave}
                        text={'Отправить Push-уведомление'}/>
                </div>
            </div>
        </Modal>
    )
}

export default Push;