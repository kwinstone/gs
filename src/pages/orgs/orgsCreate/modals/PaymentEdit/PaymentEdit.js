import './PaymentEdit.scss';
import {message, Modal, Row, Col, Select } from 'antd';
import { useSelector } from 'react-redux';
import orgService from '../../../../../services/orgService';
import { useEffect, useState } from 'react';
import Button from '../../../../../components/Button/Button';
import SaveIcon from '../../../../../icons/SaveIcon/SaveIcon';
import paymethods from '../../components/paymethods';
import * as _ from 'lodash';
import { BsTrash } from 'react-icons/bs';
import Checkbox from '../../../../../components/Checkbox/Checkbox';


const service = new orgService();


const diff = (a, b) => {
    if(a.length > b.length) {
        return _.difference(a,b)
    } else {
        return _.difference(b,a)
    }
}



const PaymentEdit = ({
    onClose,
    visible,
    orgId,
    currentList,
    selected,
    setSelected,
    onEditPayment,
    onDeletePayment
}) => {
    const {token} = useSelector(s => s)
    const [list, setList] = useState([])
    const [pmList, setPmList] = useState([])
    const [value, setValue] = useState(null)


    const [selectedType, setSelectedType] = useState(null)
    const [selectedCms, setSelectedCms] = useState(null)
    const [IsNeedToChangeCash, setIsNeedToChangeCash] = useState('0');


    const closeHandle = () => {
        setSelected(null)
        onClose()
    }

    useEffect(() => {
        if(paymethods?.length > 0) {
            setPmList(paymethods.map(i => ({...i, label: i.value, value: i.PaymentType.toString()})));
        }
    }, [paymethods])

    useEffect(() => {
        if(selected) {
            setSelectedType(selected?.PaymentType?.toString())
            setSelectedCms(selected?.cmsID ? selected?.cmsID : null)
        }
    }, [selected])

    useEffect(() => {
        if(token && orgId) {
            
            service.getPayList(token, {OrganisationID: orgId}).then(res => {
                if(res?.length > 0) {
                    setList(res?.map(i => ({...i, label: i.name, value: i.id})))
                }
            })
        }
    }, [token, orgId])




    const onSave = () => {
        onEditPayment({
            cmsID: selectedCms ? selectedCms : '',
            PaymentType: selectedType,
            ID: selected?.ID,
            IsNeedToChangeCash: IsNeedToChangeCash,
            Disabled: '0'
        })
        closeHandle()
    }

    const onDelete = () => {
        onDeletePayment(selected?.ID)
        closeHandle()
    }


    return (
        <Modal
            className='Modal PaymentEdit'
            width={500}
            open={visible}
            onCancel={closeHandle}
            >
            <div className="Modal__head">
                Способы оплаты
            </div>
            <div className="Modal__body">
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Select
                            className='EditHr__select shadow'
                            showSearch
                            placeholder="CMS ID"
                            popupClassName='EditHr__list'
                            filterOption={(input, option) => 
                                (option?.Name ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={selectedCms}
                            options={list}
                            onSelect={e => setSelectedCms(e)}
                            />
                    </Col>
                    <Col span={24}>
                        <Select
                            className='EditHr__select shadow'
                            showSearch
                            placeholder="Способ оплаты"
                            popupClassName='EditHr__list'
                            filterOption={(input, option) => 
                                (option?.Name ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={pmList}
                            value={selectedType}
                            onSelect={e => {
                                if(currentList?.find(i => i.PaymentType.toString() == e)) {
                                    message.error('Данный тип оплаты уже выбран')
                                } else {
                                    setSelectedType(e)
                                }
                            }}
                            />
                    </Col>
                    {
                        selectedType == '0' ? (
                            <Col span={24}>
                                <Checkbox
                                    shadow
                                    id={'changeCash'}
                                    text="Нужна сдача"
                                    checked={IsNeedToChangeCash == '1'}
                                    onChange={e => e.target.checked ? setIsNeedToChangeCash('1') : setIsNeedToChangeCash('0')}
                                    />
                            </Col>
                        ) : null
                    }
                    <Col span={24}>
                        <Button
                            onClick={onSave}
                            text={'Сохранить'}
                            before={<SaveIcon color={'#fff'} size={20}/>}
                            styles={{width: '100%'}}
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            onClick={onDelete}
                            text="Удалить"
                            before={<BsTrash/>}
                            styles={{width: '100%'}}
                            variant={'danger'}
                            />
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}


export default PaymentEdit;


