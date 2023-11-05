import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import InputSelect from '../../../../components/InputSelect/InputSelect';


const BasketAddCutlery = ({
    visible, 
    close,
    data,
    list,
    setList,
    selectList
}) => {
    const [ID, setID] = useState('0')
    const [Disabled, setDisabled] = useState('0')
    const [item, setItem] = useState(null)
    const [MaxCount, setMaxCount] = useState('')
    const [Title, setTitle] = useState('')
    const [index, setIndex] = useState(undefined)

    useEffect(() => {
        if(data !== null) {
            setID(data?.ID)
            setDisabled(data?.Disabled)
            setItem({
                option: data?.ID,
                value: data?.Title
            })
            setDisabled('0')
            setMaxCount(data?.MaxCount)
            setTitle(data?.Title)
            setIndex(data?.index)
        } else {
            setID('0')
            setIndex(undefined)
            setDisabled('0')
            setMaxCount('')
            setTitle('')
        }
    }, [data, selectList])

    const handleClose = () => {
        setDisabled('0')
        setMaxCount('')
        setTitle('')
        setItem(null)
        setIndex(undefined)
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

    const onDelete = () => {
        setList(s => s.filter((_,ind) => ind !== index))
        handleClose()
    }

    useEffect(() => {
        if(item && item?.ID && selectList?.length > 0) {
            setTitle(selectList.find(i => i.ID == item?.ID)?.Name)
        }
    }, [item, selectList])


    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">
                {
                    data ? 'Добавить столовый прибор' : 'Редактировать столовый прибор'
                }
            </h2>
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
                            disabled={!Title || !MaxCount}
                            onClick={() => onSave({...data, Disabled, ID, PlateID: item?.ID, Title, MaxCount})}
                            type={'button'} 
                            before={<SaveIcon color={'#fff'} size={16}/>} 
                            justify={'flex-start'} 
                            text={'Сохранить'}/>
                        </Col>
                        {
                            data !== null ? (
                                <Col span={24}>
                                    <Button 
                                    variant={'danger'}
                                    type={'button'} 
                                    before={<BsTrash/>} 
                                    onClick={onDelete}
                                    justify={'flex-start'} 
                                    text={'Удалить'}/>
                                </Col>
                            ) : (
                                null
                            )
                        }
                        
                    </Row>
                    
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketAddCutlery;