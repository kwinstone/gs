import '../addMod/AddMod.scss';
import {Col, Modal, Row, Tabs} from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import PlUpload from '../../../../components/PlUpload/PlUpload';
import switchCrm from '../../../../funcs/switchCrm';
import getBase64 from '../../../../funcs/getBase64';
import {checkIsBao} from "../../../../utils/checkIsBao";


const AddModItem = ({visible, close, update, data, onDelete}) => {
    const {settings} = useSelector(s => s)

    const [Name, setName] = useState('')
    const [NameEn, setNameEn] = useState('')
    const [NameKz, setNameKz] = useState('')

    const [Price, setPrice] = useState('')
    const [IIkoID, setIIkoID] = useState('')
    const [PictureUrl, setPictureUrl] = useState(null)
    

    useEffect(() => {
        if(data) {
            setName(data.Name)
            setNameEn(data?.Name_en)
            setNameKz(data?.Name_kz)

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
                        Name_kz: NameKz,
                        Name_en: NameEn,
                        Price,
                        Image: PictureUrl === null ? '' : PictureUrl
                    }
                ]
            })
            closeHandle()
        } else {
            update(state => {
                return state.map((el, i) => {
                    if (i !== data.index) return el;

                    return {
                        ...el,
                        IIkoID,
                        Name,
                        Name_kz: NameKz,
                        Name_en: NameEn,
                        Price,
                        Image: PictureUrl === null ? '' : PictureUrl
                    }
                })
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

    const nameTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                shadow={true}
                value={Name}
                maskType={String}
                placeholder='Название'
                onChange={e => setName(e.target.value)}
            />,
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                shadow={true}
                value={NameKz}
                maskType={String}
                placeholder='Название на казахском языке'
                onChange={e => setNameKz(e.target.value)}
            />,
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                shadow={true}
                value={NameEn}
                maskType={String}
                placeholder='Название на английском языке'
                onChange={e => setNameEn(e.target.value)}
            />,
        },
    ];
    
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
                                            {
                                                checkIsBao() ? (
                                                    <Tabs defaultActiveKey="1" items={nameTabs} onChange={() => {}} style={{ width: '100%'}} />
                                                ) : nameTabs[0].children
                                            }
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