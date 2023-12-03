import './CreatePlatePage.scss';
import {Row, Col, Tabs} from 'antd';
import Pl from '../../../components/Pl/Pl';
import PicItem from './components/PicItem/PicItem';
import Input from '../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Text from '../../../components/Text/Text';
import DropCollapse from '../../../components/DropCollapse/DropCollapse';
import Button from '../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import ExMass from './components/ExMass/ExMass';
import Mod from './components/Mod/Mod';
import DefList from './components/DefList/DefList';
import catService from '../../../services/catService';
import orgService from '../../../services/orgService';
import { useSelector } from 'react-redux';
import AddAlrgn from '../modals/addAlrgn/AddAlrgn';
import EditAlrgn from '../modals/editAlrgn/EditAlrgn';
import { useEffect, useState } from 'react';
import PlUpload from '../../../components/PlUpload/PlUpload';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import weektimes from './components/weektimes';
import TimeSelect from '../../orgs/orgsCreate/components/timeSelect/TimeSelect';
import RecList from './components/RecList/RecList';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../../funcs/pageEnterAnimProps';
import SaveIcon from '../../../icons/SaveIcon/SaveIcon';
import { useNavigate } from 'react-router-dom';

const picListTransform = (index, list, func) => {
    const pr = list;
    const rm = pr.splice(index, 1)
    func([...pr])
}

const delTypes = {
    onlyDelivery: 0,
    onlyLocal: 1,
    both: 2,
    none: 3
}


const cs = new catService();
const os = new orgService();

