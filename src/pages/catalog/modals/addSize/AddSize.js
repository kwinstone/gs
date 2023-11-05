
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';

import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import catService from '../../../../services/catService';
import { useSelector } from 'react-redux';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import InputSelect from '../../../../components/InputSelect/InputSelect';
const cs = new catService()

const AddSize = ({visible, close, data, update, plateId}) => {
    const {token} = useSelector(state => state)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [Name, setName] = useState('')
    const [plates, setPlates] = useState([])
    const [item,setItem] = useState(null)
    const [find, setFind] = useState(null)




    const closeHandle = () => {
        setItem(null)
        setFind(null)
        setName('')
        close()
    }

    useEffect(() => {
        if(token) {
            cs.getCatsNames(token, {elements: 'plates'}).then(res => {
                setPlates(res.map(i => {
                    return {
                        ...i,
                        value: i?.ID,
                        label: i.Name
                    }
                }))
            })
        }
    }, [token])

    useEffect(() => {
        if(data && plates?.length > 0) {
            setName(data?.Size)
            setFind(plates.find(i => i.ID == data.ItemID))
        }
    }, [data, plates])

    useEffect(() => {
        if(find) {
            setItem({
                option: find.ID,
                value: find.Name
            })
        }
    }, [find])



    const onSave = () => {
        setSaveLoad(true)
        if(data) {
            cs.editSize(token, {ID: data.ID, SizePlateID: find.ID, Name}).then(res => {
                update(res)
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            cs.addSize(token, {ItemID: plateId, SizePlateID: find.ID, Name}).then(res => {
                update(res)
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteSize(token, {ID: data.ID}).then(res => {
            update(res)
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }



    return (
        <Modal className='Modal' width={550} open={visible} onCancel={closeHandle}>
            <h3 className="Modal__head">
            {
                data ? (
                    'Редактировать '
                ) : 'Добавить '
            } 
            
            размер</h3>
                <div className="Modal__form">
                    <div className="Modal__form_row">
                        <Input
                            value={Name}
                            onChange={e => setName(e.target.value)}
                            shadow
                            maskType={String}
                            placeholder={'Название'}
                            />
                    </div>
                    <div className="Modal__form_row">
                        <InputSelect
                            value={item}
                            list={plates}
                            onSelect={(e) => {                            
                                setFind(plates?.find(i => i.ID == e.ID))
                            }}  
                            />
                    </div>
                    <div className="Modal__form_action">
                        <Button
                            load={saveLoad}
                            disabled={(find && Name) ? false : true}
                            onClick={onSave}
                            text={'Сохранить'}
                            before={<SaveIcon size={20} color={'#fff'}/>}/>
                        {
                            data ? (
                                <Button
                                    onClick={onDelete}
                                    load={delLoad}
                                    styles={{marginTop: 10}}
                                    variant={'danger'}
                                    text={'Удалить размер'}
                                    before={<BsTrash size={20}/>}
                                    />
                            ) : null
                        }
                    </div>
                </div>
            
        </Modal>
    )
    
}

export default AddSize;