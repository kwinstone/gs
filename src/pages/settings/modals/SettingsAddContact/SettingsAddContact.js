import './SettingsAddContact.scss';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import {Row, Col} from 'antd';
import Input from '../../../../components/Input/Input';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Button from '../../../../components/Button/Button';
import { BsSave, BsTrash } from 'react-icons/bs';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import Text from '../../../../components/Text/Text';


const contactTypes = [
    {value: 'Телефон'},
    {value: 'Telegram'},
    {value: 'WhatsApp'},
    {value: 'Instagram'},
    {value: 'VK'},
    {value: 'TikTok'},
]


const SettingsAddContact = ({
    visible,
    close,
    data,
    list,
    setList
}) => {
    const [ID, setID] = useState('0')
    const [AdditionalData, setAdditionalData] = useState('')
    const [Data, setData] = useState('')
    const [Disabled, setDisabled] = useState('0')
    const [Type, setType] = useState('0')
    

    useEffect(() => {
        if(data) {
            setID(data?.ID)
            setAdditionalData(data?.AdditionalData)
            setData(data?.Data)
            setDisabled(data?.Disabled)
            setType(data?.Type ? data.Type : '0')
        } else {
            setID('0')
            setAdditionalData('')
            setData('')
            setDisabled('0')
            setType('0')
        }
    }, [data])
    
    const handleClose = () => {
        setID('0')
        setAdditionalData('')
        setData('')
        setDisabled('0')
        setType('0')
        close()
    }

    const switchContactType = (type) => {
        switch(type) {
            case '0':
                return 'Телефон'
            case '1':
                return 'Telegram'
            case '2':
                return 'WhatsApp'
            case '3':
                return 'Instagram'
            case '4':
                return 'VK'
            case '5':
                return 'TikTok'
            default:
                return ''
        }
    }

    const switchContactValue = (value) => {
        switch(value) {
            case 'Телефон':
                setType('0');
                
                break;
            case 'Telegram':
                setType('1')
                break;
            case 'WhatsApp':
                setType('2')
                break;
            case 'Instagram':
                setType('3')
                break;
            case 'VK':
                setType('4')
                break;
            case 'TikTok':
                setType('5')
                break;
            default:
                setType('0')
                break;
        }
    }


    const onSave = (item) => {
        if(data) {
            if(data?.ID != '0') {
                setList(s => s.map((el) => el?.ID == data?.ID ? ({...data, ...item}) : el))
            }
        } else {
            setList(state => [...state, item])
        }
        handleClose()
    }
    const onDelete = (index) => {
        setList(s => s.filter((_,ind) => ind !== index))
        handleClose()
    }


    return (
        <Modal
            width={500}
            onCancel={handleClose}
            open={visible}
            className={"Modal"}
            >
            <div className="Modal__head">
                {
                    data ? 'Редактировать контакт' : 'Добавить контакт'
                }
            </div>
            <div className="Modal__form">
                <Row gutter={[15,20]}>
                    <Col span={24}>
                        <DropCollapse
                            value={switchContactType(Type)}
                            selectItem={switchContactValue}
                            justify={"justifyLeft"}
                            beforeIcon
                            shadow={true}
                            list={contactTypes}
                            
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            maskType={String}
                            value={Data}
                            onChange={e => setData(e.target.value)}
                            shadow={true}
                            placeholder={switchContactType(Type)}
                            />
                    </Col>
                    <Col span={24}>
                        <Text
                            value={AdditionalData}
                            onChange={e => setAdditionalData(e.target.value)}
                            shadow
                            placeholder={'Дополнительная информация'}
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            styles={{width: '100%'}}
                            text={'Сохранить'}
                            before={<SaveIcon color={'#fff'} size={16}/>}
                            onClick={() => {
                                onSave({
                                  Type,
                                  Data,
                                  AdditionalData,
                                  Disabled: '0'
                                })
                            }}
                            disabled={!Data}
                            />
                    </Col>
                    {
                        data ? (
                            <Col span={24}>
                                <Button
                                    text={'Удалить'}
                                    before={<BsTrash size={16}/>}
                                    variant={'danger'}
                                    styles={{width: '100%'}}
                                    onClick={() => onDelete(data.index)}
                                    />
                            </Col>
                        ): null
                    }
                </Row>
            </div>
        </Modal>
    )
}

export default SettingsAddContact;