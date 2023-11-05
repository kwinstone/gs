import './EditOpt.scss';
import { Modal } from 'antd';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import {Row, Col} from 'antd';
import Input from '../../../../components/Input/Input';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import { BsTrash } from 'react-icons/bs';



const delList = [
    {value: 'Доставка', id: '0'},
    {value: 'Самовывоз', id: '1'},
    {value: 'Доставка и самовывоз', id: '1'},
    {value: 'Не указано', id: '1'},
]


const EditOpt = ({
    data,
    visible,
    close,
    positive,
    positiveList,
    negativeList,
    setPositiveList,
    setNegativeList
}) => {
    const [delType, setDelType] = useState('')
    const [text, setText] = useState('')
    const [IsPositive, setIsPositive] = useState('')
    const [ID, setID] = useState('0')
    const [index, setIndex] = useState('');

    const closeHandle = () => {
        setDelType('')
        setText('')
        setIsPositive('0')
        setID('0')
        setIndex('');
        close()
    }
    
    useEffect(() => {
        if(data) {
            setDelType(data?.DeliveryType)
            setIndex(data?.index)
            setText(data?.OptionText)
            setIsPositive(data?.IsPositive);
            setID(data?.ID) 
        } else {
            setDelType('')
            setIndex(0)
            setText('')
            setIsPositive(positive)
            setID('0')
        }
    }, [data, positive])


    const onSave = () => {
        const body = {
            DeliveryType: delType,
            OptionText: text,
            ID: ID,
            IsPositive: IsPositive,
            index: index
        }
        
        if(data) {
            if(IsPositive == '0') {
                const r = negativeList;
                const rm = r.splice(index, 1, body);
                setNegativeList([...r])
            }
            if(IsPositive == '1') {
                const r = positiveList;
                const rm = r.splice(index, 1, body)
                setPositiveList([...r])
            }
        } else {
            if(IsPositive == '0') {
                setNegativeList(state => [...state, body])
            }
            if(IsPositive == '1') {
                setPositiveList(state => [...state, body])
            }
        }
        closeHandle()
    }

    const onDelete = () => {
        if(IsPositive == '0') {
            const r = negativeList;
            const rm = r.splice(index, 1)
            setNegativeList([...r])
        }
        if(IsPositive == '1') {
            const r = positiveList;
            const rm = r.splice(index, 1)
            setPositiveList([...r])
        }
        closeHandle()
    }


    const selectDelType = (value) => {
        switch(value) {
            case 'Доставка':
                setDelType('0')
                return;
            case 'Самовывоз':
                setDelType('1')
                return;
            case 'Доставка и самовывоз':
                setDelType('2')
                return;
            case 'Не указано':
                setDelType('3')
                return;
            default:
                setDelType('')
                return;
        }
    }


    const checkDelType = (value) => {
        switch(value) {
            case '0':
                return 'Доставка';
            case '1':
                return 'Самовывоз';
            case '2':
                return 'Доставка и самовывоз';
            case '3':
                return 'Не указано'
            default:
                return 'Не указано'
        }
    }

    return (
        <Modal width={500} className="Modal EditOpt" onCancel={closeHandle} open={visible}>
            <h2 className="Modal__head EditOpt__head">
                {
                    data ? 'Изменить опцию' : 'Добавить опцию'
                }
            </h2>
            <div className="Modal__form">
                <Row gutter={[0,25]}>
                    <Col span={24}>
                        <DropCollapse 
                            list={delList}
                            selectItem={selectDelType}
                            shadow={true}
                            value={checkDelType(delType)} 
                            beforeIcon 
                            justify={'justifyLeft'}/>
                    </Col>
                    <Col span={24}>
                        <Input
                            placeholder={'Текст опции'}
                            maskType={String}
                            shadow={true}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            styles={{width: '100%'}}
                            onClick={onSave}
                            text={'Сохранить'}
                            before={<SaveIcon size={15} color={'#fff'}/>}
                            />
                    </Col>
                    {
                        data ? (
                            <Col span={24}>
                                <Button
                                    styles={{width: '100%'}}
                                    onClick={onDelete}
                                    text={'Удалить опцию'}
                                    before={<BsTrash/>}
                                    variant={'danger'}
                                    />
                            </Col>
                        ) : null
                    }
                </Row>
            </div>
        </Modal>  
    )
}

export default EditOpt;