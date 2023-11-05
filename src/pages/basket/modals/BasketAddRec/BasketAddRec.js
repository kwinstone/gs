import {  Modal } from 'antd';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import InputSelect from '../../../../components/InputSelect/InputSelect';
import catService from '../../../../services/catService';
import { useSelector } from 'react-redux';


const cs = new catService()


const BasketAddRec = ({
    visible, 
    close,
    data,
    list,
    setList,
    selectList
}) => {
    const {token} = useSelector(s => s)
    const [plates, setPlates] = useState([])
    const [item, setItem] = useState(null)
    const [find, setFind] = useState(null)

    useEffect(() => {
        cs.getProds(token).then(res => {
            setPlates(res?.filter(i => i.IsSubCategory == '0'))
        })
    }, [token])


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

    

    const handleClose = () => {
        setItem(null)
        setFind(null)
        close();
    }


    const onSave = (item) => {
        console.log(item)
        if(data) { 
            setList(s => {
                const m = s;
                const rm = m?.splice(m.findIndex(i => i.ID == data.ID), 1, {ID: data.ID, IIkoID: data.IIkoID, Name: item.Name, PlateID: item.ID})
                return [...m]
            })
        } else {
            setList(state => [...state, {ID: 0, IIkoID: '', Name: item.Name, PlateID: item.ID}])
        }
        handleClose();
    }

    const onDelete = (item) => {
        setList(s => {            
            const m = s;
            const rm = m?.splice(m.findIndex(i => i.ID == item.ID), 1)
            return [...m]
        })
        handleClose();
    }
   
    

    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">
                {
                    data ? 'Редактировать рекомендованное блюдо' : 'Добавить рекомендованное блюдо'
                }
            </h2>
            <form className="Modal__form">
                <div className='Modal__form_row'>
                    <InputSelect
                        value={item}
                        onSelect={(e) => {                            
                            setFind(plates?.find(i => i.ID == e.ID))
                            // setItem(e)
                        }}
                        defaultValue={item}
                        list={selectList}
                        />
                </div>
                <div className="Modal__form_action">
                    <Row gutter={[15,15]}>
                        <Col span={24}>
                            <Button 
                            onClick={() => onSave(find)}
                            disabled={!item}
                            type={'button'} 
                            before={<SaveIcon color={'#fff'} size={16}/>} 
                            justify={'flex-start'} 
                            text={'Сохранить'}/>
                        </Col>
                        {
                            data ? (
                                <Col span={24}>
                                    <Button 
                                        onClick={() => onDelete(find)}
                                        variant={'danger'}
                                        type={'button'} 
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

export default BasketAddRec;