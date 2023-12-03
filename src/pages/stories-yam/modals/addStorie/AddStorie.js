import styles from './AddStorie.module.scss';

import { message, Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import { Row, Col } from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import stService from '../../../../services/stService';
import PlUpload from '../../../../components/PlUpload/PlUpload';
import delTypes from '../../../../funcs/delTypes';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import actionsOnBtn from '../../../../funcs/actionsOnBtn';
import ActionItemSelect from '../ActionItemSelect/ActionItemSelect';
import catService from '../../../../services/catService';
import SelectOrg from '../../../../components/SelectOrg/SelectOrg';
// import VideoThumbnail from 'react-video-thumbnail';
// import getVideoThumbnail from '../../../../funcs/getVideoThumbnail';
import getClassNames from '../../../../funcs/getClassNames';
import StorieCard from './components/StorieCard/StorieCard';
import StorieModal from '../StorieModal/StorieModal';
// import getFileFromUrl from '../../../../funcs/getFileFromUrl';
import SelectCategoryModal from '../../../../modals/SelectCategoryModal/SelectCategoryModal';
import Text from '../../../../components/Text/Text';
import getBase64 from '../../../../funcs/getBase64';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Title } from "chart.js";
import {AddLastFrameModal} from "../AddLastFrameModal/AddLastFrameModal";


const cs = new catService();
const st = new stService();

