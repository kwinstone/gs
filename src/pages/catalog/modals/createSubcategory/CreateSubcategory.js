import './CreateSubcategory.scss';
import { message, Modal } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import {BsTrash} from 'react-icons/bs';
import Pl from '../../../../components/Pl/Pl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import catService from '../../../../services/catService';
import {Row, Col} from 'antd';
import PlUpload from '../../../../components/PlUpload/PlUpload';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';
import switchCrm from '../../../../funcs/switchCrm';
import orgService from '../../../../services/orgService';
import SelectOrg from '../../../../components/SelectOrg/SelectOrg';
import EditHr from '../../../../components/EditHr/EditHr';

//week timetable
import weektimes from '../createCategory/weektimes';
import TimeSelect from '../../../orgs/orgsCreate/components/timeSelect/TimeSelect';
import { MdContentCopy } from 'react-icons/md';



const os = new orgService()
const cs = new catService()

const CreateSubcategory = ({visible, close, update, data}) => {
    const {token, settings} = useSelector(state => state)
    const {categoryId, subcategoryId} = useParams();
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [Name, setName] = useState('')
    const [Picture, setPicture] = useState(null)
    const [IIkoID, setIIkoID] = useState('')
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState('11111111')
    const [ID, setID] = useState(null)
    const [prev, setPrev] = useState(null)
    const [HideInApp, setHideInApp] = useState('0')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [isHideInOrg, setIsHideInOrg] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [orgsList, setOrgsList] = useState([])
    const [is_only_for_stories, setis_only_for_stories] = useState('0')

    //overrite
    const [ovHierarchy, setOvHierarchy] = useState('0'); // 1 значение
    const [ovEdit, setOvEdit] = useState('0') // 2 значение


    const [hideOrgModal, setHideOrgModal] = useState(false)

    const [editChildTimeTable, setEditChildTimeTable] = useState(false);
    const [weekTimes, setWeekTimes] = useState(weektimes)
    const [timeTableLoad, setTimeTableLoad] = useState(false)

    const [cloneLoad, setCloneLoad] = useState(false)

    const openHideOrgModal = () => setHideOrgModal(true)
    const closeHideOrgModal = () => setHideOrgModal(false)


    const closeHandle = () => {
        setName('')
        setIIkoID('')
        setCanOverwriteByIIko('')
        setOrgsList([])
        setIsHideInOrg(false)
        setID(null)
        close();
        setPicture(null)
        setPrev(null)
        setHideInApp('0')   
        setOvHierarchy('0')
        setOvEdit('0')
    }

    useEffect(() => {
        if(data) {
            console.log(data)
            setis_only_for_stories(data?.is_only_for_stories)
            setHideInApp(data?.HideInApp)
            setName(data?.Name)
            setIIkoID(data?.IIkoID)
            setCanOverwriteByIIko(data?.CanOverwriteByIIko)
            setID(data?.ID)
            setPicture(data?.Pictures[0])
            setPrev(data?.Pictures[0]?.Picture || data?.ThumbnailPicture)
            setIsHideInOrg(data.HiddenInOrganisations && data.HiddenInOrganisations != '/' ? true : false)
            if(data.HiddenInOrganisations && data.HiddenInOrganisations != '/') {
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
            
            setOvHierarchy(data?.CanOverwriteByIIko[0])
            setOvEdit(data?.CanOverwriteByIIko[1])
            // setOvHierarchy(data?.CanOverwriteByIIko[2])
        }
    }, [data, orgs])


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

    
    const addImg = (e) => {
        if(ID) {
        
            const body = new FormData();
            body.append('Picture', e.target.files[0])
            body.append('ItemID', ID)
            cs.addPlateImg(token, body).then(res => {
                if(res) {
                    setPicture(res[0])
                    setPrev(res[0].Picture)
                }
            })
        } else {
            setPicture(e.target.files[0])
            setPrev(URL.createObjectURL(e.target.files[0]))
        }
        
    }

    const deleteImg = (id) => {
        if(id) {
            cs.deletePlateImg(token, {ID: id}).then(res => {
                if(res.error == '0') {
                    setPicture(null)
                    setPrev(null)
                } else {
                    message.error('Произошла ошибка')
                }
            })
        } else {
            setPicture(null)
            setPrev(null)
        }
        
    }


    


    const onSubmit = () => {
        setSaveLoad(true)
        const body = new FormData();
        body.append('HideInApp', HideInApp)
        body.append('Name', Name)
        body.append('IIkoID', IIkoID)
        body.append('IsSubCategory', '1')
        body.append('ParentID', subcategoryId ? subcategoryId : 0)
        body.append('CategoryID', categoryId)
        body.append('Picture', Picture)
        body.append('HiddenInOrganisations',orgsList.length > 0 ? orgsList.filter(i => i?.ID !== 'All').map(item => `/${item.ID}`).join('/') + '/' : '')
        body.append('is_only_for_stories', is_only_for_stories)
        
        
        if(!data) {
            cs.addProd(token, body).then(res => {
                
            }).finally(_ => {
                update()
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            body.append('ID', ID)
            body.append('CanOverwriteByIIko', `${ovHierarchy}${ovEdit}111111`)

            cs.editProd(token, body).then(res => {
                
            }).finally(_ => {
                update()
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.delProd(token, {
            ID: ID,
            // Delete: 'hard'
        }).then(res => {

        }).finally(_ => {
            update()
            setDelLoad(false)
            closeHandle()
        })
    }

    
    const openDeleteConfirm = () => setDeleteConfirm(true)
    const closeDeleteConfirm = () => setDeleteConfirm(false)
    const deleteConfirmAccept = () => {
        onDelete()
        closeDeleteConfirm()
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
                CategoryID: '',
                SubCategoryID: ID,
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
        if(token && data?.ID) {
            setCloneLoad(true)
            cs.cloneItem(token, {id: data?.ID,element:'subcategory'}).then(res => {
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
        <Modal open={visible} onCancel={closeHandle} className="Modal CreateSubcategory">
            <SelectOrg
                list={orgs}
                selected={orgsList}
                setSelected={setOrgsList}
                close={closeHideOrgModal}
                visible={hideOrgModal}
                />
            <ConfirmModal
                visible={deleteConfirm}
                close={closeDeleteConfirm}
                cancel={deleteConfirmAccept}
                text={'Удалить подкатегорию?'}
                />
            <h2 className="Modal__head">
                {
                    data ? (
                        'Редактировать подкатегорию'
                    ) : (
                        'Добавить подкатегорию'
                    )
                }
            </h2>
            <div className="Modal__form">
                <Row gutter={[0, 20]}>
                    
                    <Col span={24}>
                        <div className="CreateSubcategory__upload">
                            {
                                Picture || data?.ThumbnailPicture ? (
                                    <button onClick={() => deleteImg(Picture?.ID)} className="CreateSubcategory__upload_btn">
                                        <BsTrash/>
                                    </button>
                                ) : null
                            }
                            <PlUpload

                            shadow={true}
                            id={'uploadSubCatImg'}
                            text={'Выбрать картинку'}
                            onChange={addImg}
                            accept={'.png, .jpg, .jpeg'}
                            style={{backgroundColor: '#fff', height: 250}}
                            prev={prev ? prev : null}
                            />
                        </div>
                        
                    </Col>
                    {
                        data?.ID && data?.IIkoID ? (
                            <Col span={24}>
                                <Row gutter={[20, 20]}>
                                    <Col span={12}>
                                        <div className="def-label">ID в системе</div>
                                        <div className="def-value">{data.ID}</div>
                                    </Col>
                                    {
                                        switchCrm(settings, 
                                            <Col span={12}>
                                                <div className="def-label">ID в iIko</div>
                                                <div className="def-value">{data.IIkoID}</div>
                                            </Col>    ,
                                            <Col span={12}>
                                                <div className="def-label">ID в RKeeper</div>
                                                <div className="def-value">{data.IIkoID}</div>
                                            </Col>,
                                             <Col span={12}>
                                                <div className="def-label">ID в 1C</div>
                                                <div className="def-value">{data.IIkoID}</div>
                                            </Col>,
                                             <Col span={12}>
                                             <div className="def-label">ID в FrontPad</div>
                                             <div className="def-value">{data.IIkoID}</div>
                                         </Col>
                                        )
                                    }
                                </Row>
                            </Col>    
                        ) : null
                    }
                    <Col span={24}>
                        <Input
                            maskType={String}
                            shadow={true}
                            value={Name}
                            onChange={e => setName(e.target.value)} 
                            placeholder={'Название подкатегории'}/>
                    </Col>
                    {
                        switchCrm(settings, 
                            <Col span={24}>
                                <Input
                                    maskType={String}
                                    shadow={true}
                                    value={IIkoID}
                                    onChange={e => setIIkoID(e.target.value)} 
                                    placeholder={'ID в iIko'}/>
                            </Col>,
                            <Col span={24}>
                                <Input
                                    maskType={String}
                                    shadow={true}
                                    value={IIkoID}
                                    onChange={e => setIIkoID(e.target.value)} 
                                    placeholder={'ID в RKeeper'}/>
                            </Col>,
                            <Col span={24}>
                                <Input
                                    maskType={String}
                                    shadow={true}
                                    value={IIkoID}
                                    onChange={e => setIIkoID(e.target.value)} 
                                    placeholder={'ID в 1C'}/>
                            </Col>,
                             <Col span={24}>
                             <Input
                                 maskType={String}
                                 shadow={true}
                                 value={IIkoID}
                                 onChange={e => setIIkoID(e.target.value)} 
                                 placeholder={'ID в FrontPad'}/>
                         </Col>
                        )
                    }
                    {
                        switchCrm(settings, 
                            <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={ovHierarchy == '1'}
                                    id={'ov1'}
                                    text={'Разрешить iiko редактировать иерархию'}
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setOvHierarchy('1')
                                        } else {
                                            setOvHierarchy('0')
                                        }
                                    }}
                                    />
                            </Col>,
                             <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={ovHierarchy == '1'}
                                    id={'ov1'}
                                    text={'Разрешить RKeeper редактировать иерархию'}
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setOvHierarchy('1')
                                        } else {
                                            setOvHierarchy('0')
                                        }
                                    }}
                                    />
                            </Col>,
                            <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={ovHierarchy == '1'}
                                    id={'ov1'}
                                    text={'Разрешить 1C редактировать иерархию'}
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setOvHierarchy('1')
                                        } else {
                                            setOvHierarchy('0')
                                        }
                                    }}
                                    />
                            </Col>,
                             <Col span={24}>   
                             <Checkbox
                                 shadow={true}
                                 checked={ovHierarchy == '1'}
                                 id={'ov1'}
                                 text={'Разрешить FrontPad редактировать иерархию'}
                                 onChange={e => {
                                     if(e.target.checked) {
                                         setOvHierarchy('1')
                                     } else {
                                         setOvHierarchy('0')
                                     }
                                 }}
                                 />
                         </Col>
                        )
                    }
                    {
                        switchCrm(settings, 
                            <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={ovEdit == '1'}
                                    id={'ov2'}
                                    text='Разрешить iiko перезаписывать подкатегорию'
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setOvEdit('1')
                                        } else {
                                            setOvEdit('0')
                                        }
                                    }}
                                    />
                            </Col>,
                             <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={ovEdit == '1'}
                                    id={'ov2'}
                                    text='Разрешить RKeeper перезаписывать подкатегорию'
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setOvEdit('1')
                                        } else {
                                            setOvEdit('0')
                                        }
                                    }}
                                    />
                            </Col>,
                             <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={ovEdit == '1'}
                                    id={'ov2'}
                                    text='Разрешить 1C перезаписывать подкатегорию'
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setOvEdit('1')
                                        } else {
                                            setOvEdit('0')
                                        }
                                    }}
                                    />
                            </Col>,
                             <Col span={24}>   
                             <Checkbox
                                 shadow={true}
                                 checked={ovEdit == '1'}
                                 id={'ov2'}
                                 text='Разрешить FrontPad перезаписывать подкатегорию'
                                 onChange={e => {
                                     if(e.target.checked) {
                                         setOvEdit('1')
                                     } else {
                                         setOvEdit('0')
                                     }
                                 }}
                                 />
                         </Col>
                        )
                    }
                    
                    <Col span={24}>
                        <Checkbox
                            shadow={true}
                            checked={HideInApp == '1'}
                            id={'HideInApp'}
                            text={'Скрыть в приложении'}
                            onChange={e => {
                                if(e.target.checked) {
                                    setHideInApp('1')
                                } else {
                                    setHideInApp('0')
                                }
                            }}
                            />
                    </Col>
                    <Col span={24}>
                        <Checkbox shadow={true} checked={isHideInOrg} onChange={(e) => {
                            setIsHideInOrg(e.target.checked)
                            if(!e.target.checked) {
                                setOrgsList([])
                            }
                        }} id={'HiddenInOrganisations'} text={'Скрыть в организациях'}/>
                    </Col>
                    <Col span={24}>
                        <Checkbox 
                            shadow={true} 
                            checked={is_only_for_stories === '1'} 
                            onChange={(e) => setis_only_for_stories(e.target.checked ? '1' : '0')}
                            id={'st-hd'} text={'Только для сториз'}/>
                    </Col>
                    {
                        isHideInOrg ? (
                            <>
                            
                            {
                                orgsList?.length == 0 ? (
                                    <Col span={24}>
                                        <Pl shadow={true} onClick={openHideOrgModal} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                    </Col>
                                ) : (
                                    <Col span={24}>
                                        <Pl
                                            style={{color: 'var(--violet)'}}
                                            styles={{width: '100%'}}
                                            onClick={openHideOrgModal}
                                            shadow
                                            text={`Выбрано организаций ${orgsList?.length}`}
                                            />
                                    </Col>
                                )
                            }
                            </>
                            
                        ) : null
                    }
                    {
                        data ? (
                            <>
                                <Col span={24}>
                                    <EditHr
                                        ID={data.ID}
                                        onSave={cs.editParent}
                                        shadow={true}
                                        isPlate={false}
                                        />
                                </Col>
                                <Col span={24}>
                                    <EditHr
                                        onSave={cs.editParentList}
                                        type="all"
                                        ID={data.ID}
                                        buttonLabel={'Изменить иерархию у всех дочерних элементов'}
                                        shadow={true}
                                        isPlate={false}
                                        />
                                </Col>
                                
                            </>
                           
                        ) : null
                    }
                    {
                        data ? (
                            <Col span={24}>
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
                            </Col>
                        ) : null
                    }
                    <Col span={24}>
                        <Row gutter={[0, 20]}>
                            {
                                data && (
                                    <Col span={24}>
                                        <Button
                                            text={'Создать копию подкатегории'}
                                            styles={{width: '100%'}}
                                            before={<MdContentCopy size={20} color={"#fff"}/>}
                                            onClick={cloneElement}
                                            load={cloneLoad}
                                            />
                                    </Col>
                                )
                            }
                            <Col span={24}>
                                <Button
                                    disabled={!Name}
                                    load={saveLoad}
                                    styles={{width: '100%'}}
                                    onClick={onSubmit} 
                                    type={'button'}  
                                    before={<SaveIcon size={20} color={'#fff'}/>} 
                                    justify={'flex-start'} 
                                text={'Сохранить'}/>
                            </Col>
                            {
                                data ? (
                                    <>
                                        <Col span={24}>
                                            <Button
                                                load={delLoad}
                                                styles={{width: '100%'}}
                                                onClick={openDeleteConfirm} 
                                                type={'button'}  
                                                variant={'danger'}
                                                before={<BsTrash size={20}/>} 
                                                justify={'flex-start'} 
                                                text={'Удалить подкатегорию'}/>
                                        </Col>
                                    </>
                                ) : null
                            }
                        </Row>
                        
                        
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default CreateSubcategory;