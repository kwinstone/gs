import './AddRec.scss';
import { Modal } from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import catService from '../../../../services/catService';
import { useSelector } from 'react-redux';

import Loader from '../../../../components/Loader/Loader';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import InputSelect from '../../../../components/InputSelect/InputSelect';
const cs = new catService()

const AddRec = ({visible, close, data, update, plateId}) => {
    const {token} = useSelector(state => state)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [pageLoad, setPageLoad] = useState(false)


    const [plates, setPlates] = useState([])
    const [item,setItem] = useState(null)
    const [find, setFind] = useState(null)


    const closeHandle = () => {
        setItem(null)
        setFind(null)
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
        if(data) {
            
        }
    }, [data])

    useEffect(() => {
        if(data && plates?.length > 0) {
            setFind(plates.find(i => i.ID == data.PlateID))
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
            cs.editRec(token, {ID: data.ID, RecomendedPlateID: find.ID}).then(res => {
                update(res)
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            cs.addRec(token, {ItemID: plateId, RecomendedPlateID: find.ID}).then(res => {
                update(res)
                console.log(res)
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteRec(token, {ID: data.ID}).then(res => {
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
                
                рекомендованное блюдо
            </h3>
            {
                pageLoad ? (
                    <Loader/>
                ) : (
                <div className="Modal__form">
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
                            disabled={!find}
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
                                    text={'Удалить блюдо'}
                                    before={<BsTrash size={20}/>}
                                    />
                            ) : null
                        }
                    </div>
                </div>
                )
            }
            
        </Modal>
    )
    
}

export default AddRec;