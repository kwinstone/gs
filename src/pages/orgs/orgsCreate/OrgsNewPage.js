import './OrgsCreatePage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import {Row, Col, message, Tabs} from 'antd';
import Pl from '../../../components/Pl/Pl';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Text from '../../../components/Text/Text';
import Checkbox from '../../../components/Checkbox/Checkbox';
import DropCollapse from '../../../components/DropCollapse/DropCollapse';
import TimeSelect from './components/timeSelect/TimeSelect';
import { useEffect, useState } from 'react';
import {BsTrash} from 'react-icons/bs';
import useModal from '../../../hooks/useModal';
import SelectLocation from '../modals/selectLocation/SelectLocation';
import { useSelector } from 'react-redux';
import orgService from '../../../services/orgService';
import { useLocation, useParams } from 'react-router-dom';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../../../components/Map/Map';
import PlUpload from '../../../components/PlUpload/PlUpload';
import timezones from './components/timezones';
import paymethods from './components/paymethods';
import weektimes from './components/weektimes';
import timeTransform from './components/timeTransform';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import PayMethods from '../../../components/PayMethods/PayMethods';
import SaveIcon from '../../../icons/SaveIcon/SaveIcon';
import PolygonModal from '../modals/PolygonModal/PolygonModal';
import MapPolygon from '../../../components/MapPolygon/MapPolygon';
import LocationModal from '../modals/LocationModal/LocationModa';
import MapMarker from '../../../components/MapMarker/MapMarker';
import checkNumValue from '../../../funcs/checkNumValue';
import MapPolygonPic from '../../../components/MapPolygonPic/MapPolygonPic';
import UploadKml from './components/UploadKml/UploadKml';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import paymentTypes from '../../../funcs/paymentTypes';
import switchCrm from '../../../funcs/switchCrm';
import checkNull from '../../../funcs/checkNull';
import PaymentEdit from './modals/PaymentEdit/PaymentEdit';
import checkDomain from '../../../funcs/checkDomain';
import {checkIsBao} from "../../../utils/checkIsBao";

const os = new orgService();
const pmValueFind = (value) => {
    switch(value) {
        case '0':
            return 'Оплата наличными'
        case '1':
            return 'Оплата по карте в приложении'
        case '2':
            return 'Оплата по карте при получении'
        case '3':
            return 'Оплата бонусами'
    }
}




const LOCAL_STORAGE = window.localStorage;


