
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';


const cs = new catService()

const AddAlrgn = ({visible, close, data, update, plateId}) => {
    const {token} = useSelector(state => state);
    const [Name, setName] = useState('')
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    
    // const [plates, setPlates] = useState([])
    // const [item,setItem] = useState(null)
    // const [find, setFind] = useState(null)


    // useEffect(() => {
    //     if(token) {
    //         cs.getCatsNames(token, {elements: 'plates'}).then(res => {
    //             setPlates(res.map(i => {
    //                 return {
    //                     ...i,
    //                     value: i?.ID,
    //                     label: i.Name
    //                 }
    //             }))
    //         })
    //     }
    // }, [token])

    
    useEffect(() => {
        if(data) {
            setName(data?.Name)
        }
    }, [data])

    // useEffect(() => {
    //     if(data && plates?.length > 0) {
    //         setFind(plates.find(i => i.ID == data.PlateID))
    //     }
    // }, [data, plates])

    // useEffect(() => {
    //     if(find) {
    //         setItem({
    //             option: find.ID,
    //             value: find.Name
    //         })
    //     }
    // }, [find])



    const closeHandle = () => {
        setName('')
        close()
    }

    const onSave = () => {
        setSaveLoad(true)
        if(data) {
            cs.editAllergens(token, {ID: data.ID, Name: Name}).then(res => {
                update(res)
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            cs.addAllergens(token, {ItemID: plateId, Name: Name}).then(res => {
                update(res)
            }).finally(() => {
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteAllergens(token, {ID: data.ID}).then(res => {
            update(res)
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal className='Modal' open={visible} onCancel={closeHandle} width={600}>
            <h2 className="Modal__head">Добавить аллерген</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        maskType={String}
                        shadow={true}
                        value={Name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder={'Название аллергена'}/>
                    {/* <InputSelect
                        value={item}
                        list={plates}
                        onSelect={(e) => {                            
                            setFind(plates?.find(i => i.ID == e.ID))
                            // setItem(e)
                        }}
                        /> */}
                </div>
                <div className="Modal__form_action">
                    <Button
                        onClick={onSave}
                        disabled={!Name}
                        load={saveLoad} 
                        before={<BsTrash/>} 
                        text={'Сохранить'} 
                        justify={'flex-start'}/>
                    {
                        data ? (
                            <Button
                                styles={{marginTop: 10}}
                                onClick={onDelete}
                                load={delLoad} 
                                variant={'danger'}
                                before={<BsTrash size={20}/>} 
                                text={'Удалить аллерген'} 
                                justify={'flex-start'}/>
                        ) : null
                    }
                </div>
            </div>
        </Modal>
    )
}

export default AddAlrgn;