const AddStorie = ({
    visible,
    close,
    data,
    updateList,
    orgs,
}) => {
    const { token } = useSelector(state => state)
    const [actionItem, setActionItem] = useState();
    const [actionItemModal, setActionItemModal] = useState(false)
    const [actionList, setActionList] = useState([]);

    //fetchdata
    const [ID, setID] = useState()
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(['3'])
    const [ButtonAction, setButtonAction] = useState('')
    const [ButtonActionItemID, setButtonActionItemID] = useState('0')
    const [ButtonText, setButtonText] = useState('')
    const [ButtonTypeAction, setButtonTypeAction] = useState(0)
    const [CategoryList, setCategoryList] = useState([])
    const [Disabled, setDisabled] = useState('0')
    const [HiddenInOrganisations, setHiddenInOrganisations] = useState('')
    const [HideInApp, setHideInApp] = useState('0')
    const [ItemOrder, setItemOrder] = useState('0')
    const [PictureThumbnail, setPictureThumbnail] = useState()
    const [TextBundle, setTextBundle] = useState('')
    const [TitleTextBundle, setTitleTextBundle] = useState('')
    const [NamePreview, setNamePreview] = useState('')
    const [images, setImages] = useState([])


    //adjacent vars
    const [HideInOrg, setHideInOrg] = useState(false)

    const [delLoad, setDelLoad] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [prevUploadLoad, setPrevUploadLoad] = useState(false)

    const [orgsList, setOrgsList] = useState([]);
    const [catsList, setCatsList] = useState([])

    //modals
    const [hideOrgModal, setHideOrgModal] = useState(false)
    const [storieModal, setStorieModal] = useState(false)
    const [catsModal, setCatsModal] = useState(false)
    const [lastFrameModal, setLastFrameModal] = useState(false)
    const [lastFrameUrl, setLastFrameUrl] = useState('')

    // STORIE Data
    const [storieData, setStorieData] = useState(null)

    useEffect(() => {
        if (token) {
            cs.getCats(token).then(res => {

                setCatsList(res)
            })
        }
    }, [token])


    const closeHandle = () => {
        //main data
        setID(undefined)
        setAllowedDeliveryTypes(['3'])
        setButtonAction('')
        setButtonActionItemID('0')
        setButtonText('')
        setButtonTypeAction(0)
        setCategoryList([])
        setDisabled('0')
        setHiddenInOrganisations('')
        setHideInApp('0')
        setItemOrder('0')
        setPictureThumbnail(undefined)
        setTextBundle('')
        setTitleTextBundle('')
        setNamePreview('')
        setImages([])
        setHideInOrg(false)

        //adjacent data
        setOrgsList([])
        setActionItem(null)
        setActionList([])
        close();
    }

    useEffect(() => {
        if (orgs?.length > 0) {
            if (data) {
                setID(data?.ID)
                setAllowedDeliveryTypes([data?.AllowedDeliveryTypes.toString()])
                setButtonAction(data?.ButtonAction)
                setButtonActionItemID(data?.ButtonActionItemID)
                setButtonText(data?.ButtonText)
                setButtonTypeAction(data?.ButtonTypeAction)
                setCategoryList(data?.CategoryList ? data?.CategoryList?.split(',') : [])
                setDisabled(data?.Disabled)
                setLastFrameUrl(data?.LastFrame)
                if (data?.HiddenInOrganisations && data?.HiddenInOrganisations != '/') {
                    setHideInOrg(true)
                    let array = data.HiddenInOrganisations.split('//')
                    setOrgsList(array.map((item, index) => {
                        if (index == 0) {
                            return {
                                ID: item.replace(/\//g, ''),
                                value: orgs.find(i => i.ID == item.replace(/\//g, ''))?.value
                            }
                        }
                        if (index == array.length - 1) {
                            return {
                                ID: item.slice(0, -1),
                                value: orgs.find(i => i.ID == item.replace(/\//g, ''))?.value
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
                setItemOrder(data?.ItemOrder)
                setPictureThumbnail(data?.PictureThumbnail)
                setTextBundle(data?.TextBundle)
                setTitleTextBundle(data?.TitleTextBundle ?? '')
                setNamePreview(data?.NamePreview ?? '')
                setImages(data?.images?.map(i => {
                    const { Options, ...rest } = i
                    return {
                        ...rest,
                        ...JSON.parse(Options)
                    }
                }))
            }
            // else {
            //     setImages([])
            //     setButtonActionItemID('0')
            //     setButtonText('')
            //     setButtonTypeAction(0)
            //     setDisabled('0')
            //     setHiddenInOrganisations('')
            //     setHideInApp('')
            // }
        }
    }, [data, orgs])

    useEffect(() => {
        if (ButtonActionItemID) {
            setActionItem(actionList?.find(item => item.ID == ButtonActionItemID))
        } else {
            setActionItem(null)
        }
    }, [actionList, ButtonActionItemID])

    const deleteStories = () => {
        setDelLoad(true)
        st.deleteStories(token, data?.ID).then(res => {
            if (!res.error) {
                closeHandle();
                updateList();
            } else {
                message.error('Произошла ошибка')
            }
            setDelLoad(false)
        })
    }

    const selectBtnAction = (value, index, ID) => {
        setButtonActionItemID(0)
        setButtonTypeAction(ID)
    }

    useEffect(() => {
        if (token) {
            if (ButtonTypeAction == 1) {
                cs.getCats(token).then(res => {
                    setActionList(res?.filter(item => item.Disabled == '0'))
                })
            }
            if (ButtonTypeAction == 2) {
                cs.getProds(token).then(res => {
                    setActionList(res.filter(item => item.IsSubCategory == '1' && item.Disabled == '0'))
                })
            }
            if (ButtonTypeAction == 3) {
                cs.getProds(token).then(res => {
                    setActionList(res.filter(item => item.IsSubCategory == '0' && item.Disabled == '0'))
                })
            }
        }


    }, [ButtonTypeAction, token])

    const onEditStorie = (data) => {
        setStorieData(data)
        setStorieModal(true)
    }

    const onDeleteStorie = (index) => {
        if (data) {
            st.deleteStorieImage(token, images[index]?.ID).then(res => {
                if (res?.error == 0) {
                    message.success('Стори удален')
                    setImages(s => s.filter((_, itemIndex) => itemIndex !== index))
                }
            })
        } else {
            setImages(s => s.filter((_, itemIndex) => itemIndex !== index))
        }
    }

    const onSaveStorie = (data, itemIndex) => {
        if (storieData) {
            setImages(s => {
                return s.map((i, index) => {
                    if (index === itemIndex) {
                        return {
                            ...i,
                            ...data
                        }
                    } else {
                        return i
                    }
                })
            })
        } else {
            setImages(s => [...s, data])
        }
    }

    const onPrevUpload = (e) => {
        setPrevUploadLoad(true)
        const file = e.target.files[0]
        getBase64(file).then(res => {
            setPictureThumbnail(res)
        }).finally(() => setPrevUploadLoad(false))
    }

    const onSave = () => {
        const body = new FormData()

        if (data) {
            setSaveLoad(true)
            body.append('ID', ID)
            body.append('AllowedDeliveryTypes', AllowedDeliveryTypes.join(''))
            body.append('ButtonAction', ButtonAction !== undefined ? ButtonAction : '')
            body.append('ButtonActionItemID', ButtonActionItemID)
            body.append('ButtonText', ButtonText)
            body.append('ButtonTypeAction', ButtonTypeAction.toString())
            body.append('CategoryList', CategoryList?.join(','))
            body.append('Disabled', Disabled)
            if (orgsList.length > 0) {
                body.append('HiddenInOrganisations', orgsList.map(item => `/${item.ID}`).join('/') + '/')
            } else {
                body.append('HiddenInOrganisations', '')
            }
            body.append('HideInApp', HideInApp)
            body.append('ItemOrder', ItemOrder)
            body.append('LastFrame', lastFrameUrl)

            if (PictureThumbnail) {
                body.append('ThumbnailPicture', PictureThumbnail)
            }
            body.append('TextBundle', TextBundle)
            body.append('TitleTextBundle', TitleTextBundle)
            body.append('NamePreview', NamePreview)

            const imagesArray = images
                // ?.filter(f => !f?.Picture?.includes('http'))
                ?.map((item, itemIndex) => {
                    const { index, ...nonIndexData } = item
                    if (item?.ID) {
                        return {
                            ID: nonIndexData?.ID,
                            ItemOrder: nonIndexData?.ItemOrder,
                            BundleID: nonIndexData?.BundleID,
                            Picture: item?.Picture,
                            // PictureType: nonIndexData?.media?.type,
                            Disabled: 0,
                            PictureThumbnail: item?.PictureThumbnail,
                            Options: {
                                media: { type: nonIndexData?.media?.type },
                                grad: nonIndexData?.grad,
                                textList: nonIndexData?.textList
                            }
                        }
                    } else {
                        return {
                            ItemOrder: itemIndex,
                            Picture: nonIndexData?.media?.file,
                            PictureType: nonIndexData?.media?.type,
                            Disabled: 0,
                            Options: {
                                media: { type: nonIndexData?.media?.type },
                                grad: nonIndexData?.grad,
                                textList: nonIndexData?.textList
                            }
                        }
                    }
                })
            body.append('images', JSON.stringify(imagesArray))
            console.log(imagesArray)
            st.storiesCreateAndEdit(token, body).then(res => {

            }).finally(_ => {
                setSaveLoad(false)
                closeHandle()
                updateList();
            })

        } else {
            setSaveLoad(true)
            body.append('AllowedDeliveryTypes', AllowedDeliveryTypes.join(''))
            body.append('ButtonAction', ButtonAction !== undefined ? ButtonAction : '')
            body.append('ButtonActionItemID', ButtonActionItemID)
            body.append('ButtonText', ButtonText)
            body.append('ButtonTypeAction', ButtonTypeAction.toString())
            body.append('CategoryList', CategoryList?.join(','))
            body.append('Disabled', Disabled)
            if (orgsList.length > 0) {
                body.append('HiddenInOrganisations', orgsList.map(item => `/${item.ID}`).join('/') + '/')
            } else {
                body.append('HiddenInOrganisations', '')
            }
            body.append('HideInApp', HideInApp)
            body.append('ItemOrder', ItemOrder)
            if (PictureThumbnail) {
                body.append('ThumbnailPicture', PictureThumbnail)
            }
            body.append('TitleTextBundle', TitleTextBundle)
            body.append('TextBundle', TextBundle)
            body.append('NamePreview', NamePreview)

            const imagesArray = images?.map((item, index) => {
                return {
                    ItemOrder: index,
                    Picture: item?.media?.file,
                    PictureType: item?.media?.type,
                    Disabled: 0,
                    Options: {
                        media: {
                            type: item?.media?.type,
                            // file: item?.media?.file
                        },
                        grad: item?.grad,
                        textList: item?.textList
                    }
                }
            })
            body.append('images', JSON.stringify(imagesArray))
            st.storiesCreateAndEdit(token, body).then(res => {

            }).finally(_ => {
                setSaveLoad(false)
                closeHandle()
                updateList();
            })
        }
    }


    const onSaveCategory = (value) => {
        if (!CategoryList?.find(i => value?.ID == i?.ID)) {
            setCategoryList(s => [...s, value?.ID])
        }
    }

    const onDeleteCategory = (id) => {
        setCategoryList(s => s.filter(i => i !== id))
    }



    return (
        <>
            <Modal className={getClassNames(["Modal", styles.wrapper])} open={visible} width={1000} onCancel={closeHandle}>
                <SelectOrg
                    list={orgs}
                    selected={orgsList}
                    visible={hideOrgModal}
                    close={() => setHideOrgModal(false)}
                    setSelected={setOrgsList}
                />
                <ActionItemSelect
                    close={() => setActionItemModal(false)}
                    visible={actionItemModal}
                    actionType={ButtonTypeAction}
                    setButtonActionItemID={setButtonActionItemID}
                    actionItem={actionItem}
                    list={actionList}
                />
                <StorieModal
                    onSaveStorie={onSaveStorie}
                    data={storieData}
                    open={storieModal}
                    onCancel={() => {
                        setStorieModal(false)
                        setStorieData(null)
                    }}
                />
                <SelectCategoryModal
                    open={catsModal}
                    onCancel={() => setCatsModal(false)}
                    onSave={onSaveCategory}
                />
                <AddLastFrameModal
                    isOpen={lastFrameModal}
                    close={() => setLastFrameModal(false)}
                    url={lastFrameUrl}
                    changeUrl={setLastFrameUrl}
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
                        <Col span={15}>
                            <Row gutter={[20, 20]}>
                                <Col span={24}>
                                    <div className={styles.main}>
                                        <Swiper
                                            modules={[FreeMode, Navigation]}
                                            slidesPerView={'auto'}
                                            freeMode
                                            navigation={{
                                                prevEl: `.prev`,
                                                nextEl: `.next`,
                                            }}
                                        >
                                            <SwiperSlide style={{ width: 'fit-content' }}>
                                                <div
                                                    onClick={() => setStorieModal(true)}
                                                    className={styles.main_add}>
                                                    Добавить сториз
                                                </div>
                                            </SwiperSlide>
                                            {
                                                images?.map((i, index) => (
                                                    <SwiperSlide style={{ width: '400px' }}>
                                                        <div className={styles.main_item}>
                                                            <StorieCard
                                                                data={i}
                                                                index={index}
                                                                onDeleteStorie={onDeleteStorie}
                                                                onEditStorie={onEditStorie}
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>


                                    </div>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[15, 15]}>
                                        <Col span={24}>
                                            <Row gutter={[10, 10]}>
                                                <Col span={24}>
                                                    <Pl
                                                        text={'Добавить финальную заставку'}
                                                        shadow={true}
                                                        onClick={() => setLastFrameModal(true)}
                                                    />
                                                </Col>
                                                <Col span={24}>
                                                    <Pl
                                                        text={'Добавить категорию'}
                                                        shadow={true}
                                                        onClick={() => setCatsModal(true)}
                                                    />
                                                </Col>
                                                {
                                                    CategoryList?.length > 0 && (
                                                        <Col span={24}>
                                                            <Row gutter={[10, 10]}>
                                                                {
                                                                    CategoryList.map(i => (
                                                                        <Col span={24}>
                                                                            <Pl text={catsList?.find(f => f?.ID == i)?.Name} shadow
                                                                                onDelete={() => onDeleteCategory(i)}
                                                                            />
                                                                        </Col>
                                                                    ))
                                                                }
                                                            </Row>
                                                        </Col>
                                                    )
                                                }

                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Input shadow
                                                maskType={String}
                                                placeholder={'Заголовок (до 50-ти символов)'}
                                                height={50}
                                                value={TitleTextBundle}
                                                onChange={e => setTitleTextBundle(e.target.value)}
                                                error={TitleTextBundle.length > 50}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <Text
                                                shadow
                                                placeholder={'Текст в категории'}
                                                height={160}
                                                value={TextBundle}
                                                onChange={e => setTextBundle(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[10, 10]}>
                                        <Col span={24}>
                                            <Checkbox
                                                checked={AllowedDeliveryTypes?.find(item => item == delTypes.onlyDelivery.toString() || item == '2')}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        if (AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString())) {
                                                            setAllowedDeliveryTypes(['2'])
                                                        } else {
                                                            setAllowedDeliveryTypes(['0'])
                                                        }
                                                    } else {
                                                        if (AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString() || item == '2')) {
                                                            setAllowedDeliveryTypes(['1'])
                                                        } else {
                                                            setAllowedDeliveryTypes(['3'])
                                                        }
                                                    }
                                                }}
                                                shadow={true}
                                                text={'Показывать для доставки'}
                                                id={'deliveryTrueg'} />
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox
                                                checked={AllowedDeliveryTypes?.find(item => item == delTypes.onlyLocal.toString() || item == '2')}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        if (AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString())) {
                                                            setAllowedDeliveryTypes(['2'])
                                                        } else {
                                                            setAllowedDeliveryTypes(['1'])
                                                        }
                                                    } else {
                                                        if (AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString() || item == '2')) {
                                                            setAllowedDeliveryTypes(['0'])
                                                        } else {
                                                            setAllowedDeliveryTypes(['3'])
                                                        }
                                                    }
                                                }}
                                                shadow={true}
                                                text={'Показывать для самовывоза'}
                                                id={'onlyLocalg'} />
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox
                                                shadow={true}
                                                text={'Скрыть в приложении'}
                                                id={'HideInApp'}
                                                onChange={e => e.target.checked ? setHideInApp('1') : setHideInApp('0')}
                                                checked={HideInApp == '1'}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox
                                                checked={HideInOrg}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setHideInOrg(true)
                                                    } else {
                                                        setHideInOrg(false)
                                                        setOrgsList([])
                                                    }
                                                }}
                                                shadow={true}
                                                text={'Скрыть в организациях'}
                                                id={'rrr'} />
                                        </Col>
                                        {
                                            HideInOrg ? (
                                                <Col span={24}>
                                                    {
                                                        orgsList?.length == 0 ? (

                                                            <Pl onClick={() => setHideOrgModal(true)} shadow={true} text={'Добавить организацию'} style={{ backgroundColor: '#fff' }} />
                                                        ) : (
                                                            <Pl onClick={() => setHideOrgModal(true)} shadow={true} text={`Выбрано организаций ${orgsList?.length}`} style={{ backgroundColor: '#fff', color: 'var(--violet)' }} />
                                                        )
                                                    }
                                                </Col>
                                            ) : null
                                        }
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[10, 10]}>
                                        <Col span={24}>
                                            <Button
                                                disabled={!(images.length > 0 && PictureThumbnail) || TitleTextBundle.length > 50 || NamePreview.length > 50}
                                                onClick={onSave}
                                                load={saveLoad}
                                                styles={{ width: '100%' }}
                                                text={'Сохранить изменения'}
                                                before={<SaveIcon size={20} color={'#fff'} />} />
                                        </Col>
                                        {
                                            data ? (
                                                <Col span={24}>
                                                    <Button
                                                        load={delLoad}
                                                        onClick={deleteStories}
                                                        styles={{ width: '100%' }}
                                                        variant={'danger'}
                                                        text={'Удалить сториз'}
                                                        before={<BsTrash size={20} />} />
                                                </Col>
                                            ) : null
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            <Row gutter={[20, 20]}>
                                <Col span={24}>
                                    <div className='AddStorie__pim'>
                                        {
                                            PictureThumbnail ? (
                                                <div className='AddStorie__pim_img'>
                                                    <img src={PictureThumbnail} alt="" />
                                                    <div className="AddStorie__pim_action">
                                                        <Button
                                                            variant={'danger'}
                                                            text="Удалить"
                                                            styles={{ padding: 8, width: '100%' }}
                                                            justify={'center'}
                                                            onClick={() => setPictureThumbnail(undefined)}
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
                                                    onChange={onPrevUpload}
                                                />
                                            )
                                        }
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[10, 10]}>
                                        <Input shadow
                                            maskType={String}
                                            placeholder={'Название превью (до 50-ти символов)'}
                                            height={50}
                                            value={NamePreview}
                                            onChange={e => setNamePreview(e.target.value)}
                                            error={NamePreview.length > 50}
                                        />
                                        <Col span={24}>
                                            <h3 style={{ margin: 0 }} className="panel-label">Действие при нажатии на кнопку</h3>
                                        </Col>
                                        <Col span={24}>
                                            <DropCollapse
                                                selectItem={selectBtnAction}
                                                justify={'justifyLeft'}
                                                shadow={true}
                                                beforeIcon
                                                list={actionsOnBtn}
                                                value={actionsOnBtn.find(item => Number(item.ID) == Number(ButtonTypeAction)).value} />
                                        </Col>
                                        {
                                            ButtonTypeAction != 0 ? (
                                                <>
                                                    <Col span={24} className="row-custom">
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
                                                                        onClick={() => setActionItemModal(true)}
                                                                        shadow={true}
                                                                        text={actionItem?.Name}
                                                                        style={{ justifyContent: 'flex-start', color: '#7B99FF', backgroundColor: '#fff' }} />
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
                                                                        onClick={() => setActionItemModal(true)}
                                                                        shadow={true}
                                                                        text={actionsOnBtn.find(item => item.ID == ButtonTypeAction).pl}
                                                                        style={{ justifyContent: 'flex-start', color: '#7B99FF', backgroundColor: '#fff' }} />
                                                                )
                                                            )
                                                        }

                                                    </Col>
                                                    <Col span={24}>
                                                        <Input
                                                            value={ButtonText}
                                                            onChange={e => setButtonText(e.target.value)}
                                                            maskType={String}
                                                            shadow
                                                            placeholder={'Текст на кнопке'} />
                                                    </Col>

                                                </>
                                            ) : null
                                        }
                                    </Row>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </div>

            </Modal>
        </>
    )
}

export default AddStorie;