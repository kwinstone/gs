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

const AddGift = ({visible, close, data, update, plateId}) => {
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
        if(data && plates?.length > 0) {
            console.log(data)
            setFind(plates.find(i => i.ID == data.gift_plate_id))
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
            // cs.editRec(token, {ID: data.ID, RecomendedPlateID: find.ID}).then(res => {
            //     update(res)
            // }).finally(() => {
            //     setSaveLoad(false)
            //     closeHandle()
            // })
            // cs.editPlateGift(token, {id: data.})
            cs.editPlateGift(token, {
                id: data?.id,
                plate_id: plateId,
                gift_plate_id: find.ID
            }).then(res => {
                update(res?.filter(i => i.disabled === '0'))
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            cs.addPlateGift(token, {
                plate_id: plateId,
                gift_plate_id: find.ID
            }).then(res => {
                update(res?.filter(i => i.disabled === '0'))
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deletePlateGift(token, data.id).then(res => {
            update(res?.filter(i => i.disabled === '0'))
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
                
                Подарок
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
                                    text={'Удалить подарок'}
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

export default AddGift;