const CreatePlatePage = () => {
    const nav = useNavigate()
    const {token} = useSelector(state => state)
    const {categoryId, subcategoryId} = useParams()
    const [createdId, setCreatedId] = useState(null)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    const [IIkoID, setIIkoID] = useState('')
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState(0)
    const [ItemOrder, setItemOrder] = useState(0)
    const [ParentID, setParentID] = useState(0)
    const [IsSubCategory, setIsSubCategory] = useState(0)
    const [MaxCount, setMaxCount] = useState(99)
    const [Name, setName] = useState('')
    const [IsHit, setIsHit] = useState(0)
    const [IsNew, setIsNew] = useState(0)
    const [Composition, setComposition] = useState('')
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

    // modals
    const [addAllergen, setAddAllergen] = useState(false);
    const [editAllergen, setEditAllergen] = useState(false);



    const openAddAllergen = () => {
        setAddAllergen(true)
    }

    const closeAddAllergen = () => {
        setAddAllergen(false)
    }

    const openEditAllergen = () => {
        setEditAllergen(true)
    }

    const closeEditAllergen = () => {
        setEditAllergen(false)
    }

    const deleteImage = (index) => {
        // const pr = Picture;
        // const rm = pr.splice(index, 1)
        // setPicture([...pr])
        picListTransform(index, Picture, setPicture)
        picListTransform(index, picPrevs, setPicPrevs)

    }

    const uploadImages = (e) => {
        if(e.target.files.length > 10 || Picture.length == 10) {
            message.error('Можно загрузить не более 10 изображений')
        } else {
            const ff = [...e.target.files].map(item => URL.createObjectURL(item))
            setPicPrevs(state => [...state, ...ff])
            setPicture(state => [...state, ...e.target.files])
        }
    }

    

    //получаем список организаций
    useEffect(() => {
        if(token) {
            os.getOrgs(token).then(res => {
                setOrgs(res.map(item => {
                    return {
                        value: item.Name,
                        ID: item.ID
                    }
                }))
            })
        }
    }, [token])


    

    const addOrg = () => {
        setOrgsList(state => [...state, orgs[0]])
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
    const saveTime = (index, value) => {
     

        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }


    //создаем блюдо
    const createPlate = () => {
        const data = new FormData()
        let weekArray = []
        if(weekTimes.length > 0) {
            weekArray = weekTimes.map(item => {
                if(!item.enabled && !item.disabled) {
                    return (
                        `${60 * (Number(item.values.start.slice(0,2)) + Number(item.values.start.slice(3,5)) / 100)}-${60 * (Number(item.values.end.slice(0,2)) + (Number(item.values.end.slice(3,5)) / 100))}`
                    )
                } else {
                    if (item.enabled) {
                        return 'Enabled'
                    }
                    if(item.disabled) {
                        return 'Disabled'
                    }
                }
                
            }) 
        }
        
        data.append('IIkoID', IIkoID)
        data.append('CanOverwriteByIIko',CanOverwriteByIIko)
        data.append('ItemOrder', ItemOrder)
        data.append('ParentID', subcategoryId ? subcategoryId : 0)
        data.append('CategoryID', categoryId)
        data.append('IsSubCategory', '0')
        data.append('MaxCount', MaxCount)
        data.append('Name', Name)
        data.append('IsHit', IsHit)
        data.append('IsNew', IsNew)
        data.append('Composition', Composition)
        data.append('Calories', Calories)
        data.append('Carbohydrates', Carbohydrates)
        data.append('Fats', Fats)
        data.append('Proteins', Proteins)
        data.append('CountAdditions', CountAdditions)
        data.append('Price', Price)
        data.append('SalePrice', SalePrice)
        data.append('Mass', Mass)
        data.append('MonTime', weekArray[0])
        data.append('TueTime', weekArray[1])
        data.append('WedTime', weekArray[2])
        data.append('ThuTime', weekArray[3])
        data.append('FriTime', weekArray[4])
        data.append('SatTime', weekArray[5])
        data.append('SunTime', weekArray[6])
        if(orgsList.length > 0) {
            data.append('HiddenInOrganisations', orgsList.map(item => `/${item.ID}`).join('/') + '/')
        } else {
            data.append('HiddenInOrganisations', '')
        }
        if(AllowedDeliveryTypes.length == 0) {
            data.append('AllowedDeliveryTypes', '3')
        } else {
            if(AllowedDeliveryTypes.length == 2) {
                data.append('AllowedDeliveryTypes', '2')
            } else {
                data.append('AllowedDeliveryTypes', AllowedDeliveryTypes[0])
            }
        }
        Picture.forEach((i, index) => {
            if(index == 0) {
                data.append(`Picture`, i)
            } else {
                data.append(`Picture_${index}`, i)
            }
        })

        setSaveLoad(true)
        cs.addProd(token, data).then(res => {
            if(res) {
                message.success('Блюдо создано, добавьте дополнительные свойства')
                setCreatedId(res)
            } else {
                message.error('Произошла ошибка, повторите еще раз')
            }
        }).finally(_ => {
            setSaveLoad(false)
        })
        
    }

    //удаляем блюдо
    const deletePlate = () => {
        setDelLoad(true)
        cs.delProd(token, {ID: createdId, Delete: 'hard'}).then(res => {
            if(res) {
                nav(-1, {replace: true})
                message.success('Блюдо удалено')
            } else {
                message.error('Произошла ошибка')
            }
        }).finally(_ => {
            setDelLoad(false)
        })
    }

    return (
        <motion.div 
            {...pageEnterAnimProps}
            className="CreatePlatePage page">
            <AddAlrgn visible={addAllergen} close={closeAddAllergen}/>
            <EditAlrgn visible={editAllergen} close={closeEditAllergen}/>
            <main className="Main">
                <div className="pageBody">
                    <div className="CreatePlatePage__body pageBody-content">
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className="row-custom">
                                    <div className="panel" style={{display: 'flex', overflowX:'auto'}}>
                                        {
                                            picPrevs && picPrevs.length > 0 ? (
                                                picPrevs.map((item, index) => (
                                                    <PicItem
                                                        key={index}
                                                        image={item}
                                                        remove={() => deleteImage(index)}
                                                        />
                                                ))
                                            ) : null
                                        }
                                        {
                                            Picture?.length < 10 ? (
                                                <PlUpload multiple={true} id={'createPlatePics'} onChange={(e) => uploadImages(e)} style={{width: 200, height: 200, flex: '0 0 auto', backgroundColor: '#F8F8F8'}} text={'Добавить картинку'}/>
                                            ) : null
                                        }
                                        
                                    </div>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        maskType={String}
                                        value={Name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={'Название блюда'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input 
                                        maskType={String}
                                        value={IIkoID}
                                        onChange={(e) => setIIkoID(e.target.value)}
                                        placeholder={'ID в iIko'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsNew} 
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
                                        checked={IsHit}
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
                                    <Text
                                        value={Composition}
                                        placeholder={'Состав'}
                                        onChange={(e) => setComposition(e.target.value)}/>
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
                                        placeholder={'Цена со скидкой'}/>
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
                                        checked={AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery)}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setAllowedDeliveryTypes(state => [...state, '0'])
                                            } else {
                                                setAllowedDeliveryTypes(state => state.filter(item => item != '0'))
                                            }
                                        }}
                                        id={'deliveryTrue'} 
                                        text={'Доступно к доставке'}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox
                                        checked={AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal)} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setAllowedDeliveryTypes(state => [...state, '1'])
                                            } else {
                                                setAllowedDeliveryTypes(state => state.filter(item => item != '1'))
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
                                        <div className="Modal__form_row">
                                            {
                                                orgsList && orgsList.length > 0 ? (
                                                    orgsList.map((item, index) => (
                                                        <DropCollapse 
                                                            key={index}
                                                            selectItem={selectOrg} 
                                                            afterIcon 
                                                            index={index}
                                                            value={item.value} 
                                                            list={orgs}
                                                            ID={item.ID}/>
                                                    ))
                                                ) : null
                                            }
                                        
                                        </div>
                                        {
                                            orgsList && orgsList.length >= 10 ? (
                                                null
                                            ) : (
                                                <div className="Modal__form_row">
                                                    <Pl onClick={addOrg} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                                </div>
                                            )
                                        }
                                        </>
                                        
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    <Checkbox
                                        checked={IsDynamicTimetable} 
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
                                <Row className='row-custom'>
                                    <TimeSelect plate={true} save={saveTime} list={weekTimes}/>
                                </Row>
                                
                                <Row className="row-custom">
                                    {
                                        createdId ? (
                                            <Button
                                            text={'Удалить блюдо'} 
                                            justify={'flex-start'} 
                                            variant={'danger'}
                                            onClick={deletePlate}
                                            before={<BsTrash size={20}/>} 
                                            load={delLoad}
                                            styles={{width: '100%'}}/>
                                        ) : (
                                            <Button
                                                disabled={!Name || !IIkoID}
                                                onClick={createPlate} 
                                                text={'Сохранить'} 
                                                load={saveLoad}
                                                justify={'flex-start'} 
                                                before={<SaveIcon size={20} color={'#fff'}/>} 
                                                styles={{width: '100%'}}/>
                                        )
                                    }
                                </Row>
                            </Col>
                            {
                                createdId ? (
                                    <Col span={12}>
                                        <Row className='row-custom'>
                                            <ExMass plateId={createdId}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <Mod plateId={createdId}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <DefList plateId={createdId} editModal={openEditAllergen} openModal={openAddAllergen} head={'Список аллергенов'} addText={'Добавить аллерген'}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <RecList plateId={createdId} head={'Список рекомендаций'} addText={'Добавить блюдо'}/>
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

export default CreatePlatePage;