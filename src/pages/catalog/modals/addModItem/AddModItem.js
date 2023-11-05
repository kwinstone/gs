import '../addMod/AddMod.scss';
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import PlUpload from '../../../../components/PlUpload/PlUpload';
import switchCrm from '../../../../funcs/switchCrm';
import getBase64 from '../../../../funcs/getBase64';



const AddModItem = ({visible, close, update, data, onDelete}) => {
    const {settings} = useSelector(s => s)
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState('')
    const [IIkoID, setIIkoID] = useState('')
    const [PictureUrl, setPictureUrl] = useState(null)
    

    useEffect(() => {
        if(data) {
            setName(data.Name)
            setPrice(data.Price)
            setIIkoID(data.IIkoID)
            setPictureUrl(data?.PictureUrl)
        }
    }, [data])

    const closeHandle = () => {
        setName('')
        setPrice('')
        setIIkoID('')
        setPictureUrl(null)
        
        close()
    }

    const onSave = () => {
        if(!data) {
            update(state => {
                return [
                    ...state,
                    {
                        IIkoID,
                        Name,
                        Price,
                        Image: PictureUrl === null ? '' : PictureUrl
                    }
                ]
            })
            closeHandle()
        } else {
            update(state => {
                
                // !! изменение
                delete data?.Image;
                // !! изменение
                
                let m = state;
                const rm = m.splice(data.index, 1, {
                    ...data,
                    IIkoID,
                    Name,
                    Price,
                    PictureUrl: PictureUrl === null ? '' : PictureUrl
                })
                return [...m]
                // if(state.find(item => item.ID == data.ID)) {
                //     let r = m.splice(state.findIndex(item => item.ID == data.ID), 1, {
                //         IIkoID,
                //         Name,
                //         Price
                //     })
    
                //     return m;
                // } else {
                //     return [
                //         ...state,
                //         {
                //             IIkoID,
                //             Name,
                //             Price
                //         }
                //     ]
                // }
                
            })
            closeHandle()
        }
    }

    const onPictureChange = (e) => {
        const file = e.target.files[0]
        getBase64(file).then(res => {
            setPictureUrl(res)
        })
    }
    
    return (
        <Modal className='Modal' width={650} open={visible} onCancel={closeHandle}>
            {
                data ? (
                    <h2 className="Modal__head">Редактировать модификатор</h2>
                ) : (
                    <h2 className="Modal__head">Добавить модификатор</h2>
                )
            }
            
            <div className="Modal__form">
                <div className="AddMod">
                    <div className="AddMod__body">
                        <div className="AddMod__body_list">
                            <div className="AddMod__body_item noshadow active">
                                <div className="AddMod__body_item_main">
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            {
                                                PictureUrl && typeof PictureUrl === 'string' ? (
                                                    <div className='AddMod__body_item_main_image'>
                                                        <button 
                                                            onClick={() => setPictureUrl(null)}
                                                            className={'AddMod__body_item_main_image_delete'}>
                                                            <BsTrash/>
                                                        </button>
                                                        <img src={PictureUrl} alt="" />
                                                    </div>
                                                ) : (
                                                    <PlUpload
                                                        id={'upload-mod-image'}
                                                        onChange={onPictureChange}
                                                        value={''}
                                                        shadow
                                                        text={'Загрузить картинку'}
                                                        style={{height: 250}}
                                                        />
                                                )
                                            }
                                            
                                        </Col>
                                        <Col span={24}>
                                            <Input
                                                shadow={true}
                                                value={Name}
                                                maskType={String}
                                                placeholder='Название'
                                                onChange={e => setName(e.target.value)}
                                                />
                                        </Col>
                                        <Col span={24}>
                                            {
                                                switchCrm(settings, 
                                                    <Input
                                                        maskType={String}
                                                        value={IIkoID}
                                                        onChange={e => setIIkoID(e.target.value)}
                                                        placeholder={'ID в Iiko'}
                                                        shadow={true}
                                                        /> ,
                                                    <Input
                                                        maskType={String}
                                                        value={IIkoID}
                                                        onChange={e => setIIkoID(e.target.value)}
                                                        placeholder={'ID в RKeeper'}
                                                        shadow={true}
                                                        />,
                                                    <Input
                                                        maskType={String}
                                                        value={IIkoID}
                                                        onChange={e => setIIkoID(e.target.value)}
                                                        placeholder={'ID в 1с'}
                                                        shadow={true}
                                                        />,
                                                        <Input
                                                        maskType={String}
                                                        value={IIkoID}
                                                        onChange={e => setIIkoID(e.target.value)}
                                                        placeholder={'ID в FrontPad'}
                                                        shadow={true}
                                                        />
                                                )
                                            }
                                        </Col>
                                        <Col span={24}>
                                            <Input
                                                shadow={true}
                                                value={Price}
                                                onChange={e => setPrice(e.target.value)}
                                                placeholder="Цена"
                                                />
                                        </Col>
                                    </Row>
                                </div>
                              
                            </div>
                            
                        </div>
                    </div>

                </div>
                <div className="Modal__form_action">
                    <Row gutter={[10,10]}>
                        <Col span={24}>
                            <Button
                            disabled={!Name || !Price} 
                            type={'button'} 
                            onClick={onSave}  
                            before={<SaveIcon color={'#fff'} size={20}/>} 
                            justify={'flex-start'} 
                            text={'Сохранить'}/>
                        </Col>
                        {
                            data ? (
                                <Col span={24}>
                                    <Button
                                    variant={'danger'}
                                    type={'button'} 
                                    onClick={() => onDelete(data?.index)}  
                                    before={<BsTrash color={'#fff'} size={20}/>} 
                                    justify={'flex-start'} 
                                    text={'Удалить'}/>
                                </Col>
                            ) : null
                        }
                    </Row>
                    
                    
                </div>
            </div>
        </Modal>
    )
}

export default AddModItem;