const OrgsNewPage = () => {
    const {token, settings} = useSelector(state => state)
    const {brandId, orgId} = useParams();
    const loc = useLocation()
    const [createdId, setCreatedId] = useState('')
    const nav = useNavigate()
    const [editPolygon, setEditPolygon] = useState()

    //GLOBAL VALUES
    const [coords, setCoords] = useState(checkDomain({lat: 55.7522200,lng: 37.6155600}, {lat: 43.23365, lng: 76.89623}))
    const [ThumbnailPrev, setThumbnailPrev] = useState(null)
    const [weekTimes, setWeekTimes] = useState(weektimes)

    //VALUES
    
    const [OrganisationBrand, setOrganisationBrand] = useState('')
    const [ItemOrder, setItemOrder] = useState(0)

    const [Name, setName] = useState('')
    const [NameEn, setNameEn] = useState('')
    const [NameKz, setNameKz] = useState('')

    const nameTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                maskType={String}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder={'Название организации'}/>
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                maskType={String}
                value={NameKz}
                onChange={(e) => setNameKz(e.target.value)}
                placeholder={'Название организации'}/>
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                maskType={String}
                value={NameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder={'Название организации'}/>
        },
    ];

    const [Description, setDescription] = useState('')
    const [ThumbnailPicture, setThumbnailPicture] = useState(null)
    const [Address, setAddress] = useState('')
    const [Phone, setPhone] = useState('')
    const [MinPriceForLocalSale, setMinPriceForLocalSale] = useState('')
    const [LocalOrderSale, setLocalOrderSale] = useState('')
    const [IsHaveDelivery, setIsHaveDelivery] = useState('0')
    const [IsHaveLocalOrder, setIsHaveLocalOrder] = useState('0')
    const [TimetableDescription, setTimetableDescription] = useState('')
    const [Lattitude, setLattitude] = useState('0')
    const [Longitude, setLongitude] = useState('0')
    const [BotToken, setBotToken] = useState('')
    const [Email, setEmail] = useState('')
    const [IsNeedToNotify, setIsNeedToNotify] = useState('0')
    const [NotifyWhenNewOrder, setNotifyWhenNewOrder] = useState('0')
    const [NotifyWhenIIkoErrors, setNotifyWhenIIkoErrors] = useState('0')
    const [NotifyWhenOrderChanges, setNotifyWhenOrderChanges] = useState('0')
    const [Timezone, setTimezone] = useState(timezones[0].value)
    const [CountTimeStepsPreorder, setCountTimeStepsPreorder] = useState('');
    const [TimeStep, setTimeStep] = useState('');
    const [Disabled, setDisabled] = useState('0')
    const [HavePreorder, setHavePreorder]= useState('0')
    const [CountTimeStepsReservation, setCountTimeStepsReservation] = useState('')
    const [TimeStepReservation, setTimeStepReservation] = useState('')
    const [HaveReservation, setHaveReservation] = useState('0')
    const [NotifyWhenNewReservation, setNotifyWhenNewReservation] = useState('0')
    const [HideInApp, setHideInApp] = useState('0')
    const [PaymentSystemType, setPaymentSystemType] = useState('Русский стандарт')


    //переключать в зависимости от настроек юзера
    const [IIkoID, setIIkoID] = useState('')
    const [IIkoIDTerminal, setIIkoIDTerminal] = useState('')
    const [RKeeperLogin, setRKeeperLogin] = useState('')
    const [RKeeperIP, setRKeeperIP] = useState('') 
    const [RKeeperPort, setRKeeperPort] = useState('')
    const [PrimehillToken,setPrimehillToken] = useState('')
    const [CanOverwrite, setCanOverwrite] = useState('0')
    const [BotChatID, setBotChatID] = useState('')
    const [TimeForSelfPickup, setTimeForSelfPickup] = useState('');
    const [transfer_to_call_center, settransfer_to_call_center] = useState('0')

    const [polList, setPolList] = useState([])

    //MODALS
    const [selectLocationModal, setSelectLocationModal] = useState(false);
    const [selectPolyModal, setSelectPolyModal] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    
    //Способы оплаты
    const [pm, setPm] = useState([]);
    const [delivery, setDelivery] = useState(false)

    const [saved, setSaved] = useState(true)

    const [payEditModal, setPayEditModal] = useState(false);
    const [selectedPay, setSelectedPay] = useState(null)


    


    //получение данных при редактировании
    useEffect(() => {
        if(orgId && brandId != 'nobrand' && token && settings.IsHaveBrands == '1') {
         
            os.getOrgs(token, {BrandID: brandId}).then(res => {
                const thisOrg = res.find(item => item.ID == orgId)
                if(thisOrg?.ThumbnailPicture || thisOrg?.Name) {
                    LOCAL_STORAGE.setItem('gs-creating-org', '1')
                } else {
                    LOCAL_STORAGE.removeItem('gs-creating-org')
                }
                setPaymentSystemType(thisOrg?.PaymentSystemType != '' ? thisOrg?.PaymentSystemType : 'Русский стандарт')
                setIIkoID(thisOrg?.IIkoID)
                setIIkoIDTerminal(thisOrg?.IIkoIDTerminal)
                setOrganisationBrand(thisOrg?.OrganisationBrand)
                setItemOrder(thisOrg?.ItemOrder)
                setName(checkNull(thisOrg?.Name))
                setNameKz(checkNull(thisOrg?.Name_kz))
                setNameEn(checkNull(thisOrg?.Name_en))

                setDescription(checkNull(thisOrg?.Description))
                setThumbnailPrev(thisOrg?.ThumbnailPicture)
                setAddress(checkNull(thisOrg?.Address))
                setPhone(checkNull(thisOrg?.Phone))
                setMinPriceForLocalSale(thisOrg?.MinPriceForLocalSale != '0' ? thisOrg?.MinPriceForLocalSale : '')
                setLocalOrderSale(thisOrg?.LocalOrderSale != '0' ? thisOrg?.LocalOrderSale : '')
                setIsHaveDelivery(checkNull(thisOrg?.IsHaveDelivery, true))
                setIsHaveLocalOrder(checkNull(thisOrg?.IsHaveLocalOrder, true))
                setTimetableDescription(checkNull(thisOrg?.TimetableDescription))
                setLattitude(thisOrg?.Lattitude)
                setLongitude(thisOrg?.Longitude)
                setCanOverwrite(checkNull(thisOrg?.CanOverwrite, true))
                setBotChatID(checkNull(thisOrg?.BotChatID))
                if(thisOrg?.Lattitude != undefined && thisOrg?.Longitude != undefined && thisOrg?.Lattitude != '' && !thisOrg?.Lattitude != '') {
                    setCoords({lat:Number(thisOrg.Lattitude), lng: Number(thisOrg.Longitude)})
                } else {
                    setCoords(checkDomain({lat: 55.7522200,lng: 37.6155600}, {lat: 43.23365, lng: 76.89623}))
                }
                
                setBotToken(checkNull(thisOrg?.BotToken))
                setEmail(checkNull(thisOrg?.Email))
                setIsNeedToNotify(checkNull(thisOrg?.IsNeedToNotify, true))
                setNotifyWhenNewOrder(checkNull(thisOrg?.NotifyWhenNewOrder, true))
                setNotifyWhenIIkoErrors(checkNull(thisOrg?.NotifyWhenIIkoErrors, true))
                setNotifyWhenOrderChanges(checkNull(thisOrg?.NotifyWhenOrderChanges, true))
                setTimezone(thisOrg?.Timezone)
                setCountTimeStepsPreorder(thisOrg?.CountTimeStepsPreorder != '0' ? thisOrg?.CountTimeStepsPreorder : '')
                setDisabled(checkNull(thisOrg?.Disabled, true))
                setTimeStep(checkNull(thisOrg?.TimeStep))
                setHavePreorder(checkNull(thisOrg?.HavePreorder, true))
                setCountTimeStepsReservation(thisOrg?.CountTimeStepsReservation != '0' ? thisOrg?.CountTimeStepsReservation : '')
                setTimeStepReservation(thisOrg?.TimeStepReservation != '0' ? thisOrg?.TimeStepReservation : '')
                setHaveReservation(checkNull(thisOrg?.HaveReservation, true))
                setNotifyWhenNewReservation(checkNull(thisOrg?.NotifyWhenNewReservation, true))
                setWeekTimes([
                    timeTransform(thisOrg?.MonTime == 'Closed' ? thisOrg?.MonTime : thisOrg?.MonTime?.split(','), 0), 
                    timeTransform(thisOrg?.TueTime == 'Closed' ? thisOrg?.TueTime : thisOrg?.TueTime?.split(','), 1), 
                    timeTransform(thisOrg?.WedTime == 'Closed' ? thisOrg?.WedTime : thisOrg?.WedTime?.split(','), 2),
                    timeTransform(thisOrg?.ThuTime == 'Closed' ? thisOrg?.ThuTime : thisOrg?.ThuTime?.split(','), 3),
                    timeTransform(thisOrg?.FriTime == 'Closed' ? thisOrg?.FriTime : thisOrg?.FriTime?.split(','), 4),
                    timeTransform(thisOrg?.SatTime == 'Closed' ? thisOrg?.SatTime : thisOrg?.SatTime?.split(','), 5),
                    timeTransform(thisOrg?.SunTime == 'Closed' ? thisOrg?.SunTime : thisOrg?.SunTime?.split(','), 6),
                ]);
                setRKeeperLogin(checkNull(thisOrg?.RKeeperLogin))
                setRKeeperIP(checkNull(thisOrg?.RKeeperIP))
                setRKeeperPort(checkNull(thisOrg?.RKeeperPort))
                setPrimehillToken(checkNull(thisOrg?.PrimehillToken))
                setHideInApp(checkNull(thisOrg?.HideInApp, true))
                setTimeForSelfPickup(checkNull(thisOrg?.TimeForSelfPickup))
                settransfer_to_call_center(thisOrg?.transfer_to_call_center)

            })
            os.getPols(token, {OrganisationID: orgId}).then(res => {
                if(res?.length > 0) {
                    setDelivery(true)
                    setPolList(res.filter(item => item.Disabled).map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                } else {
                    setDelivery(false)
                }
            })
            os.getPay(token, {OrganisationID: orgId}).then(res => {
                
                setPm(res.filter(item => item.Disabled == '0').map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        }
        if(orgId && brandId == 'nobrand' && token && settings?.IsHaveBrands == '0') {
            os.getOrgs(token).then(res => {
                const thisOrg = res.find(item => item.ID == orgId)
                if(thisOrg?.ThumbnailPicture || thisOrg?.Name) {
                    LOCAL_STORAGE.setItem('gs-creating-org', '1')
                } else {
                    LOCAL_STORAGE.removeItem('gs-creating-org')
                }
                setPaymentSystemType(thisOrg?.PaymentSystemType != '' ? thisOrg?.PaymentSystemType : 'Русский стандарт')
                setIIkoID(thisOrg?.IIkoID)
                setIIkoIDTerminal(thisOrg?.IIkoIDTerminal)
                setOrganisationBrand(thisOrg?.OrganisationBrand)
                setItemOrder(thisOrg?.ItemOrder)
                setName(checkNull(thisOrg?.Name))
                setNameKz(checkNull(thisOrg?.Name_kz))
                setNameEn(checkNull(thisOrg?.Name_en))
                setDescription(checkNull(thisOrg?.Description))
                setThumbnailPrev(thisOrg?.ThumbnailPicture)
                setAddress(checkNull(thisOrg?.Address))
                setPhone(checkNull(thisOrg?.Phone))
                setMinPriceForLocalSale(thisOrg?.MinPriceForLocalSale != '0' ? thisOrg?.MinPriceForLocalSale : '')
                setLocalOrderSale(thisOrg?.LocalOrderSale != '0' ? thisOrg?.LocalOrderSale : '')
                setIsHaveDelivery(checkNull(thisOrg?.IsHaveDelivery, true))
                setIsHaveLocalOrder(checkNull(thisOrg?.IsHaveLocalOrder, true))
                setTimetableDescription(checkNull(thisOrg?.TimetableDescription))
                setLattitude(thisOrg?.Lattitude)
                setLongitude(thisOrg?.Longitude)
                setCanOverwrite(checkNull(thisOrg?.CanOverwrite, true))
                if(thisOrg?.Lattitude && thisOrg?.Longitude) {
                    setCoords({lat:Number(thisOrg.Lattitude), lng: Number(thisOrg.Longitude)})
                } else {
                    setCoords(checkDomain({lat: 55.7522200,lng: 37.6155600}, {lat: 43.23365, lng: 76.89623}))
                }
                setBotChatID(checkNull(thisOrg?.BotChatID))
                setBotToken(checkNull(thisOrg?.BotToken))
                setEmail(checkNull(thisOrg?.Email))
                setIsNeedToNotify(checkNull(thisOrg?.IsNeedToNotify, true))
                setNotifyWhenNewOrder(checkNull(thisOrg?.NotifyWhenNewOrder, true))
                setNotifyWhenIIkoErrors(checkNull(thisOrg?.NotifyWhenIIkoErrors, true))
                setNotifyWhenOrderChanges(checkNull(thisOrg?.NotifyWhenOrderChanges, true))
                setTimezone(thisOrg?.Timezone)
                setCountTimeStepsPreorder(thisOrg?.CountTimeStepsPreorder != '0' ? thisOrg?.CountTimeStepsPreorder : '')
                setDisabled(checkNull(thisOrg?.Disabled, true))
                setTimeStep(checkNull(thisOrg?.TimeStep))
                setHavePreorder(checkNull(thisOrg?.HavePreorder, true))
                setCountTimeStepsReservation(thisOrg?.CountTimeStepsReservation != '0' ? thisOrg?.CountTimeStepsReservation : '')
                setTimeStepReservation(thisOrg?.TimeStepReservation != '0' ? thisOrg?.TimeStepReservation : '')
                setHaveReservation(checkNull(thisOrg?.HaveReservation, true))
                setNotifyWhenNewReservation(checkNull(thisOrg?.NotifyWhenNewReservation, true))
                setWeekTimes([
                    timeTransform(thisOrg?.MonTime == 'Closed' ? thisOrg?.MonTime : thisOrg?.MonTime?.split(','), 0), 
                    timeTransform(thisOrg?.TueTime == 'Closed' ? thisOrg?.TueTime : thisOrg?.TueTime?.split(','), 1), 
                    timeTransform(thisOrg?.WedTime == 'Closed' ? thisOrg?.WedTime : thisOrg?.WedTime?.split(','), 2),
                    timeTransform(thisOrg?.ThuTime == 'Closed' ? thisOrg?.ThuTime : thisOrg?.ThuTime?.split(','), 3),
                    timeTransform(thisOrg?.FriTime == 'Closed' ? thisOrg?.FriTime : thisOrg?.FriTime?.split(','), 4),
                    timeTransform(thisOrg?.SatTime == 'Closed' ? thisOrg?.SatTime : thisOrg?.SatTime?.split(','), 5),
                    timeTransform(thisOrg?.SunTime == 'Closed' ? thisOrg?.SunTime : thisOrg?.SunTime?.split(','), 6),
                ]);
                setRKeeperLogin(checkNull(thisOrg?.RKeeperLogin))
                setRKeeperIP(checkNull(thisOrg?.RKeeperIP))
                setRKeeperPort(checkNull(thisOrg?.RKeeperPort))
                setPrimehillToken(checkNull(thisOrg?.PrimehillToken))
                setHideInApp(checkNull(thisOrg?.HideInApp, true))
                setTimeForSelfPickup(checkNull(thisOrg?.TimeForSelfPickup))
                settransfer_to_call_center(thisOrg?.transfer_to_call_center)

            })
            os.getPols(token, {OrganisationID: orgId}).then(res => {
                if(res?.length > 0) {
                    setDelivery(true)
                    setPolList(res.filter(item => item.Disabled == '0').map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                } else {
                    setDelivery(false)
                }
            })
            os.getPay(token, {OrganisationID: orgId}).then(res => {
                setPm(res.filter(item => item.Disabled == '0').map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        }
    }, [orgId, brandId, token, settings, orgId])


    const addPayMethods = () => {
        const cs = pm;
        let csN = paymethods.map(i => Number(i.PaymentType))
        let pmN = cs.map(i => Number(i.PaymentType))
        let dif = csN.filter(n => pmN.indexOf(n) === -1);

        if(dif.length > 0) {
            const addItem = paymethods.find(i => Number(i.PaymentType) == dif[0])
            os.addPay(token, {
                OrganisationID: createdId ? createdId : orgId,
                Payments: [
                    {
                        PaymentType: addItem.PaymentType,
                        IsNeedToChangeCash: addItem.IsNeedToChangeCash ? '1' : '0'  
                    }
                ],
            }).then(res => {
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        }
    }

    const deletePayMethod = (index, id) => {
        os.deletePay(token, {
            ID: id
        }).then(res => {
            setPm(res.map(item => {
                return {
                    ...item,
                    value: pmValueFind(item.PaymentType)
                }
            }))
        })
    }

    //выбор таймзоны
    const selectTmz = (value, index) => {
        setTimezone(value);
    }

    //открыть модалку местоположения
    const openSelectLocation = () => {
        setSelectLocationModal(true)
    }

    //закрыть модалку местоположения
    const closeSelectLocation = () => {
        setSelectLocationModal(false)
    }

    //открыть модалку создания полигона
    const openSelectPoly = () => {
        setSelectPolyModal(true)
    }

    //закрыть модалку создания полигона
    const closeSelectPoly = () => {
        setEditPolygon(null)
        setSelectPolyModal(false)
    }

    //сохранить время
    const saveTime = (index, value) => {
        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }

    //выбрать местоположение
    const setLocation = (coords) => {
        setLattitude(coords.lat)
        setLongitude(coords.lng)
        setCoords({lat: coords.lat, lng: coords.lng})
    }

    //добавить изображение
    const uploadImage = (e) => {
        
        setThumbnailPrev(URL.createObjectURL(e.target.files[0]))
        setThumbnailPicture(e.target.files[0])
    }

    //сохранение изменений
    const orgSubmit = () => {
        LOCAL_STORAGE.setItem('gs-creating-org', '1')
        let weekArray = []
        if(weekTimes.length > 0) {
            weekArray = weekTimes.map(item => {
                if(!item.rest) {
                    return (
                        item.values?.map((i, ind) => {
                            return (
                                `${60 * Number(i.start.substring(0,2)) + Number(i.start.substring(3,5))}-${(60 * Number(i.end.substring(0,2))) + Number(i.end.substring(3,5))}`
                            )
                        }).join(',')
                    )
                }
                return 'Closed'
            }) 
        }
        const data = new FormData()
        data.append('PaymentSystemType', PaymentSystemType)
        data.append('IIkoID', IIkoID)
        data.append('IIkoIDTerminal', IIkoIDTerminal)
        data.append('OrganisationBrand', brandId != 'nobrand' && brandId ? brandId : 0)
        data.append('ItemOrder', ItemOrder)
        data.append('Name', Name)
        data.append('Name_kz', NameKz)
        data.append('Name_en', NameEn)

        data.append('Description', Description)
        if(ThumbnailPicture) {
            data.append('ThumbnailPicture', ThumbnailPicture)
        }
        data.append('HaveReservation', HaveReservation)
        //data.append('CountTimeStepsReservation', CountTimeStepsReservation)
        checkNumValue(data, 'CountTimeStepsReservation', CountTimeStepsReservation)

        // data.append('TimeStepReservation', TimeStepReservation)
        checkNumValue(data, 'TimeStepReservation', TimeStepReservation)

        data.append('HavePreorder', HavePreorder)
        data.append('Address', Address)
        data.append('Phone', Phone)
        data.append('Email', Email)
        data.append('BotChatID', BotChatID)
        //data.append('MinPriceForLocalSale', MinPriceForLocalSale)
        checkNumValue(data, 'MinPriceForLocalSale', MinPriceForLocalSale)

        data.append('LocalOrderSale', LocalOrderSale)
        checkNumValue(data, 'LocalOrderSale', LocalOrderSale)

        data.append('Lattitude', coords.lat)
        data.append('Longitude', coords.lng)

        data.append('IsHaveDelivery', IsHaveDelivery)
        data.append('IsHaveLocalOrder', IsHaveLocalOrder)
        data.append('TimetableDescription', TimetableDescription)
        data.append('MonTime', weekArray[0])
        data.append('TueTime', weekArray[1])
        data.append('WedTime', weekArray[2])
        data.append('ThuTime', weekArray[3])
        data.append('FriTime', weekArray[4])
        data.append('SatTime', weekArray[5])
        data.append('SunTime', weekArray[6])
        data.append('Timezone', Timezone)

        //data.append('CountTimeStepsPreorder', CountTimeStepsPreorder)
        checkNumValue(data, 'CountTimeStepsPreorder', CountTimeStepsPreorder)

        //data.append('TimeStep', TimeStep)
        checkNumValue(data, 'TimeStep',TimeStep)
        
        data.append('Disabled', Disabled)
        data.append('IsNeedToNotify', IsNeedToNotify)
        data.append('BotToken', BotToken)
        data.append('NotifyWhenIIkoErrors', NotifyWhenIIkoErrors)
        data.append('NotifyWhenNewOrder', NotifyWhenNewOrder)
        data.append('NotifyWhenOrderChanges', NotifyWhenOrderChanges)
        data.append('NotifyWhenNewReservation', NotifyWhenNewReservation);


        data.append('RKeeperLogin', RKeeperLogin)
        data.append('RKeeperIP', RKeeperIP)
        data.append('RKeeperPort', RKeeperPort)
        data.append('PrimehillToken', PrimehillToken)
        data.append('CanOverwrite', CanOverwrite)
        data.append('HideInApp', HideInApp)
        data.append('TimeForSelfPickup', TimeForSelfPickup)
        data.append('transfer_to_call_center', transfer_to_call_center)
        
        setSaveLoad(true) 
        if(!orgId) {
            os.addOrg(token, data).then(res => {
                if(res?.error) {
                    message.error(res.message)
                } else {
                    message.success('Организация создана')
                    setCreatedId(res)
                }
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
        if(orgId) {
            data.append('ID', orgId)    
            os.editOrg(token, data).then(res => {

                if(res?.error) {
                    message.error(res.message)
                } else {
                    nav(-1, {replace: true})
                    message.success('Организация успешно изменена')
                } 
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
    }
    
    //удаление
    const deleteOrg = () => {
        setDelLoad(true)
        os.deleteOrg(token, {ID: orgId}).then(res => {
            
            if(res?.error) {
                message.error(res.message)
            } else {
                nav(-1, {replace: true})
                message.success('Организация удалена')
            }
        }).finally(_ => {
            setDelLoad(false)
        })
    }

    //изменение полигона
    const editPolygonFunc = ({...item}) => {
        setEditPolygon(item)
        openSelectPoly()
    }

    const addPay = (item, selected) => {
        if(item.PaymentType != selected.PaymentType && !pm.find(i => i.PaymentType == item.PaymentType)) {
            os.addPay(token, {
                OrganisationID: createdId ? createdId : orgId,
                Payments: [
                    {
                        PaymentType: item.PaymentType,
                        IsNeedToChangeCash: item.IsNeedToChangeCash
                    }
                ]
            }).then(res => {
                if(res) {
                    message.success('Метод оплаты успешно добавлен')
                }
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        } else {
            message.info('Данный метод оплаты уже выбран')
        }
    }

    const deletePay = (ID) => {
        os.deletePay(token, {ID}).then(res => {
            if(res) {
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
                message.success('Метод оплаты удален')
            }
            
        })
    }

    const editPay = (item) => {
   
        os.editPay(token, item).then(res => {
            if(res) {
                
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            }
        })
    }
    
    useEffect(() => {
        if(!ThumbnailPrev || !Name) {
            LOCAL_STORAGE.removeItem('gs-creating-org')
        } else {
            LOCAL_STORAGE.setItem('gs-creating-org', '1')
        }
    }, [ThumbnailPrev, Name])

    useEffect(() => {
        return () => {
            if(LOCAL_STORAGE.getItem('gs-creating-org')) {

            } else {
                os.deleteOrg(token, {ID: orgId, Delete: 'hard'}).then(res => {
              
                }).finally(_ => {
                    window.location.reload()
                    LOCAL_STORAGE.removeItem('gs-creating-org')
                })
            }
        }
    }, [])

    const updatePolList = () => {
        os.getPols(token, {OrganisationID: orgId}).then(res => {
            if(res?.length > 0) {
                setDelivery(true)
                setPolList(res.filter(item => item.Disabled).map(item => {
                    return {
                        ...item,
                        Coordinates: item.Coordinats.split(' ').map(item => {
                            return {
                                lat: Number(item.slice(0, item.indexOf(','))),
                                lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                            }
                        }),
                        Coordinats: null,
                    }
                }))
            } else {
                setDelivery(false)
            }
        })
    }

    const selectPaySystem = (item) => {
        setPaymentSystemType(item)
    }

    const [confirmDelete, setConfirmDelete] = useState(false)

    const openDeleteConfirm = () => {
        setConfirmDelete(true)
    }

    const closeDeleteConfirm = () => {
        setConfirmDelete(false)
    }

    const deleteWithoutSave = () => {
        deleteOrg()
    }


    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="OrgsCreatePage page">
            
            <LocationModal
                setLocation={setLocation}
                visible={selectLocationModal}
                close={closeSelectLocation}
                coords={coords}
                />

            {/* Выйти без сохранения (удалить) */}
            
            {/* Удалить без сохранения */}
            <ConfirmModal 
                text={'Удалить организацию?'}
                cancel={deleteWithoutSave}
                visible={confirmDelete}
                close={closeDeleteConfirm}
                />
            <PolygonModal
                data={editPolygon}
                orgId={createdId ? createdId : orgId}
                setPolList={setPolList}
                visible={selectPolyModal}
                close={closeSelectPoly}
                />
            <PaymentEdit
                visible={payEditModal}
                onClose={() => setPayEditModal(false)}
                orgId={createdId ? createdId : orgId}
                currentList={pm}
                selected={selectedPay}
                setSelected={setSelectedPay}
                onEditPayment={editPay}
                onDeletePayment={deletePay}
                />
            <main className="Main">
                <div className="pageBody">
                    <div className="OrgsCreatePage__body pageBody-content">
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <PlUpload
                                            style={{height: 250, backgroundColor: '#F8F8F8'}}
                                            text={'Выбрать картинку'}
                                            id={'OrgPic'}
                                            accept={'.png, .jpeg, .bmp'}
                                            prev={ThumbnailPrev}
                                            onChange={uploadImage}
                                        />
                                    </div>
                                </Row>
                                <Row className="row-custom">
                                {
                                        switchCrm(settings, 
                                            <Col span={24}>
                                                <Checkbox
                                                    id={'CanOverwrite'}
                                                    checked={CanOverwrite == '1'}
                                                    text={`Разрешить iiko перезаписывать организацию`}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setCanOverwrite('1')
                                                        } else {
                                                            setCanOverwrite('0')
                                                        }
                                                    }} 
                                                    />
                                            </Col>    ,
                                            <Col span={24}>
                                                <Checkbox
                                                    id={'CanOverwrite'}
                                                    checked={CanOverwrite == '1'}
                                                    text={`Разрешить RKeeper перезаписывать организацию`}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setCanOverwrite('1')
                                                        } else {
                                                            setCanOverwrite('0')
                                                        }
                                                    }} 
                                                    />
                                            </Col>,
                                            <Col span={24}>
                                                <Checkbox
                                                    id={'CanOverwrite'}
                                                    checked={CanOverwrite == '1'}
                                                    text={`Разрешить 1C перезаписывать организацию`}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setCanOverwrite('1')
                                                        } else {
                                                            setCanOverwrite('0')
                                                        }
                                                    }} 
                                                    />
                                            </Col>,
                                            <Col span={24}>
                                            <Checkbox
                                                id={'CanOverwrite'}
                                                checked={CanOverwrite == '1'}
                                                text={`Разрешить FrontPad перезаписывать организацию`}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setCanOverwrite('1')
                                                    } else {
                                                        setCanOverwrite('0')
                                                    }
                                                }} 
                                                />
                                        </Col>
                                        )
                                    }
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox
                                        id={'sendOrderKC'}
                                        text={'Отправлять заказы на КЦ'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                settransfer_to_call_center('1')
                                            } else {
                                                settransfer_to_call_center('0')
                                            }
                                        }}
                                        checked={transfer_to_call_center == '1'}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    {
                                        checkIsBao() ? (
                                            <Tabs defaultActiveKey="1" items={nameTabs} onChange={() => {}} style={{ width: '100%'}} />
                                        ) : nameTabs[0].children
                                    }
                                </Row>
                                <Row className='row-custom'>
                                    <Text value={Description} onChange={(e) => setDescription(e.target.value)} height={180} placeholder={'Описание'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Input maskType={String} value={Address} onChange={(e) => setAddress(e.target.value)} placeholder={'Адрес'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input maskType={String} value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder={'Телефон'}/>
                                </Row>  
                                

                                {
                                    settings?.IsHaveIIko == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={IIkoIDTerminal} onChange={(e) => setIIkoIDTerminal(e.target.value)} placeholder={'ID кассовой станции'}/>
                                            </Row>  
                                        </>
                                        
                                    ) : null 
                                } 
                                <Row className='row-custom'>
                                    {
                                        switchCrm(settings, 
                                            <Input

                                                maskType={String} 
                                                value={IIkoID} 
                                                onChange={(e) => setIIkoID(e.target.value)} 
                                                placeholder={`ID в iIko`}/>,
                                            
                                                <Input

                                                maskType={String} 
                                                value={IIkoID} 
                                                onChange={(e) => setIIkoID(e.target.value)} 
                                                placeholder={`ID в RKeeper`}/>,
                                                <Input

                                                maskType={String} 
                                                value={IIkoID} 
                                                onChange={(e) => setIIkoID(e.target.value)} 
                                                placeholder={`ID в 1C`}/>,
                                                <Input

                                                maskType={String} 
                                                value={IIkoID} 
                                                onChange={(e) => setIIkoID(e.target.value)} 
                                                placeholder={`ID в FrontPad`}/>
                                        )
                                    }
                                    
                                </Row> 
                                {
                                    settings?.IsHaveRKeeper == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={RKeeperLogin} onChange={(e) => setRKeeperLogin(e.target.value)} placeholder={'Логин RKeeper'}/>
                                            </Row>  
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={RKeeperIP} onChange={(e) => setRKeeperIP(e.target.value)} placeholder={'IP RKeeper'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={RKeeperPort} onChange={(e) => setRKeeperPort(e.target.value)} placeholder={'Порт RKeeper'}/>
                                            </Row> 
                                            
                                        </>
                                    ) : null
                                }
                                {
                                    settings?.IsHavePrimehill == '1' ? (
                                        <Row className='row-custom'>
                                            <Input maskType={String} value={PrimehillToken} onChange={(e) => setPrimehillToken(e.target.value)} placeholder={'Токен PrimeHill'}/>
                                        </Row> 
                                    ) : null
                                }
                                 
                                <Row className='row-custom'>
                                    <Input scale={5} value={MinPriceForLocalSale} onChange={(e) => setMinPriceForLocalSale(e.target.value)} placeholder={'Минимальная сумма заказа'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={LocalOrderSale} onChange={(e) => setLocalOrderSale(e.target.value)} placeholder={'Скидка на самовывоз отсюда'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Input
                                        value={TimeForSelfPickup}
                                        onChange={e => setTimeForSelfPickup(e.target.value)}
                                        placeholder="Время самовывоза"
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={IsHaveLocalOrder == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsHaveLocalOrder('1')
                                            } else {
                                                setIsHaveLocalOrder('0')
                                            }
                                        }} 
                                        id={'IsHaveLocalOrder'} 
                                        text={'Можно заказать отсюда'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input
                                        value={Timezone}
                                        onChange={e => setTimezone(e.target.value)}
                                        maskType={String}
                                        placeholder={'Часовой пояс'}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Input 
                                        maskType={String}
                                        value={TimetableDescription} 
                                        onChange={(e) => setTimetableDescription(e.target.value)} 
                                        placeholder={'Описание времени работы'}
                                        />
                                </Row> 
                                <Row className='row-custom'>
                                    <TimeSelect 
                                        save={saveTime} 
                                        list={weekTimes}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox
                                        checked={HideInApp == '1'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                setHideInApp('1')
                                            } else {
                                                setHideInApp('0')
                                            }
                                        }}
                                        id="HideInApp"
                                        text={'Скрыть в приложении'}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={IsNeedToNotify == '1'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                setIsNeedToNotify('1')
                                            } else {
                                                setIsNeedToNotify('0')
                                            }
                                        }}
                                        id={'3'} 
                                        text={'Уведомления в телеграм-боте и на E-Mail'}/>
                                </Row>  
                                {
                                    IsNeedToNotify == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input value={BotToken} onChange={(e) => setBotToken(e.target.value)} placeholder={'API-key бота'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input
                                                    maskType={String} 
                                                    value={BotChatID} 
                                                    type={'text'}
                                                    onChange={(e) => setBotChatID(e.target.value)} 
                                                    placeholder={'Chat ID бота'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input
                                                    maskType={String} 
                                                    value={Email} 
                                                    type={'email'}
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    placeholder={'Email'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Checkbox 
                                                    checked={NotifyWhenNewOrder == '1'} 
                                                    onChange={(e) => {
                                                        if(e.target.checked) {
                                                            setNotifyWhenNewOrder('1')
                                                        } else {
                                                            setNotifyWhenNewOrder('0')
                                                        }
                                                    }} 
                                                    id={'NotifyWhenNewOrder'} 
                                                    text={'Уведомлять о новых заказах'}
                                                    />
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Checkbox
                                                    checked={NotifyWhenNewReservation == '1'}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setNotifyWhenNewReservation('1')
                                                        } else {
                                                            setNotifyWhenNewReservation('0')
                                                        }
                                                    }}
                                                    id="NotifyWhenNewReservation"
                                                    text={'Уведомлять о новых бронях'}
                                                    />
                                            </Row>
                                            {/* {
                                                settings?.IsHaveIIko == '1' || settings?.IsHaveIIko == '1' ? (
                                                    <Row className='row-custom'>
                                                        <Checkbox 
                                                            checked={NotifyWhenIIkoErrors == '1'} 
                                                            onChange={(e) => {
                                                                if(e.target.checked) {
                                                                    setNotifyWhenIIkoErrors('1')
                                                                } else {
                                                                    setNotifyWhenIIkoErrors('0')
                                                                }
                                                            }} 
                                                            id={'NotifyWhenIIkoErrors'} 
                                                            text={
                                                                settings?.IsHaveIIko == '1' ? 
                                                                'Уведомлять об ошибках Iiko' : 
                                                                'Уведомлять об ошибках RKeeper'
                                                            }
                                                            />
                                                    </Row> 
                                                ) : null
                                            } */}
                                            {
                                                switchCrm(settings,
                                                    <Row className='row-custom'>
                                                        <Checkbox 
                                                            checked={NotifyWhenIIkoErrors == '1'} 
                                                            onChange={(e) => {
                                                                if(e.target.checked) {
                                                                    setNotifyWhenIIkoErrors('1')
                                                                } else {
                                                                    setNotifyWhenIIkoErrors('0')
                                                                }
                                                            }} 
                                                            id={'NotifyWhenIIkoErrors'} 
                                                            text={'Уведомлять об ошибках Iiko'}
                                                            />
                                                    </Row>  ,
                                                    <Row className='row-custom'>
                                                        <Checkbox 
                                                            checked={NotifyWhenIIkoErrors == '1'} 
                                                            onChange={(e) => {
                                                                if(e.target.checked) {
                                                                    setNotifyWhenIIkoErrors('1')
                                                                } else {
                                                                    setNotifyWhenIIkoErrors('0')
                                                                }
                                                            }} 
                                                            id={'NotifyWhenIIkoErrors'} 
                                                            text={'Уведомлять об ошибках RKeeper'}
                                                            />
                                                    </Row>   ,
                                                      <Row className='row-custom'>
                                                      <Checkbox 
                                                          checked={NotifyWhenIIkoErrors == '1'} 
                                                          onChange={(e) => {
                                                              if(e.target.checked) {
                                                                  setNotifyWhenIIkoErrors('1')
                                                              } else {
                                                                  setNotifyWhenIIkoErrors('0')
                                                              }
                                                          }} 
                                                          id={'NotifyWhenIIkoErrors'} 
                                                          text={'Уведомлять об ошибках 1C'}
                                                          />
                                                  </Row>   ,
                                                  <Row className='row-custom'>
                                                  <Checkbox 
                                                      checked={NotifyWhenIIkoErrors == '1'} 
                                                      onChange={(e) => {
                                                          if(e.target.checked) {
                                                              setNotifyWhenIIkoErrors('1')
                                                          } else {
                                                              setNotifyWhenIIkoErrors('0')
                                                          }
                                                      }} 
                                                      id={'NotifyWhenIIkoErrors'} 
                                                      text={'Уведомлять об ошибках FrontPad'}
                                                      />
                                              </Row>   
                                                )
                                            }
                                 
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={NotifyWhenOrderChanges == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setNotifyWhenOrderChanges('1')
                                            } else {
                                                setNotifyWhenOrderChanges('0')
                                            }
                                        }} 
                                        id={'NotifyWhenOrderChanges'} 
                                        text={'Уведомлять об изменениях в заказах'}
                                        />
                                </Row>  
                                        </>
                                    ) : null
                                }  
                                <Row className='row-custom'>
                                    <Button 
                                        styles={{width: '100%'}} 
                                        onClick={orgSubmit} 
                                        
                                        disabled={!Name} 
                                        load={saveLoad}
                                        before={<SaveIcon size={20} color={'#fff'}/>} 
                                        text={'Сохранить'} 
                                        type={'button'}
                                        justify={'flex-start'}/>
                                    {
                                        orgId ? (
                                            <Button 
                                            styles={{width: '100%', marginTop: 10}} 
                                            onClick={openDeleteConfirm} 
                                            disabled={false} 
                                            load={delLoad} 
                                            before={<BsTrash size={20}/>} 
                                            text={'Удалить'} 
                                            type={'button'}
                                            variant={'danger'}
                                            justify={'flex-start'}/>
                                        ) : null
                                    }
                                </Row>      
                            </Col>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <div className="panel-label">
                                            Местоположение на карте
                                        </div>
                                        {
                                            coords ? (
                                                <div style={{height: 250}} onClick={openSelectLocation}>
                                                    <MapMarker 
                                                    id="location-map"
                                                    readOnly
                                                    coords={coords} 
                                                    />

                                                </div>
                                                
                                            ) : (
                                            <Pl 
                                                onClick={openSelectLocation}
                                                style={{height: 200, backgroundColor: '#F8F8F8'}} 
                                                text={'Выбрать на карте'}/>
                                            )
                                        }
                                    </div>
                                </Row>
                                {
                                    createdId || orgId ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Col span={12}>
                                                <Checkbox 
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setIsHaveDelivery('1')
                                                        } else {
                                                            setIsHaveDelivery('0')
                                                        }
                                                    }} 
                                                    checked={IsHaveDelivery == '1'} 
                                                    id={'IsHaveDelivery'} 
                                                    text={'Есть доставка'}/>
                                                </Col>     

                                                {
                                                    IsHaveDelivery == '1' ? (
                                                        <Col span={12}>
                                                            <UploadKml 
                                                                openMap={openSelectPoly} 
                                                                updatePolList={updatePolList}
                                                                />
                                                        </Col>
                                                    ) : null
                                                }
                                            </Row> 
                                            {
                                                IsHaveDelivery == '1' ? (
                                                    <Row className='row-custom' gutter={[30, 30]}>
                                                        {
                                                            polList && polList.length > 0 ? (
                                                                polList.map((item, index) => (
                                                                    <Col span={12} key={index}>
                                                                        <div onClick={() => {
                                                                            editPolygonFunc({...item})
                                                                        }} className="panel" style={{height: 275}}>
                                                                            <MapPolygonPic
                                                                                name={item?.Name}
                                                                                polygonCoords={item?.Coordinates}
                                                                                color={item?.Color}
                                                                                />
                                                                        </div>
                                                                    </Col>
                                                                ))
                                                            ) : null
                                                        }
                                                        <Col span={12} >
                                                            <div className="panel" style={{height: 275}}>
                                                                <Pl 
                                                                    onClick={openSelectPoly}
                                                                    text={'Добавить полигон доставки'}/>
                                                            </div>
                                                        </Col>
                                                    </Row>  
                                                ) : null
                                            }
                                            <Row className='row-custom'>
                                                {
                                                    pm && pm.length > 0 ? (
                                                        pm.map((item, index) => (
                                                            <PayMethods
                                                                openEditModal={() => setPayEditModal(true)}
                                                                key={index}
                                                                selected={item}
                                                                list={paymethods}
                                                                onCashbackChange={editPay}
                                                                onChange={addPay}
                                                                onDelete={deletePay}
                                                                onSelect={setSelectedPay}
                                                            />
                                                        ))
                                                    ) : null
                                                }
                                                {
                                                    pm?.length < 4 ? (
                                                        <div className="panel" style={{padding: 0}}>
                                                            <Pl onClick={addPayMethods} text={'Добавить способ оплаты'}/>
                                                        </div>
                                                    ) : null
                                                }
                                    
                                            </Row>  
                                        </>
                                    ) : null
                                }
                               
                                <Row className='row-custom'>
                                    <Checkbox 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setHavePreorder('1')
                                            } else {
                                                setHavePreorder('0')
                                                setCountTimeStepsPreorder('')
                                                setTimeStep('')
                                            }
                                        }} 
                                        checked={HavePreorder == '1'} 
                                        id={'preOrder'} 
                                        text={'Есть предзаказ'}/>
                                </Row>
                                {
                                    HavePreorder == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={TimeStep} 
                                                    onChange={(e) => setTimeStep(e.target.value)} 
                                                    placeholder={'Шаг выбора времени предзаказа (в минутах)'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={CountTimeStepsPreorder}
                                                    onChange={(e) => setCountTimeStepsPreorder(e.target.value)} 
                                                    placeholder={'Максимальное количество шагов'}/>
                                            </Row> 
                                        </>
                                    ) : null
                                }  
                                
                                {
                                    checkDomain(<>
                                        <Row className='row-custom'>
                                            <Checkbox 
                                                checked={HaveReservation == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setHaveReservation('1')
                                                    } else {
                                                        setHaveReservation('0')
                                                        setCountTimeStepsReservation('')
                                                        setTimeStepReservation('')
                                                    }
                                                }}
                                                id={HaveReservation}
                                                text={'Есть бронирование столика'}/>
                                        </Row>  
                                        {
                                            HaveReservation == '1' ? (
                                                <>
                                                    <Row className='row-custom'>
                                                        <Input 
                                                            value={TimeStepReservation} 
                                                            onChange={(e) => setTimeStepReservation(e.target.value)}
                                                            placeholder={'Шаг выбора времени бронирования (в минутах)'}/>
                                                    </Row> 
                                                    <Row className='row-custom'>
                                                        <Input 
                                                            value={CountTimeStepsReservation} 
                                                            onChange={(e) => setCountTimeStepsReservation(e.target.value)} 
                                                            placeholder={'Максимальное количество шагов'}/>
                                                    </Row> 
                                                </>
                                            ) : null
                                        }
                                    </>, null)
                                }
                                
                                <Row className='row-custom'>
                                    <div className="def-label">Выбор платежной системы</div>
                                    <DropCollapse
                                        // value={}
                                        selectItem={selectPaySystem}
                                        value={PaymentSystemType}
                                        beforeIcon
                                        justify={'justifyLeft'}
                                        // shadow
                                        list={paymentTypes}
                                        />
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default OrgsNewPage;