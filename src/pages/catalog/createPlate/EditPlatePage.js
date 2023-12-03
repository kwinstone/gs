import './CreatePlatePage.scss';
import {Row, Col, Tabs} from 'antd';
import Pl from '../../../components/Pl/Pl';
import PicItem from './components/PicItem/PicItem';
import Input from '../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import ExMass from './components/ExMass/ExMass';
import Mod from './components/Mod/Mod';
import DefList from './components/DefList/DefList';
import catService from '../../../services/catService';
import orgService from '../../../services/orgService';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import PlUpload from '../../../components/PlUpload/PlUpload';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import weektimes from './components/weektimes';
import TimeSelect from '../../orgs/orgsCreate/components/timeSelect/TimeSelect';
import timeTransform from './components/timeTransform';
import RecList from './components/RecList/RecList';
import {motion} from 'framer-motion';
import Loader from '../../../components/Loader/Loader';
import checkNumValue from '../../../funcs/checkNumValue';
import SaveIcon from '../../../icons/SaveIcon/SaveIcon';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import switchCrm from '../../../funcs/switchCrm';
import SelectOrg from '../../../components/SelectOrg/SelectOrg';
import EditHr from '../../../components/EditHr/EditHr';
import SizeList from './components/SizeList/SizeList';
import GiftList from './components/GiftList/GiftList';
import { MdContentCopy } from 'react-icons/md';
import {checkIsBao} from "../../../utils/checkIsBao";

const LOCAL_STORAGE = window.localStorage;



const delTypes = {
    onlyDelivery: 0,
    onlyLocal: 1,
    both: 2,
    none: 3
}

const cs = new catService();
const os = new orgService();

