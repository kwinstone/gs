import {Modal, Row, Col, message, Tabs} from 'antd';
import './CreateCategory.scss';
import { useState, useEffect, useCallback } from 'react';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import {BsTrash} from 'react-icons/bs';
import Pl from '../../../../components/Pl/Pl';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';
import orgService from '../../../../services/orgService';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';
import switchCrm from '../../../../funcs/switchCrm';
import SelectOrg from '../../../../components/SelectOrg/SelectOrg';
import EditHr from '../../../../components/EditHr/EditHr';

//week timetable
import weektimes from './weektimes';
import TimeSelect from '../../../orgs/orgsCreate/components/timeSelect/TimeSelect';
import {MdContentCopy} from 'react-icons/md'
import {checkIsBao} from "../../../../utils/checkIsBao";




const os = new orgService()
const cs = new catService()

const CreateCategory = ({visible,close, updateList, editItem, setSelectedCat}) => {
    const {token, settings} = useSelector(state => state)
    const [Name, setName] = useState('')
    const [NameKz, setNameKz] = useState('')
    const [NameEn, setNameEn] = useState('')

    const nameTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder={'Название категории'}/>,
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={NameKz}
                onChange={(e) => setNameKz(e.target.value)}
                placeholder={'Название категории на казахском'}/>,
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={NameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder={'Название категории на английском языке'}/>,
        },
    ];

    const [ID, setID] = useState('')
    const [IIkoID, setIIkoID] = useState('')
    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [orgsList, setOrgsList] = useState([])
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState('0')
    const [ItemOrder, setItemOrder] = useState(0)
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(1)
    const [isHideInOrg, setIsHideInOrg] = useState(false)
    const [HideInApp, setHideInApp] = useState('0')

    const [hideOrgModal, setHideOrgModal] = useState(false)

    const [editChildTimeTable, setEditChildTimeTable] = useState(false);
    const [weekTimes, setWeekTimes] = useState(weektimes)
    const [timeTableLoad, setTimeTableLoad] = useState(false)

    const [cloneLoad, setCloneLoad] = useState(false)

    const openHideOrgModal = () => setHideOrgModal(true)
    const closeHideOrgModal = () => setHideOrgModal(false)

    const handleClose = () => {
        setSelectedCat(null)
        setName('')
        setNameKz('')
        setNameEn('')

        setIsHideInOrg(false)
        setOrgsList([])
        setIIkoID('')
        setID('')
        setHideInApp('0')
        close();
    }

 

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


    useEffect(() => {
        if(editItem && orgs?.length > 0 && visible) {
            console.log('edt', editItem)
            setHideInApp(editItem?.HideInApp)
            setName(editItem.Name)
            setNameKz(editItem?.Name_kz)
            setNameEn(editItem?.Name_en)

            setIIkoID(editItem.IIkoID)
            setIsHideInOrg(editItem.HiddenInOrganisations && editItem.HiddenInOrganisations != '/' ? true : false)
            if(editItem.HiddenInOrganisations && editItem.HiddenInOrganisations != '/') {
                let array = editItem.HiddenInOrganisations.split('//')
                setOrgsList(array.map((item, index) => {
                    if(index == 0) { 
                        return {
                            ID: item.replace(/\//g,''),
                            value: orgs.find(i => i.ID == item.replace(/\//g,''))?.value
                        }
                    }
                    if(index == array.length - 1) {
                        return {
                            ID: item.replace(/\//g,''),
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
            setCanOverwriteByIIko(editItem.CanOverwriteByIIko)
            setItemOrder(editItem.ItemOrder)
            setAllowedDeliveryTypes(editItem.AllowedDeliveryTypes)
            setID(editItem.ID)
        }
    }, [editItem, orgs, visible])

    

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
        } else {
            setOrgsList([orgs[0]])
        }
    }

  


    const createCat = () => {
        setLoad(true)
        const data = {
            // OrganisationID: '',
            IIkoID,
            CanOverwriteByIIko,
            Name,
            Name_kz: NameKz,
            Name_en: NameEn,
            HiddenInOrganisations: orgsList.length > 0 ? orgsList.filter(i => i?.ID !== 'All').map(item => `/${item.ID}`).join('/') + '/' : '',
            AllowedDeliveryTypes,
            HideInApp
        }
        cs.addCat(token, data).then(res => {

            window.location.reload()
            // dispatch(catalogUpdate(res))
            // updateList(res)
        }).finally(_ => {
            setLoad(false)
            handleClose()
        })
    }

    const deleteCat = () => {
        setDelLoad(true)
        cs.delCat(token, {ID}).then(res => {
            window.location.reload()
            // updateList(res)
            // dispatch(catalogUpdate(res))
        }).finally(_ => {
            setDelLoad(false)
            handleClose()
        })
    }

    const editCat = () => {
        setLoad(true)
        const data = {
            ID,
            IIkoID,
            CanOverwriteByIIko,
            // ItemOrder,
            Name,
            Name_kz: NameKz,
            Name_en: NameEn,
            HiddenInOrganisations: orgsList?.length > 0 ? orgsList.filter(i => i?.ID !== 'All').map(item => `/${item.ID}`).join('/') + '/' : '',
            AllowedDeliveryTypes,
            HideInApp
        }
        cs.editCat(token, data).then(res => {
            // window.location.reload()
            updateList(res)
        }).finally(_ => {
            setLoad(false)
            handleClose()
        })
    }

    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const openDeleteConfirm = () => setDeleteConfirm(true)
    const closeDeleteConfirm = () => setDeleteConfirm(false)
    const deleteConfirmAccept = () => {
        deleteCat()
        closeDeleteConfirm();
    }


    const saveTime = (index, value) => {
        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }


    const onSaveTimeTable = useCallback(() => {
        if(editChildTimeTable) {
            setTimeTableLoad(true)
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

            const body = {
                CategoryID: ID,
                SubCategoryID: '',
                MonTime: weekArray[0],
                TueTime: weekArray[1],
                WedTime: weekArray[2],
                ThuTime: weekArray[3],
                FriTime: weekArray[4],
                SatTime: weekArray[5],
                SunTime: weekArray[6]
            }
            cs.changeTimeItems(token, body).then(res => {
                // console.log(res)
                if(res) {
                    message.success('Изменено успешно')
                    setEditChildTimeTable(false)
                } else {
                    message.error('Произошла ошибка')
                }
            }).finally(_ => setTimeTableLoad(false))
        }   
    }, [editChildTimeTable, ID, token, weekTimes])

    const onCancelTimeTable = useCallback(() => {    
        setEditChildTimeTable(false)
    }, [])

    const cloneElement = () => {
        if(token && editItem?.ID) {
            setCloneLoad(true)
            cs.cloneItem(token, {id: editItem?.ID,element:'category'}).then(res => {
                if(res === 200) {
                    window.location?.reload()
                } else {
                    message.error('Произошла ошибка')
                }
            }).finally(() => {
                setCloneLoad(false)
            })
        }
    }
    


    return (
        <Modal className='Modal' open={visible} width={700} onCancel={handleClose}>
            <ConfirmModal
                text={'Удалить категорию'}
                visible={deleteConfirm}
                cancel={deleteConfirmAccept}
                close={closeDeleteConfirm}
                />
            <SelectOrg
                visible={hideOrgModal}
                close={closeHideOrgModal}
                list={orgs}
                selected={orgsList}
                setSelected={setOrgsList}
                />
            <h2 className="Modal__head">
                {
                    editItem ? (
                        'Редактировать категорию'
                    ) : (
                        'Добавить категорию'
                    )
                }
            </h2>
            <form className="Modal__form">
                {
                    switchCrm(settings, 
                        <div className="Modal__form_row">
                            <Checkbox
                                shadow={true}
                                checked={CanOverwriteByIIko == '1'}
                                onChange={e => {
                                    if(e.target.checked) {
                                        setCanOverwriteByIIko('1')
                                    } else {
                                        setCanOverwriteByIIko('0')
                                    }
                                }}
                                id={'CanOverwriteByIIko'}
                                text={`Разрешить iiko перезаписывать категорию`}
                                />
                        </div>,
                        <div className="Modal__form_row">
                            <Checkbox
                                shadow={true}
                                checked={CanOverwriteByIIko == '1'}
                                onChange={e => {
                                    if(e.target.checked) {
                                        setCanOverwriteByIIko('1')
                                    } else {
                                        setCanOverwriteByIIko('0')
                                    }
                                }}
                                id={'CanOverwriteByIIko'}
                                text={`Разрешить RKeeper перезаписывать категорию`}
                                />
                        </div>,
                         <div className="Modal__form_row">
                            <Checkbox
                                shadow={true}
                                checked={CanOverwriteByIIko == '1'}
                                onChange={e => {
                                    if(e.target.checked) {
                                        setCanOverwriteByIIko('1')
                                    } else {
                                        setCanOverwriteByIIko('0')
                                    }
                                }}
                                id={'CanOverwriteByIIko'}
                                text={`Разрешить 1C перезаписывать категорию`}
                                />
                        </div>,
                        <div className="Modal__form_row">
                        <Checkbox
                            shadow={true}
                            checked={CanOverwriteByIIko == '1'}
                            onChange={e => {
                                if(e.target.checked) {
                                    setCanOverwriteByIIko('1')
                                } else {
                                    setCanOverwriteByIIko('0')
                                }
                            }}
                            id={'CanOverwriteByIIko'}
                            text={`Разрешить FrontPad перезаписывать категорию`}
                            />
                    </div>
                    )
                }
                
                <div className="Modal__form_row">
                    {
                        checkIsBao() ? (
                            <Tabs defaultActiveKey="1" items={nameTabs} onChange={() => {}} style={{ width: '100%'}} />
                        ) : nameTabs[0].children
                    }
                </div>
                {
                    switchCrm(settings, 
                        <div className="Modal__form_row">
                            <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={`ID в iIko`}/>
                        </div>,
                        <div className="Modal__form_row">
                            <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={`ID в RKeeper`}/>
                        </div>,
                         <div className="Modal__form_row">
                            <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={`ID в 1C`}/>
                        </div>,
                         <div className="Modal__form_row">
                         <Input
                             maskType={String}
                             shadow={true}
                             value={IIkoID}
                             onChange={(e) => setIIkoID(e.target.value)} 
                             placeholder={`ID в FrontPad`}/>
                     </div>
                    )
                }
                <div className="Modal__form_row">
                    <Checkbox shadow={true} checked={HideInApp == '1'} onChange={(e) => {
                        if(e.target.checked) {
                            setHideInApp('1')
                        } else {
                            setHideInApp('0')
                        }
                    }} id={'HideInApp'} text={'Скрыть в приложении'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox shadow={true} checked={isHideInOrg} onChange={(e) => {
                        setIsHideInOrg(e.target.checked)
                        if(!e.target.checked) {
                            setOrgsList([])
                        }
                    }} id={'HiddenInOrganisations'} text={'Скрыть в организациях'}/>
                </div>
                {
                    isHideInOrg ? (
                        <>
                        {
                            orgsList?.length == 0 ? (
                                <div className="Modal__form_row">
                                    <Pl shadow={true} onClick={openHideOrgModal} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                </div>
                            ) : (
                                <div className="Modal__form_row">
                                    <Pl
                                        style={{color: 'var(--violet)'}}
                                        styles={{width: '100%'}}
                                        onClick={openHideOrgModal}
                                        shadow
                                        text={`Выбрано организаций ${orgsList?.length}`}
                                        />
                                </div>
                            )
                        }
                        </>
                    ) : null
                }
                {
                    editItem ? (
                        <div className="Modal__form_row">
                            {
                                editChildTimeTable ? (
                                    <Row gutter={[10,10]}>
                                        <Col span={24}>
                                            <TimeSelect
                                            shadow
                                            list={weekTimes}
                                            plate={true} save={saveTime}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <Row gutter={[10,10]}>
                                                <Col span={12}>
                                                    <Button onClick={onSaveTimeTable} type={'button'} text={'Сохранить'} styles={{width: '100%'}}/>
                                                </Col>
                                                <Col span={12}>
                                                    <Button onClick={onCancelTimeTable} type={'button'} text={'Отмена'} variant={'danger'} styles={{width: '100%'}}/>
                                                </Col>
                                            </Row>
                                            
                                        </Col>
                                    </Row>
                                    
                                ) : (
                                    <Button onClick={() => setEditChildTimeTable(true)} text={'Изменить расписание у дочерних элементов'} styles={{width: '100%'}}/>
                                )
                            }
                        </div>
                    ) : null
                }
                {
                    editItem?.ID && (
                        <div className="Modal__form_row">
                            <EditHr
                                onSave={cs.editParentSubList}
                                type="all"
                                ID={editItem.ID}
                                buttonLabel={'Изменить иерархию у всех дочерних элементов'}
                                shadow={true}
                                isPlate={false}
                                />
                        </div>
                    )
                }
                
                <div className="Modal__form_action">
                    {
                        editItem ? (
                            <Row gutter={[20,20]}>
                                <Col span={24}>
                                    <Button
                                        text={'Создать копию категории'}
                                        justify={'flex-start'}
                                        before={<MdContentCopy size={20} color={"#fff"}/>}
                                        // disabled
                                        onClick={cloneElement}
                                        load={cloneLoad}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Button 
                                        onClick={editCat} 
                                        load={load} 
                                        disabled={!Name}
                                        type={'button'} 
                                        before={<SaveIcon size={20} color={"#fff"}/>} 
                                        justify={'flex-start'} 
                                        text={'Сохранить'}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Button 
                                        onClick={openDeleteConfirm} 
                                        load={delLoad} 
                                        type={'button'} 
                                        before={<BsTrash size={20}/>} 
                                        justify={'flex-start'} 
                                        text={'Удалить'}
                                        variant={'danger'}
                                        />
                                </Col>
                            </Row>
                            
                        ) : (
                            <Button 
                                onClick={createCat} 
                                load={load} 
                                disabled={!Name}
                                type={'button'} 
                                before={<SaveIcon color={'#fff'} size={20}/>} 
                                justify={'flex-start'} 
                                text={'Создать'}
                                />
                        )
                    }
                   
                </div>
            </form>
        </Modal>
    )
}

export default CreateCategory;