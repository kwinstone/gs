import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import InputSelect from '../../../../components/InputSelect/InputSelect';

const BasketAddAddition  = ({
    visible, 
    close,
    data,
    setList,
    list,
    selectList
}) => {
    const [Disabled, setDisabled] = useState('0')
    const [ID, setID] = useState('0');
    const [item, setItem] = useState(null)
    const [MaxCount, setMaxCount] = useState('')
    const [Title, setTitle] = useState('')
    const [index, setIndex] = useState(undefined)

    useEffect(() => {
        if(data !== null) {
            setDisabled(data?.Disabled)
            setItem({
                option: data?.ID,
                value: data?.Title
            })
            setID(data?.ID)
            setMaxCount(data?.MaxCount)
            setTitle(data?.Title)
            setIndex(data?.index)
        } else {
            setIndex(undefined)
            setDisabled('0')
            setMaxCount('')
            setTitle('')
        }
    }, [data, list])

    const handleClose = () => {
        setDisabled('0')
        setMaxCount('')
        setIndex(undefined)
        setTitle('')
        setItem(null)
        setID('')
        close();
    }

    const onSave = () => {
        const trBody = {
            Disabled, 
            ID, 
            PlateID: item?.ID, 
            Title, 
            MaxCount
        }
        if(data) {
            setList(s => s.map((i,ind) => {
                if(ind === index) {
                    return {...i,...trBody}
                } else return i
            }))
        } else {
            setList(s => [...s, trBody])
        }
        handleClose()
    }

    useEffect(() => {
        if(item && item?.ID && selectList?.length > 0) {
            setTitle(selectList.find(i => i.ID == item?.ID)?.Name)
        }
    }, [item, selectList])

    const onDelete = () => {
        setList(s => s.filter((_,ind) => ind !== index))
        handleClose()
    }

    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">{
                data ? 'Редактировать дополнение' : 'Добавить дополнение'
            }</h2>
            <form className="Modal__form">
                <div className='Modal__form_row'>
                    <InputSelect
                        value={item}
                        onSelect={setItem}
                        defaultValue={item}
                        list={selectList}
                        />
                </div>
                <div className="Modal__form_row">
                    <Input 
                        value={MaxCount}
                        onChange={e => setMaxCount(e.target.value)}
                        shadow={true}
                        placeholder={'Максимальное количество'}/>
                </div>
                <div className="Modal__form_action">
                    <Row gutter={[15,15]}>
                        <Col span={24}>
                            <Button 
                                disabled={!MaxCount || (data && !item?.ID)}
                                type={'button'} 
                                styles={{width: '100%'}} 
                                before={<SaveIcon color={'#fff'} size={16}/>} 
                                justify={'flex-start'} 
                                text={'Сохранить'}
                                onClick={() => onSave({...data, Disabled, ID, PlateID: item?.ID, Title, MaxCount})}
                                />
                                
                        </Col>
                        {
                            data !== null ? (
                                <Col span={24}>
                                    <Button 
                                        onClick={() => {
                                            onDelete({Disabled, ID, Title, MaxCount}, data.index)
                                        }}
                                        type={'button'} 
                                        variant={'danger'}
                                        styles={{with: '100%'}} 
                                        before={<BsTrash/>} 
                                        justify={'flex-start'} 
                                        text={'Удалить'}/>
                                </Col>
                            ) : null
                        }
                        
                    </Row>
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketAddAddition;