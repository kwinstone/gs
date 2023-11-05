import './AddStorie.scss';

import {  message, Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useRef, useState } from 'react';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import PicItem from '../../components/PicItem/PicItem';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import stService from '../../../../services/stService';
import PlUpload from '../../../../components/PlUpload/PlUpload';
import delTypes from '../../../../funcs/delTypes';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import actionsOnBtn from '../../../../funcs/actionsOnBtn';
import ActionItemSelect from '../ActionItemSelect/ActionItemSelect';
import catService from '../../../../services/catService';
import { PulseLoader } from 'react-spinners';
import SelectOrg from '../../../../components/SelectOrg/SelectOrg';
import VideoThumbnail from 'react-video-thumbnail';
import getVideoThumbnail from '../../../../funcs/getVideoThumbnail';

const cs = new catService();
const st = new stService();


const AddStorie = ({
    visible, 
    close,  
    data,
    updateList,
    orgs,
}) => {
    const {token} = useSelector(state => state)
    const [fileValue, setFileValue] = useState(null)
    const [actionItem, setActionItem] = useState();
    const [actionItemModal, setActionItemModal] = useState(false)
    const [actionList, setActionList] = useState([]);

    const [ButtonAction, setButtonAction] = useState('')
    const [ItemOrder, setItemOrder] = useState('0')
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(['3'])
    const [ButtonActionItemID, setButtonActionItemID] = useState('')
    const [ButtonText, setButtonText] = useState('')
    const [ButtonTypeAction, setButtonTypeAction] = useState(0)
    const [Disabled, setDisabled] = useState('0')
    const [HideInOrg, setHideInOrg] = useState(false)
    const [HiddenInOrganisations, setHiddenInOrganisations] = useState('')
    const [HideInApp, setHideInApp] = useState('0')
    
    const [previewImage, setpreviewImage] = useState(null)
    const [prevImgUrl, setPrevImgUrl] = useState('');
    const [dataImgUrl, setDataImgUrl] = useState('')


    const [images, setImages] = useState([])
    const [imageLoad, setImageLoad] = useState(false);
    
    const [delLoad, setDelLoad] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    const [orgsList, setOrgsList] = useState([]);

    const [hideOrgModal, setHideOrgModal] = useState(false)
    const closeHideOrgModal = () => setHideOrgModal(false)
    const openHideOrgModal = () => setHideOrgModal(true)

    const closeHandle = () => {
        setActionItem(null)
        setActionList([])
        setItemOrder('0')
        setAllowedDeliveryTypes(['3'])
        setButtonText('')
        setButtonTypeAction(0)
        setDisabled('0')
        setHideInOrg(false)
        setHiddenInOrganisations('')
        setHideInApp('0')
        setImages([])
        setOrgsList([])
        setFileValue('')
        setpreviewImage(null)
        setPrevImgUrl('')
        setDataImgUrl('')
        setButtonAction('')
        close();
    }


    useEffect(() => {
        if(orgs?.length > 0) {
            if(data) {
                setButtonAction(data?.ButtonAction)
                setDataImgUrl(data?.PictureThumbnail)
                setItemOrder(data?.ItemOrder)
                setImages(data?.images)
                setAllowedDeliveryTypes([data?.AllowedDeliveryTypes.toString()])
                setButtonActionItemID(data?.ButtonActionItemID)
                setButtonText(data?.ButtonText)
                setButtonTypeAction(data?.ButtonTypeAction)
                setDisabled(data?.Disabled)
                if(data?.HiddenInOrganisations && data?.HiddenInOrganisations != '/') {
                    setHideInOrg(true)
                    let array = data.HiddenInOrganisations.split('//')
                    setOrgsList(array.map((item, index) => {
                        if(index == 0) {
                            return {
                                ID: item.replace(/\//g,''),
                                value: orgs.find(i => i.ID == item.replace(/\//g,''))?.value
                            }
                        }
                        if(index == array.length - 1) {
                            return {
                                ID: item.slice(0, -1),
                                value: orgs.find(i => i.ID == item.replace(/\//g,''))?.value
                            }
                        }
                        return {
                            ID: item,
                            value: orgs.find(i => i.ID == item)?.value
                        }
                    }))
                } else {
                    setHideInOrg(false)
                    setOrgsList([])
                }
                setHideInApp(data?.HideInApp)
            } else {
                setImages([])
                // setAllowedDeliveryTypes(['0'])
                setButtonActionItemID('0')
                setButtonText('')
                setButtonTypeAction(0)
                setDisabled('0')
                setHiddenInOrganisations('')
                setHideInApp('')
            }
        }
        
    }, [data, orgs])


    useEffect(() => {
        if(ButtonActionItemID) {
            setActionItem(actionList?.find(item => item.ID == ButtonActionItemID))
        } else {
            setActionItem(null)
        }
    }, [actionList, ButtonActionItemID])


    const deleteImage = (id = 0, index) => {
        
        if(data) {
            if(images?.length > 1) {
                setImageLoad(true)
                st.deleteStorieImage(token, id).then(res => {
                    if(!res.error) {
                        const m = images;
                        const rm = m.splice(m.findIndex(item => item.ID == id), 1)
                        setImages([...m])
                        updateList();
                    }
                }).finally(_ => setImageLoad(false))
            }
           

        } else {
            const m = images;
            const rm = m.splice(index, 1)
            setImages([...m])
        }
    }   

    const uploadImages = (e) => {
        if(data) {
            setImageLoad(true)
            const files = [...e.target.files];
            const body = new FormData();
            body.append('ID', data?.ID)
            files.forEach((i, index) => {
                body.append(`image_${index}`, i)
            })
            
            st.addStorieImage(token, body).then(res => {
                console.log(res)
                if(res) {
                    setImages(res)
                    updateList();
                }
            }).finally(_ => setImageLoad(false))
        } else {
            Promise.all([...e.target.files].map(async item => {
                if(item.type === 'video/mp4') {
                    const blob = await getVideoThumbnail(item, 1.5);
                    return {
                        PictureThumbnail: URL.createObjectURL(blob),
                        file: item  
                    }
                } else {
                    return {
                        PictureThumbnail: URL.createObjectURL(item),
                        file: item
                    }
                }
            })).then(res => {
                setImages(s => [...s, ...res])
            })
        }
    }



    const addStorie = () => {
        setSaveLoad(true)
        const body = new FormData();
        // body.append('ItemOrder', ItemOrder)
        if(orgsList.length > 0) {
            body.append('HiddenInOrganisations', orgsList.map(item => `/${item.ID}`).join('/') + '/')
        } else {
            body.append('HiddenInOrganisations', '')
        }

        if(images.length > 0) {
            images.forEach((item, index) => {
                body.append(`image_${index}`, item.file)
            })
        }
        body.append('ButtonAction', ButtonAction !== undefined ? ButtonAction : '')
        body.append('AllowedDeliveryTypes', AllowedDeliveryTypes.join(''))
        body.append('ButtonText', ButtonText)
        body.append('ButtonTypeAction', ButtonTypeAction.toString())
        body.append('ButtonActionItemID', ButtonActionItemID)
        body.append('Disabled', Disabled)
        body.append('HideInApp', HideInApp)
        if(previewImage) {
            body.append('previewImage', previewImage)
        }  


        st.addStories(token, body).then(res => {
        
        }).finally(_ => {
            setSaveLoad(false)
            closeHandle()
            updateList();
        })
    }



    const editStories = () => {
        setSaveLoad(true)
        const body = new FormData();
        body.append('ID', data?.ID);
        // body.append('ItemOrder', ItemOrder)
        if(orgsList.length > 0) {
            body.append('HiddenInOrganisations', orgsList.map(item => `/${item.ID}`).join('/') + '/')
        } else {
            body.append('HiddenInOrganisations', '')
        }
        body.append('AllowedDeliveryTypes', AllowedDeliveryTypes.join(''))
        body.append('ButtonText', ButtonText)
        body.append('ButtonTypeAction', ButtonTypeAction.toString())
        body.append('ButtonActionItemID', ButtonActionItemID)
        body.append('Disabled', Disabled)
        body.append('HideInApp', HideInApp)
        body.append('ButtonAction', ButtonAction !== undefined ? ButtonAction : '')
        if(!dataImgUrl) {
            if(previewImage) {
                body.append('previewImage', previewImage)
            } else {
                body.append('previewImage', "")   
            }
        }   
        

        st.editStories(token, body).then(res => {
            //вывод ответа
        }).finally(_ => {
            closeHandle()
            updateList()
            setSaveLoad(false)
        })
    }

    const deleteStories = () => {
        setDelLoad(true)
        st.deleteStories(token, data?.ID).then(res => {
            if(!res.error) {
                closeHandle();
                updateList();
            } else {
                message.error('Произошла ошибка')
            }
            setDelLoad(false)
        })
    }


    

    const selectBtnAction = (value,index,ID) => {
        setButtonActionItemID(0)
        setButtonTypeAction(ID)
    }

    const openActionModal = () => setActionItemModal(true)
    const closeActionModal = () => setActionItemModal(false)



    useEffect(() => {
        if(token) {
            if(ButtonTypeAction == 1) {
                cs.getCats(token).then(res => {
                    setActionList(res?.filter(item => item.Disabled == '0'))
                })
            }
            if(ButtonTypeAction == 2) {
                cs.getProds(token).then(res => {
                    setActionList(res.filter(item => item.IsSubCategory == '1' && item.Disabled == '0'))
                })
            }
            if(ButtonTypeAction == 3) {
                cs.getProds(token).then(res => {
                    setActionList(res.filter(item => item.IsSubCategory == '0' && item.Disabled == '0'))
                })
            }
        }
        
        
    }, [ButtonTypeAction, token])


    const onPrevChange = (e) => {
        setpreviewImage(e.target.files[0])
        setPrevImgUrl(URL.createObjectURL(e.target.files[0]))
        setDataImgUrl(null)
    }

    const deletePrevImg = () => {
        setDataImgUrl(null)
        setPrevImgUrl(null)
        setpreviewImage('')
    }


    return (
        <Modal className="Modal AddStorie" open={visible} width={1000} onCancel={closeHandle}>
            <SelectOrg
                list={orgs}
                selected={orgsList}
                visible={hideOrgModal}
                close={closeHideOrgModal}
                setSelected={setOrgsList}
                />
            <ActionItemSelect
                close={closeActionModal}
                visible={actionItemModal}
                actionType={ButtonTypeAction}
                setButtonActionItemID={setButtonActionItemID}
                actionItem={actionItem}
                list={actionList}
                />
            <h2 className="Modal__head">
                {
                    data ? 'Редактировать сториз' : 'Добавить сториз'
                }
            </h2>
            <div>
            
            </div>
            <div className="Modal__form">
                <Row gutter={[30, 0]}>
                    <Col span={12}>
                        <Row className="row-custom">
                            <div className="panel shadow AddStorie__images" style={{display: 'flex', overflowX: 'auto'}}>
                                <div className={"AddStorie__images_loader" + (imageLoad ? ' active ' : '')}>
                                    <PulseLoader color={"var(--violet)"}/>
                                </div>
                                {
                                    images?.length > 0 ? (
                                        images.map((item, index ) => {
                                            const format = item?.Picture?.slice(item?.Picture?.lastIndexOf('.') + 1, item?.Picture?.length) 

                                            

                                            if(format === 'mp4') {
                                                
                                                return (
                                                    <PicItem 
                                                        key={index}
                                                        onDelete={deleteImage}
                                                        {...item}
                                                        isVideo
                                                        index={index}
                                                        PictureThumbnail={item?.Picture}
                                                        style={{marginRight: 20}}/>
                                                )
                                            } 
                                            if(format === 'gif') {
                                                return (
                                                    <PicItem 
                                                        key={index}
                                                        onDelete={deleteImage}
                                                        {...item}
                                                        index={index}
                                                        PictureThumbnail={item?.Picture}
                                                        style={{marginRight: 20}}/>
                                                )
                                            }
                                            return (
                                                <PicItem 
                                                    key={index}
                                                    onDelete={deleteImage}
                                                    {...item}
                                                    index={index}
                                                    PictureThumbnail={item?.PictureThumbnail}
                                                    style={{marginRight: 20}}/>
                                            )
                                            
                                        })
                                    ) : null
                                }
                                <PlUpload
                                    
                                    value={''}
                                    onChange={uploadImages}
                                    multiple={true}
                                    id={'storieImageUpload'}
                                    accept={'.jpg, .jpeg, .png, .gif, .mp4'}
                                    style={{height: 200, width: 150, backgroundColor: '#F8F8F8', flex: '0 0 auto'}} 
                                    text={'Добавить картинку или видео сториза'}/>
                                
                            </div>
                        </Row>
                        <Row className="row-custom">
                            <Checkbox
                                checked={AllowedDeliveryTypes?.find(item => item == delTypes.onlyDelivery.toString() || item == '2') }
                                onChange={(e) => {
                                    if(e.target.checked) {
                                        if(AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString())) {
                                            setAllowedDeliveryTypes(['2'])
                                        } else{
                                            setAllowedDeliveryTypes(['0'])
                                        }
                                    } else {
                                        if(AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString() || item == '2')) {
                                            setAllowedDeliveryTypes(['1'])
                                        } else{
                                            setAllowedDeliveryTypes(['3'])
                                        }
                                    }
                                }}
                                shadow={true} 
                                text={'Показывать для доставки'} 
                                id={'deliveryTrueg'}/>
                        </Row>
                        <Row className="row-custom">
                            <Checkbox
                                checked={AllowedDeliveryTypes?.find(item => item == delTypes.onlyLocal.toString() || item == '2') } 
                                onChange={(e) => {
                                    if(e.target.checked) {
                                        if(AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString())) {
                                            setAllowedDeliveryTypes(['2'])
                                        } else {
                                            setAllowedDeliveryTypes(['1'])
                                        }
                                    } else {
                                        if(AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString() || item == '2')) {
                                            setAllowedDeliveryTypes(['0'])
                                        } else {
                                            setAllowedDeliveryTypes(['3'])
                                        }
                                    }
                                }}
                                shadow={true} 
                                text={'Показывать для самовывоза'} 
                                id={'onlyLocalg'}/>
                        </Row>
                        <Row className='row-custom'>
                            <Checkbox
                                shadow={true}
                                text={'Скрыть в приложении'}
                                id={'HideInApp'}
                                onChange={e => e.target.checked ? setHideInApp('1') : setHideInApp('0')}
                                checked={HideInApp == '1'}
                                />
                        </Row>
                        <Row className="row-custom">
                            <Checkbox 
                                checked={HideInOrg}
                                onChange={e => {
                                    if(e.target.checked) {
                                        setHideInOrg(true)
                                    } else {
                                        setHideInOrg(false)
                                        setOrgsList([])
                                    }
                                }}
                                shadow={true}
                                text={'Скрыть в организациях'} 
                                id={'rrr'}/>
                        </Row>
                        {
                            HideInOrg ? (
                                <>
                                    {
                                        orgsList?.length == 0 ? (
                                            <Row className="row-custom">
                                                <Pl onClick={openHideOrgModal} shadow={true} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                            </Row>
                                        ) : (
                                            <Row className="row-custom">
                                                <Pl onClick={openHideOrgModal} shadow={true} text={`Выбрано организаций ${orgsList?.length}`} style={{backgroundColor: '#fff', color: 'var(--violet)'}}/>
                                            </Row>
                                        )
                                    }   
                                </>
                            ) : null
                        }
                        <Row gutter={[10,10]} className="row-custom">
                            <Col span={24}>
                                <Button
                                    disabled={images.length == 0}
                                    onClick={() => {
                                        if(data) {
                                            editStories();
                                        } else {
                                            addStorie();
                                        }
                                    }}
                                    load={saveLoad}
                                    styles={{width: '100%'}}
                                    text={'Сохранить'}
                                    before={<SaveIcon size={20} color={'#fff'}/>}/>
                            </Col>
                            {
                                data ? (
                                    <Col span={24}>
                                        <Button
                                            load={delLoad}
                                            onClick={deleteStories} 
                                            styles={{width: '100%'}} 
                                            variant={'danger'} 
                                            text={'Удалить сториз'} 
                                            before={<BsTrash size={20}/>}/>
                                    </Col>
                                ) : null
                            }
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className='row-custom'>
                            <div className='AddStorie__pim'>
                                {
                                    dataImgUrl || prevImgUrl ? (
                                        <div className='AddStorie__pim_img'>
                                            <img src={prevImgUrl ? prevImgUrl : dataImgUrl} alt=""/>
                                            <div className="AddStorie__pim_action">
                                            <Button
                                                variant={'danger'}
                                                text="Удалить"
                                                styles={{padding: 8, width: '100%'}}
                                                justify={'center'}
                                                onClick={deletePrevImg}
                                                />
                                            </div>
                                            
                                        </div>
                                    ) : (
                                        <PlUpload
                                            text={'Превью сториза'}
                                            shadow
                                            style={{
                                                width: 154,
                                                height: 170
                                            }}
                                            id={'prevImage'}
                                            accept={'.png, .jpg, .jpeg'}
                                            onChange={onPrevChange}
                                            />
                                    )
                                }
                            </div>     
                        </Row>
                        <Row className='row-custom' style={{marginBottom: 0}}>
                            <h3 className="panel-label">Действие при нажатии на кнопку</h3>
                        </Row>
                        <Row className="row-custom">
                            <DropCollapse 
                                selectItem={selectBtnAction} 
                                justify={'justifyLeft'} 
                                shadow={true}  
                                beforeIcon
                                list={actionsOnBtn} 
                                value={actionsOnBtn.find(item => Number(item.ID) == Number(ButtonTypeAction)).value}/>
                        </Row>
                        {
                            ButtonTypeAction != 0 ? (
                                <>
                                    <Row className="row-custom">
                                        {
                                            ButtonActionItemID && actionItem ? (
                                                ButtonTypeAction === 4 ? (
                                                    <Input
                                                        shadow
                                                        value={ButtonAction}
                                                        onChange={e => setButtonAction(e.target.value)}
                                                        placeholder={'Ссылка'}
                                                        maskType={String}
                                                        />
                                                ) : (
                                                    <Pl 
                                                    onClick={openActionModal}
                                                    shadow={true}  
                                                    text={actionItem?.Name} 
                                                    style={{justifyContent: 'flex-start', color: '#7B99FF', backgroundColor: '#fff'}}/>
                                                )
                                            ) : (
                                                ButtonTypeAction === 4 ? (
                                                    <Input
                                                        shadow
                                                        value={ButtonAction}
                                                        onChange={e => setButtonAction(e.target.value)}
                                                        placeholder={'Ссылка'}
                                                        maskType={String}
                                                        />
                                                ) : (
                                                    <Pl 
                                                onClick={openActionModal}
                                                shadow={true}  
                                                text={actionsOnBtn.find(item => item.ID == ButtonTypeAction).pl} 
                                                style={{justifyContent: 'flex-start', color: '#7B99FF', backgroundColor: '#fff'}}/>
                                                )
                                            )
                                        }

                                    </Row>
                                    <Row className='row-custom'>
                                        <Input
                                            value={ButtonText}
                                            onChange={e => setButtonText(e.target.value)}
                                            maskType={String} 
                                            shadow 
                                            placeholder={'Текст на кнопке'}/>
                                    </Row>
                                    
                                </>
                            ) : null
                        }
                    </Col>
                </Row>
            </div>

        </Modal>
    )
}

export default AddStorie;