const EditPlatePage = () => {
    const {token, settings} = useSelector(state => state)
    const {categoryId, subcatrgoryId, plateId} = useParams()
    const nav = useNavigate();

    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false) 
    const [pageLoad, setPageLoad] = useState(true)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const [ID, setID] = useState(null)
    const [IIkoID, setIIkoID] = useState('')
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState(0)
    const [ItemOrder, setItemOrder] = useState(0)
    const [ParentID, setParentID] = useState(0)
    const [IsSubCategory, setIsSubCategory] = useState(0)
    const [MaxCount, setMaxCount] = useState(99)

    const [Name, setName] = useState('')
    const [NameEn, setNameEn] = useState('')
    const [NameKz, setNameKz] = useState('')

    const [IsHit, setIsHit] = useState(0)
    const [IsNew, setIsNew] = useState(0)

    const [Composition, setComposition] = useState('')
    const [CompositionEn, setCompositionEn] = useState('')
    const [CompositionKz, setCompositionKz] = useState('')


    const [Calories, setCalories] = useState('')
    const [Carbohydrates, setCarbohydrates] = useState('')
    const [Fats, setFats] = useState('')
    const [Proteins, setProteins] = useState('')
    const [CountAdditions, setCountAdditions] = useState('')
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(['0'])
    const [Picture, setPicture] = useState([])
    const [Mass, setMass] = useState('')
    const [Price, setPrice] = useState('')
    const [SalePrice, setSalePrice] = useState('')
    const [orgs, setOrgs] = useState([])
    const [orgsList, setOrgsList] = useState([])
    const [isHideInOrg, setIsHideInOrg] = useState(false)
    const [picPrevs, setPicPrevs] = useState([])
    const [weekTimes, setWeekTimes] = useState(weektimes)
    const [IsDynamicTimetable, setIsDynamicTimetable] = useState(0)
    const [HideInApp, setHideInApp] = useState('0')
    const [CanHaveSale, setCanHaveSale] = useState('0')
    const [IsSpicy, setIsSpicy] = useState('0')
    const [IsPartPizza, setIsPartPizza] = useState('0')
    const [is_only_for_stories, setis_only_for_stories] = useState('0')
    const [isSeason, setisSeason] = useState('0')

    const [massList, setMassList] = useState([])
    const [modList, setModList] = useState([])
    const [alList, setAlList] = useState([])

     //overrite
    const [ovHierarchy, setOvHierarchy] = useState('0'); // 1 значение
    const [ovEdit, setOvEdit] = useState('0') // 2 значение


    // modals
    const [hideOrgModal, setHideOrgModal] = useState(false)

    const [cloneLoad, setCloneLoad] = useState(false)

    const openHideOrgModal = () => setHideOrgModal(true)
    const closeHideOrgModal = () => setHideOrgModal(false)

    

    useEffect(() => {
        if(plateId && token && categoryId && orgs.length > 0) {
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                const thisPlate = res.find(item => item.ID == plateId);
                if(thisPlate?.Pictures?.length > 0 || thisPlate?.Name) {
                    LOCAL_STORAGE.setItem('gs-creating-plate', '1')
                } else {
                    LOCAL_STORAGE.removeItem('gs-creating-plate')
                }
                setis_only_for_stories(thisPlate?.is_only_for_stories)
                setHideInApp(thisPlate?.HideInApp)
                setID(thisPlate?.ID)
                setIIkoID(thisPlate?.IIkoID)
                setCanOverwriteByIIko(thisPlate.CanOverwriteByIIko)
                setItemOrder(thisPlate?.ItemOrder)
                setParentID(thisPlate?.ParentID)
                setIsSubCategory(thisPlate?.IsSubCategory)
                setMaxCount(thisPlate?.MaxCount != '0' ? thisPlate?.MaxCount : '')

                setName(thisPlate?.Name)
                setNameEn(thisPlate?.Name_en)
                setNameKz(thisPlate?.Name_kz)

                setIsHit(thisPlate?.IsHit)

                setComposition(thisPlate?.Composition != '0' ? thisPlate?.Composition : '')
                setCompositionKz(thisPlate?.Composition_kz != '0' ? thisPlate?.Composition_kz : '')
                setCompositionEn(thisPlate?.Composition_en != '0' ? thisPlate?.Composition_en : '')


                setCalories(thisPlate.Calories != '0' ? thisPlate.Calories : '')
                setCarbohydrates(thisPlate?.Carbohydrates != '0' ? thisPlate?.Carbohydrates : '')
                setFats(thisPlate?.Fats != '0' ? thisPlate?.Fats : '')
                setProteins(thisPlate?.Proteins != '0' ? thisPlate?.Proteins : '')
                setCountAdditions(thisPlate?.CountAdditions != '0' ? thisPlate.CountAdditions : '')
                setAllowedDeliveryTypes([thisPlate?.AllowedDeliveryTypes.toString()])
                setPicture(thisPlate?.Pictures)
                setPicPrevs(thisPlate?.Pictures.map(item => item.Picture))
                setMass(thisPlate?.Prices[0]?.Mass && thisPlate?.Prices[0]?.Mass != '0' ? thisPlate?.Prices[0]?.Mass : '')
                setPrice(thisPlate?.Prices[0]?.Price && thisPlate?.Prices[0]?.Price != '0' ? thisPlate?.Prices[0]?.Price : '')
                setSalePrice(thisPlate.Prices[0]?.SalePrice && thisPlate.Prices[0]?.SalePrice != '0' ? thisPlate.Prices[0]?.SalePrice : '')
                setIsHideInOrg(thisPlate.HiddenInOrganisations ? true : false)
                setIsDynamicTimetable(thisPlate.IsDynamicTimetable)
                setCanHaveSale(thisPlate?.CanHaveSale)
                setIsSpicy(thisPlate?.IsSpicy)
                setIsPartPizza(thisPlate?.setIsPartPizza || '0')
                setisSeason(thisPlate?.isSeason)
                setIsNew(thisPlate?.IsNew)

                if(thisPlate.HiddenInOrganisations && thisPlate.HiddenInOrganisations != '/') {
                    let array = thisPlate.HiddenInOrganisations.split('//')
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
                    setOrgsList([])
                }
    
                setWeekTimes([
                    timeTransform(thisPlate?.MonTime == 'Disabled' || thisPlate?.MonTime == 'Enabled' ? thisPlate?.MonTime : thisPlate?.MonTime?.split(','), 0), 
                    timeTransform(thisPlate?.TueTime == 'Disabled' || thisPlate?.TueTime == 'Enabled' ? thisPlate?.TueTime : thisPlate?.TueTime?.split(','), 1), 
                    timeTransform(thisPlate?.WedTime == 'Disabled' || thisPlate?.WedTime == 'Enabled' ? thisPlate?.WedTime : thisPlate?.WedTime?.split(','), 2),
                    timeTransform(thisPlate?.ThuTime == 'Disabled' || thisPlate?.ThuTime == 'Enabled' ? thisPlate?.ThuTime : thisPlate?.ThuTime?.split(','), 3),
                    timeTransform(thisPlate?.FriTime == 'Disabled' || thisPlate?.FriTime == 'Enabled' ? thisPlate?.FriTime : thisPlate?.FriTime?.split(','), 4),
                    timeTransform(thisPlate?.SatTime == 'Disabled' || thisPlate?.SatTime == 'Enabled' ? thisPlate?.SatTime : thisPlate?.SatTime?.split(','), 5),
                    timeTransform(thisPlate?.SunTime == 'Disabled' || thisPlate?.SunTime == 'Enabled' ? thisPlate?.SunTime : thisPlate?.SunTime?.split(','), 6),
                ]);
                setOvHierarchy(thisPlate?.CanOverwriteByIIko[0])
                setOvEdit(thisPlate?.CanOverwriteByIIko[1])
                
            }).finally(_ => setPageLoad(false))

            cs.getPriceMass(token, {ItemID: plateId}).then(res => {
                setMassList(res)
            })
            cs.getMods(token, {ID: plateId}).then(res => {
                setModList(res)
            })
            cs.getAllergens(token, {ItemID: plateId}).then(res => {
                setAlList(res)
            })
        }
    }, [plateId, token, categoryId, orgs, subcatrgoryId])

  

    const deleteImage = (ID) => {
        cs.deletePlateImg(token, {ID: ID}).then(res => {
            if(res.error == 0) {
                message.success('Картинка удалена')
                const rm = Picture;
                const m = rm.splice(rm.findIndex(item => item.ID == ID), 1)
                setPicture([...rm])
            } else {
                message.error('Произошла ошибка, повторите позже')
            }
        })
    }

    const uploadImages = (e) => {
        const pics = new FormData();
        pics.append('ItemID', ID)
        if(e.target.files.length + Picture.length > 10) {
            message.error('Можно загрузить не более 10 изображений')
        } else {
            const uploadedPics = [...e.target.files];
            uploadedPics.forEach((i, index) => {
                if(index == 0) {
                    pics.append('image', i)
                } else {
                    pics.append(`image_${index}`, i)
                }
            })
            cs.addPlateImg(token, pics).then(res => {
                if(!res?.error) {
                    setPicture(res)
                    if(e.target.files[0].type === 'video/mp4' || e.target.files[0].type === 'image/gif') {
                        message.success('Видео добавлено')
                    } else {
                        message.success('Картинка добавлена')
                    }
                } else {
                    message.error('Произошла ошибка, повторите еще раз')
                }
            })
        }
    }
    

    //получаем список организаций
    useEffect(() => {
        if(token) {
            os.getOrgs(token).then(res => {
                setOrgs([{value: 'Все', ID: 'All'}, ...res.map(item => {
                    return {
                        value: item.Name,
                        ID: item.ID
                    }
                })])
            })
        }
    }, [token])
    

    const addOrg = () => {
        setOrgsList(state => [...state, orgs[0]])
    }  
    const delOrg = (index) => {
        const pr = orgsList;
        const m = pr.splice(index, 1)
        setOrgsList([...pr])
    }
    const selectOrg = (value, index, ID) => {
        let ur = orgsList;
        let p = ur.splice(index, 1, {value: value, ID})
        setOrgsList([...ur])
    }

    const switchHiddenOrg = (e) => {        
        setIsHideInOrg(e.target.checked)
        if(!e.target.checked) {
            setOrgsList([])
        }
    }
    
    const saveTime = (index, value) => {
        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }


    
    const editPlate = () => {
        LOCAL_STORAGE.setItem('gs-creating-plate', '1')
        const data = new FormData()
        let weekArray = []
        if(weekTimes.length > 0) {
            weekArray = weekTimes.map(item => {
                if(!item.enabled && !item.disabled) {
                    return (
                        item.values?.map((i, ind) => {
                            return (
                                `${60 * Number(i.start.substring(0,2)) + Number(i.start.substring(3,5))}-${(60 * Number(i.end.substring(0,2))) + Number(i.end.substring(3,5))}`
                            )
                        }).join(',')
                    )
                } else {
                    if(item.enabled) {
                        return 'Enabled'
                    }
                    if(item.disabled) {
                        return 'Disabled'
                    }
                }
            }) 
        }

        data.append('HideInApp', HideInApp)
        data.append('ID', ID)
        data.append('IIkoID', IIkoID)
        data.append('CanOverwriteByIIko',`${ovHierarchy}${ovEdit}111111`)
        data.append('ItemOrder', ItemOrder)
        data.append('ParentID', ParentID ? ParentID : 0)
        data.append('CategoryID', categoryId)
        data.append('IsSubCategory', IsSubCategory)
        data.append('isSeason', isSeason)

        data.append('Name', Name)
        data.append('Composition', Composition)
        if (checkIsBao()) {
            data.append('Name_en', NameEn)
            data.append('Name_kz', NameKz)

            data.append('Composition_en', CompositionEn)
            data.append('Composition_kz', CompositionKz)
        }


        data.append('IsHit', IsHit)
        data.append('IsNew', IsNew)
        
        // data.append('Calories', Calories)
        data.append('Calories', Calories)

        // data.append('Carbohydrates', Carbohydrates)
        data.append('Carbohydrates', Carbohydrates)

        // data.append('Fats', Fats)
        data.append('Fats', Fats)

        // data.append('Proteins', Proteins)
        data.append('Proteins', Proteins)

        //data.append('Mass', Mass)
        data.append('Mass', Mass)

        //data.append('CountAdditions', CountAdditions)
        checkNumValue(data, 'CountAdditions', CountAdditions)

        // data.append('Price', Price)
        checkNumValue(data, 'Price', Price)
        
        // data.append('SalePrice', SalePrice)
        checkNumValue(data, 'SalePrice', SalePrice)
        
        // data.append('MaxCount', MaxCount)
        checkNumValue(data, 'MaxCount', MaxCount)

        
        
        
        data.append('is_only_for_stories', is_only_for_stories)
        data.append('IsDynamicTimetable', IsDynamicTimetable)
        data.append('MonTime', weekArray[0])
        data.append('TueTime', weekArray[1])
        data.append('WedTime', weekArray[2])
        data.append('ThuTime', weekArray[3])
        data.append('FriTime', weekArray[4])
        data.append('SatTime', weekArray[5])
        data.append('SunTime', weekArray[6])
        // data.append('ThumbnailPicture', Picture[0])
        setSaveLoad(true)
        if(orgsList.length > 0 && isHideInOrg) {
            data.append('HiddenInOrganisations', orgsList.length > 0 ? orgsList.filter(i => i?.ID !== 'All').map(item => `/${item.ID}`).join('/') + '/' : '')
        } else {
            data.append('HiddenInOrganisations', '')
        }
        data.append('CanHaveSale', CanHaveSale)
        data.append('IsSpicy', IsSpicy)
        data.append('IsPartPizza', IsPartPizza)
        // if(AllowedDeliveryTypes.length == 0) {
        //     data.append('AllowedDeliveryTypes', '3')
        // } else {
        //     if(AllowedDeliveryTypes.length == 2) {
                
        //         data.append('AllowedDeliveryTypes', '2')
        //     } else {
        //         data.append('AllowedDeliveryTypes', AllowedDeliveryTypes[0])
        //     }
        // }
        data.append('AllowedDeliveryTypes', AllowedDeliveryTypes.join(''))
        cs.editProd(token, data).then(res => {
           if(res) {
            message.success('Изменения сохранены')
            nav(-1, {replace: true})
           }
        }).finally(_ => {
            setSaveLoad(false)
        }).catch(err => {
            console.log(err)
            message.error('Произошла ошибка')
        })

        setSaveLoad(false)
    }

    const deletePlate = () => {
        setDelLoad(true)
        cs.delProd(token, {ID: plateId}).then(res => {
            if(res) {
                message.success('Блюдо успешно удалено')
                nav(-1, {replace: true})
            } else {
                message.error('Произошла ошибка')
            }
        }).finally(_ => {
            setDelLoad(false)
        })
    }

    
    const openDeleteConfirm = () => setConfirmDelete(true)
    const closeDeleteConfirm  = () => setConfirmDelete(false)
    const deleteConfirmAccept = () => deletePlate()





    const onToggleHide = useCallback((ID, IsHidden) => {
        const body = {
            ID,
            IsHidden
        }
        cs.editPlateImageHide(token, body).then(res => {
            if(res) {
                
                const find = {
                    ...Picture.find(i => i.ID == ID),
                    IsHidden: res?.IsHidden
                };
                const r = Picture;
                const rm = r.splice(Picture.findIndex(i => i.ID == ID), 1, find)
                setPicture([...r])
            }
        })
    }, [Picture, token])


    const cloneElement = () => {
        if(token && ID) {
            setCloneLoad(true)
            cs.cloneItem(token, {id: ID,element:'plate'}).then(res => {
                if(res === 200) {
                    nav(-1)
                } else {
                    message.error('Произошла ошибка')
                }
            }).finally(() => {
                setCloneLoad(false)
            })
        }
    }

    const nameTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                maskType={String}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder={'Название блюда'}/>,
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                maskType={String}
                value={NameKz}
                onChange={(e) => setNameKz(e.target.value)}
                placeholder={'Название блюда на казахском языке'}/>,
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                maskType={String}
                value={NameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder={'Название блюда на английском языке'}/>,
        },
    ];

    const compositionTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Text
                value={Composition}
                placeholder={'Состав'}
                onChange={(e) => setComposition(e.target.value)}/>
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Text
                value={CompositionKz}
                placeholder={'Состав на казахском языке'}
                onChange={(e) => setCompositionKz(e.target.value)}/>
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Text
                value={CompositionEn}
                placeholder={'Состав на английском языке'}
                onChange={(e) => setCompositionEn(e.target.value)}/>
        },
    ];


    if(pageLoad) {
        return (
            <div className="page">
                <main className="Main">
                    <div className="pageBody">
                        <Loader/>
                    </div>
                </main>
            </div>
        )
    }


    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="CreatePlatePage page">
            {/* <AddAlrgn visible={addAllergen} close={closeAddAllergen}/>
            <EditAlrgn visible={editAllergen} close={closeEditAllergen}/> */}
            {/* <HeaderProfile/> */}
            <ConfirmModal
                visible={confirmDelete}
                cancel={deleteConfirmAccept}
                close={closeDeleteConfirm}
                text={'Удалить блюдо?'}
                />
            <SelectOrg
                list={orgs}
                close={closeHideOrgModal}
                selected={orgsList}
                visible={hideOrgModal}
                setSelected={setOrgsList}
                />
            <main className="Main">
                <div className="pageBody">
                    <div className="CreatePlatePage__body pageBody-content">
                        
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className="row-custom">
                                    <div className="panel" style={{display: 'flex', overflowX:'auto'}}>
                                        {
                                            Picture && Picture.length > 0 ? (
                                                Picture.map((item, index) => (
                                                    <PicItem
                                                        onToggleHide={() => onToggleHide(item.ID, item?.IsHidden == '0' ? '1' : '0')}
                                                        isHidden={item.IsHidden == '1'}
                                                        key={index}
                                                        image={item.Picture}
                                                        remove={() => deleteImage(item.ID)}
                                                        />
                                                ))
                                            ) : null
                                        }
                                        {
                                            Picture?.length < 10 ? (
                                                <PlUpload accept={'.png, .jpg, .jpeg'} multiple={true} id={'editPlatePics'} onChange={(e) => uploadImages(e)} style={{width: 200, height: 200, flex: '0 0 auto', backgroundColor: '#F8F8F8'}} text={'Добавить картинку'}/>
                                                
                                            ) : null
                                        }
                                        
                                    </div>
                                </Row>
                                {
                                    IIkoID && ID ? (
                                        <Row className='row-custom' gutter={[20,20]}>
                                            <Col span={12}>
                                                <div className="def-label">ID в системе</div>
                                                <div className="def-value">{ID}</div>
                                            </Col>
                                            {
                                                switchCrm(settings, 
                                                    <Col span={12}>
                                                        <div className="def-label">ID в iIko</div>
                                                        <div className="def-value">{IIkoID}</div>
                                                    </Col>,
                                                    <Col span={12}>
                                                        <div className="def-label">ID в RKeeper</div>
                                                        <div className="def-value">{IIkoID}</div>
                                                    </Col>,
                                                    <Col span={12}>
                                                        <div className="def-label">ID в 1C</div>
                                                        <div className="def-value">{IIkoID}</div>
                                                    </Col>,
                                                    <Col span={12}>
                                                        <div className="def-label">ID в FrontPad</div>
                                                        <div className="def-value">{IIkoID}</div>
                                                    </Col>
                                                )
                                            }
                                            
                                        </Row>
                                    ) : null
                                }
                                {
                                    switchCrm(settings, 
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'ov1'}
                                                text={'Разрешить iiko редактировать иерархию'}
                                                checked={ovHierarchy == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvHierarchy('1')
                                                    } else {
                                                        setOvHierarchy('0')
                                                    }
                                                }}
                                                />
                                        </Row>   ,
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'ov1'}
                                                text={'Разрешить RKeeper редактировать иерархию'}
                                                checked={ovHierarchy == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvHierarchy('1')
                                                    } else {
                                                        setOvHierarchy('0')
                                                    }
                                                }}
                                                />
                                        </Row> ,
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'ov1'}
                                                text={'Разрешить 1C редактировать иерархию'}
                                                checked={ovHierarchy == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvHierarchy('1')
                                                    } else {
                                                        setOvHierarchy('0')
                                                    }
                                                }}
                                                />
                                        </Row> ,
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'ov1'}
                                                text={'Разрешить FrontPad редактировать иерархию'}
                                                checked={ovHierarchy == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvHierarchy('1')
                                                    } else {
                                                        setOvHierarchy('0')
                                                    }
                                                }}
                                                />
                                        </Row> 
                                    )
                                }
                                {
                                    switchCrm(settings, 
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'ov2'}
                                                text={'Разрешить iiko перезаписывать блюдо'}
                                                checked={ovEdit == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvEdit('1')
                                                    } else {
                                                        setOvEdit('0')
                                                    }
                                                }}
                                                />
                                        </Row>   ,
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'ov2'}
                                                text={'Разрешить RKeeper перезаписывать блюдо'}
                                                checked={ovEdit == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvEdit('1')
                                                    } else {
                                                        setOvEdit('0')
                                                    }
                                                }}
                                                />
                                        </Row> ,
                                         <Row className="row-custom">
                                            <Checkbox
                                                id={'ov2'}
                                                text={'Разрешить 1C перезаписывать блюдо'}
                                                checked={ovEdit == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setOvEdit('1')
                                                    } else {
                                                        setOvEdit('0')
                                                    }
                                                }}
                                                />
                                        </Row> ,
                                         <Row className="row-custom">
                                         <Checkbox
                                             id={'ov2'}
                                             text={'Разрешить FrontPad перезаписывать блюдо'}
                                             checked={ovEdit == '1'}
                                             onChange={e => {
                                                 if(e.target.checked) {
                                                     setOvEdit('1')
                                                 } else {
                                                     setOvEdit('0')
                                                 }
                                             }}
                                             />
                                     </Row> 
                                    )
                                }
                                
                                <Row className="row-custom">
                                    {
                                        checkIsBao() ? (
                                            <Tabs defaultActiveKey="1" items={nameTabs} onChange={() => {}} style={{ width: '100%'}} />
                                        ) : nameTabs[0].children
                                    }
                                </Row>
                                {
                                    switchCrm(settings, 
                                        <Row className="row-custom">
                                            <Input 
                                                maskType={String}
                                                value={IIkoID}
                                                onChange={(e) => setIIkoID(e.target.value)}
                                                placeholder={'ID в iIko'}/>
                                        </Row> ,
                                        <Row className="row-custom">
                                            <Input 
                                                maskType={String}
                                                value={IIkoID}
                                                onChange={(e) => setIIkoID(e.target.value)}
                                                placeholder={'ID в RKeeper'}/>
                                        </Row>   ,
                                        <Row className="row-custom">
                                            <Input 
                                                maskType={String}
                                                value={IIkoID}
                                                onChange={(e) => setIIkoID(e.target.value)}
                                                placeholder={'ID в 1C'}/>
                                        </Row>   ,
                                         <Row className="row-custom">
                                            <Input 
                                                maskType={String}
                                                value={IIkoID}
                                                onChange={(e) => setIIkoID(e.target.value)}
                                                placeholder={'ID в FrontPad'}/>
                                        </Row>   
                                    )
                                }

                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={CanHaveSale == '1'} 
                                        id={'CanHaveSale'} 
                                        text={'Можно применять скидку'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setCanHaveSale(1)
                                            } else {
                                                setCanHaveSale(0)
                                            }
                                        }}
                                        />
                                </Row>
                                
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsNew == '1'} 
                                        id={'IsNew'} 
                                        text={'Тэг: Новое'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsNew(1)
                                            } else {
                                                setIsNew(0)
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsHit == '1'}
                                        id={'IsHit'} 
                                        text={'Тэг: Хит'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsHit(1)
                                            } else {
                                                setIsHit(0)
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsSpicy == '1'}
                                        id={'IsSpicy'} 
                                        text={'Тэг: Остро'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsSpicy(1)
                                            } else {
                                                setIsSpicy(0)
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={isSeason == '1'}
                                        id={'isSeason'} 
                                        text={'Тэг: Сезонный'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setisSeason('1')
                                            } else {
                                                setisSeason('0')
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsPartPizza == '1'}
                                        id={'IsPartPizza'} 
                                        text={'Пицца из половинок'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsPartPizza('1')
                                            } else {
                                                setIsPartPizza('0')
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    {
                                        checkIsBao() ? (
                                            <Tabs defaultActiveKey="1" items={compositionTabs} onChange={() => {}} style={{ width: '100%'}} />
                                        ) : compositionTabs[0].children
                                    }
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        scale={5}
                                        value={Price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder={'Цена'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        scale={5}
                                        value={SalePrice}
                                        onChange={(e) => setSalePrice(e.target.value)} 
                                        placeholder={'Старая цена'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        maskType={String}
                                        value={Mass}
                                        onChange={(e) => setMass(e.target.value)}
                                        placeholder={'Масса'}/>
                                </Row>
                                <Row className="row-custom" style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                    <Input 
                                        maskType={String}
                                        value={Calories}
                                        onChange={(e) => setCalories(e.target.value)}
                                        style={{width: '48%', marginBottom: 20}} placeholder={'Калории'}/>
                                    <Input 
                                        maskType={String}
                                        value={Proteins}
                                        onChange={(e) => setProteins(e.target.value)}
                                        style={{width: '48%', marginBottom: 20}} placeholder={'Белки'}/>
                                    <Input
                                        maskType={String}
                                        value={Fats}
                                        onChange={(e) => setFats(e.target.value)} 
                                        style={{width: '48%'}} placeholder={'Жиры'}/>
                                    <Input
                                        maskType={String}
                                        value={Carbohydrates} 
                                        onChange={(e) => setCarbohydrates(e.target.value)}
                                        style={{width: '48%'}} 
                                        placeholder={'Углеводы'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString()|| item == '2') }
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString())) {
                                                    setAllowedDeliveryTypes(['2'])
                                                } else{
                                                    setAllowedDeliveryTypes(['0'])
                                                }
                                                // setAllowedDeliveryTypes(state => [...state, '0'].filter(item => item == '3'))
                                            } else {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString())) {
                                                    setAllowedDeliveryTypes(['1'])
                                                } else{
                                                    setAllowedDeliveryTypes(['3'])
                                                }
                                                // setAllowedDeliveryTypes(state => state.filter(item => item != '0'))
                                            }
                                        }}
                                        id={'deliveryTrue'} 
                                        text={'Доступно к доставке'}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox
                                        checked={AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString() || item == '2') } 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString())) {
                                                    setAllowedDeliveryTypes(['2'])
                                                } else {
                                                    setAllowedDeliveryTypes(['1'])
                                                }
                                                // setAllowedDeliveryTypes(state => [...state, '1'])
                                            } else {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString())) {
                                                    setAllowedDeliveryTypes(['0'])
                                                } else {
                                                    setAllowedDeliveryTypes(['3'])
                                                }
                                                //setAllowedDeliveryTypes(state => state.filter(item => item != '1'))
                                            }
                                        }}
                                        id={'onlyLocal'} 
                                        text={'Доступно к заказу в ресторане'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        value={CountAdditions}
                                        onChange={(e) => setCountAdditions(e.target.value)} 
                                        placeholder={'Количество дополнений'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox
                                        checked={isHideInOrg} onChange={(e) => switchHiddenOrg(e)}  
                                        id={'ttt'} 
                                        text={'Скрыть в организациях'}/>
                                </Row>
                                
                                {
                                    isHideInOrg ? (
                                        <>
                                        {/* <div className="Modal__form_row">
                                            {
                                                orgsList && orgsList.length > 0 ? (
                                                    orgsList.map((item, index) => (
                                                        <DropCollapse 
                                                            key={index}
                                                            selectItem={selectOrg} 
                                                            afterIcon 
                                                            del={delOrg}
                                                            index={index}
                                                            value={item.value} 
                                                            list={orgs}
                                                            ID={item.ID}/>
                                                    ))
                                                ) : null
                                            }
                                        
                                        </div> */}
                                        {
                                            orgsList?.length == 0 ? (
                                                <div className="Modal__form_row">
                                                    <Pl onClick={openHideOrgModal} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                                </div>
                                            ) : (
                                                <div className="Modal__form_row">
                                                    <Pl
                                                        style={{backgroundColor: '#fff', color: 'var(--violet)'}}
                                                        onClick={openHideOrgModal}
                                                        text={`Выбрано организаций ${orgsList?.length}`}
                                                        />
                                                </div>
                                            )
                                        }
                                        </>
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    <Checkbox
                                        checked={IsDynamicTimetable == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsDynamicTimetable(1)
                                            } else {
                                                setIsDynamicTimetable(0)
                                            }
                                        }}
                                        text={'Динамическое расписание'} 
                                        id={'dynamicTimetable'}/>
                                </Row>
                                
                                {
                                    IsDynamicTimetable == '1' ? (
                                        <Row className='row-custom'>
                                            <TimeSelect plate={true} save={saveTime} list={weekTimes}/>
                                        </Row>
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    <Checkbox
                                        id={'HideInApp'}
                                        text={'Скрыть в приложении'}
                                        checked={HideInApp == '1'}
                                        onChange={e => setHideInApp(e.target.checked ? '1' : '0')}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox
                                        checked={is_only_for_stories === '1'} 
                                        onChange={e => setis_only_for_stories(e.target.checked ? '1' : '0')}  
                                        id={'st-hd'} 
                                        text={'Только для сториз'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Button
                                        text={'Создать копию блюда'}
                                        styles={{width: '100%'}}
                                        before={<MdContentCopy size={20} color={"#fff"}/>}
                                        load={cloneLoad}
                                        onClick={cloneElement}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Button
                                        disabled={!Name}
                                        onClick={editPlate} 
                                        text={'Сохранить'} 
                                        justify={'flex-start'} 
                                        before={<SaveIcon color={'#fff'} size={20}/>} 
                                        load={saveLoad}
                                        styles={{width: '100%'}}/>
                                </Row>
                                <Row className="row-custom">
                                    <Button
                                        onClick={openDeleteConfirm}
                                        variant={'danger'}
                                        load={delLoad}
                                        text={'Удалить блюдо'} 
                                        justify={'flex-start'} 
                                        before={<BsTrash size={20}/>} 
                                        styles={{width: '100%'}}/>
                                </Row>
                            </Col>
                            {
                                plateId ? (
                                    <Col span={12}>
                                        <Row className='row-custom'>
                                            <ExMass plateId={plateId} list={massList}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <Mod plateId={plateId} list={modList}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <DefList plateId={plateId}  head={'Список аллергенов'} addText={'Добавить аллерген'}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <RecList 
                                                plateId={plateId} 
                                                head={'Список рекомендаций'} 
                                                addText={'Добавить блюдо'}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <SizeList plateId={plateId} head={'Список размеров'}
                                            addText="Добавить размер"
                                            />
                                        </Row>
                                        <Row className='row-custom'>
                                            <GiftList
                                                head={'Список подарков'}
                                                addText={'Добавить подарок'}
                                                plateId={plateId}
                                                />
                                        </Row>
                                        <Row className='row-custom'>
                                            <EditHr
                                                ID={plateId}
                                                onSave={cs.editParent}
                                                />
                                        </Row>
                                    </Col>
                                ) : null
                            }
                            
                        </Row>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default EditPlatePage;