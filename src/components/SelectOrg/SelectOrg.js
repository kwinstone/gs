import './SelectOrg.scss';
import { Modal } from 'antd';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import SaveIcon from '../../icons/SaveIcon/SaveIcon';
import { useEffect, useState } from 'react';

const SelectOrg = ({
    visible,
    close,
    selected,
    setSelected,
    list,
}) => {

    const closeHandle = () => {
        close();
    }

    const [localSelected, setLocalSelected] = useState([])

    useEffect(() => {
        setLocalSelected(selected)
    }, [selected, visible])
    
    const onSave = () => {
        setSelected(localSelected)
        closeHandle()
    }




    return (
        <Modal 
            open={visible}
            onCancel={closeHandle}
            className='Modal SelectOrg'>

                <div className="SelectOrg__head Modal__head">
                    {
                        localSelected?.length == 0 ? (
                            'Выбрать организацию'
                        ) : `Выбрано организаций ${localSelected?.length}`
                    }
                </div>
                <div className="SelectOrg__body">
                    <div className='SelectOrg__body_item'>
                                <Checkbox
                                    // text={item?.value}
                                    text={'Все'}
                                    shadow
                                    checked={localSelected?.length === list?.length}
                                    onChange={e => {
                                        if(e.target?.checked) {
                                            setLocalSelected(list)
                                        } else {
                                            setLocalSelected([])
                                        }
                                    }}
                                    id={'All'}
                                    />
                    </div>
                    {
                        list?.map((item, index) => (
                            <div className="SelectOrg__body_item" key={item.ID}>
                               <Checkbox
                                    id={item.ID}
                                    checked={localSelected?.find(i => i.ID === item.ID) ? true : false}
                                    shadow={true}
                                    text={item.value}
                                    onChange={e => {
                                        if(item?.ID === 'All') {
                                            if(e.target.checked) {
                                                setLocalSelected([...list])
                                            } else {
                                                setLocalSelected([])
                                            }
                                        } else {
                                            if(localSelected?.find(i => i.ID === item.ID)) {
                                                setLocalSelected(state => {
                                                    return state.filter(f => f.ID != item.ID)
                                                })
                                            } else {
                                                setLocalSelected(state => {
                                                    return [
                                                        ...state,
                                                        item
                                                    ]
                                                }) 
                                            }
                                        }
                                        
                                    }}
                                    />
                            </div>
                            
                        ))
                    }
                </div>
                <div className="SelectOrg__action">
                    <Button
                        onClick={onSave}
                        text={'Сохранить'}
                        before={<SaveIcon size={16} color={'#fff'}/>}
                        />
                </div>
        </Modal>
    )
}

export default SelectOrg;
