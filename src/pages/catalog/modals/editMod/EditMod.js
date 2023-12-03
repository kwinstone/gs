import '../addMod/AddMod.scss';
import {Modal, Tabs} from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddModItem from '../addModItem/AddModItem';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import catService from '../../../../services/catService';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import switchCrm from '../../../../funcs/switchCrm';
import checkDomain from '../../../../funcs/checkDomain';
import {checkIsBao} from "../../../../utils/checkIsBao";


const cs = new catService()

const countModList = [
    {
        value: 'Выбор нескольких модификаторов',
    },
    {
        value: 'Выбор одного из модификаторов',
    }
]


const EditMod = ({visible, close, selected, plateId, update}) => {
    const {token, settings} = useSelector(state => state)
    const [groupModId, setGroupModId] = useState('')
    const [mods, setMods] = useState([])
    const [IsRequired, setIsRequired] = useState('0')

    const [Title, setTitle] = useState('')
    const [TitleEn, setTitleEn] = useState('')
    const [TitleKz, setTitleKz] = useState('')

    const [Type, setType] = useState({label: 'Выбор нескольких модификаторов', value: '2'})
    const [modCreateModal, setModCreateModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [IIkoID, setIIkoID] = useState('')
    const [delLoad, setDelLoad] = useState(false)
    
    const [hidden, sethidden] = useState('0')

    useEffect(() => {
        if(selected) {
            setIIkoID(selected?.IIkoID)
            setGroupModId(selected?.ID)
            setMods(selected?.Modificators)
            setIsRequired(selected?.IsRequired)

            setTitle(selected?.Title)
            setTitleEn(selected?.Title_en)
            setTitleKz(selected?.Title_kz)

            setType({
                label: selected?.Type == '2' ? 'Выбор нескольких модификаторов' : 'Выбор одного из модификаторов',
                value: selected?.Type
            })
            sethidden(selected?.hidden)
        }
    }, [selected])

    const closeHandle = () => {
        close();
        setGroupModId(null)
        setMods([])
        setIsRequired('0')
        setTitle('')
        setIIkoID('')
        setType({label: 'Выбор нескольких модификаторов', value: '2'})
        sethidden('0')
        setEdit(null)
        
    }

    const selectType = (value) => {
        if(value == 'Выбор нескольких модификаторов') {
            setType({
                label: 'Выбор нескольких модификаторов',
                value: '2'
            })
        } else {
            setType({
                label: 'Выбор одного из модификаторов',
                value: '1'
            }) 
        }
    }

    const addMod = () => {
        setModCreateModal(true)
    }

    const editMod = (item, index) => {
        setEdit({
            ...item,
            index: index
        })
        addMod()
    }

    const removeMod = (itemIndex) => {
        setMods(s => s.filter((_,index) => index !== itemIndex))
        setModCreateModal(false)
        setEdit(null)
    }


    const onSave = () => {
        setSaveLoad(true)
        const body = {
            ID: groupModId,
            IIkoID,
            ItemID: plateId,

            Title,
            Title_en: checkIsBao() ? TitleEn : undefined,
            Title_kz: checkIsBao() ? TitleKz : undefined,

            Type:Type?.value,
            IsRequired,
            Modificators: mods?.map(i => {
                delete i?.index
                return i
            }),
            hidden
        }
        cs.editMod(token, body).then(res => {
            update(res)
        }).finally(_ => {
            setSaveLoad(false)
            closeHandle()
        })
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteMod(token, {ItemID: plateId, groupModificatorID: groupModId}).then(res => {
            window.location.reload()
            // update(res)
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }

    const titleTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Название группы'}/>,
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={TitleKz}
                onChange={(e) => setTitleKz(e.target.value)}
                placeholder={'Название группы на казахском языке'}/>,
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Input
                maskType={String}
                shadow={true}
                value={TitleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder={'Название группы на английском языке'}/>,
        },
    ];

    return (
        <Modal className='Modal' width={650} open={visible} onCancel={closeHandle}>
            <AddModItem 
                update={setMods} 
                data={edit} 
                visible={modCreateModal}
                onDelete={removeMod} 
                close={() => setModCreateModal(false)}/>
            <h2 className="Modal__head">Добавить группу модификаторов</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    {
                        checkIsBao() ? (
                            <Tabs defaultActiveKey="1" items={titleTabs} onChange={() => {}} style={{ width: '100%'}} />
                        ) : titleTabs[0].children
                    }
                </div>
                <div className="Modal__form_row">
                    {
                        switchCrm(settings, 
                            <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={'ID в Iiko'}/>,
                            <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={'ID в RKeeper'}/>,
                            <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={'ID в Bitrix'}/>,
                                <Input
                                maskType={String}
                                shadow={true}
                                value={IIkoID}
                                onChange={(e) => setIIkoID(e.target.value)} 
                                placeholder={'ID в FrontPad'}/>
                            
                        )
                    }
                </div>
                <div className="Modal__form_row">
                    <DropCollapse
                        shadow={true}
                        list={countModList}
                        selectItem={selectType}
                        afterIcon 
                        value={Type.label}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox
                        shadow={true}
                        checked={IsRequired == '1' ? true : false}
                        onChange={(e) => {
                            if(e.target.checked) {
                                setIsRequired('1')
                            } else {
                                setIsRequired('0')
                            }
                        }}
                        id={'isRequiredMod'}
                        text={'Обязательная группа'}/>
                </div>
                <div className='Modal__form_row'>
                    <Checkbox
                        shadow={true}
                        checked={hidden == '1'}
                        onChange={(e) => {
                            if(e.target.checked) {
                                sethidden('1')
                            } else sethidden('0')
                        }}
                        text={'Скрытая группа'}
                        id={'isHiddenMod'}
                        />
                </div>
                <div className="AddMod">
                    <h3 className="AddMod__head panel-label">Список модификаторов</h3>
                    <div className="AddMod__body">
                        <div className="AddMod__body_list">
                            {
                                mods && mods.length > 0 ? (
                                    mods.map((item, index) => (
                                        <div className="AddMod__body_item active" key={index}>
                                        <div className="AddMod__body_item_main panel" onClick={() => editMod(item,index)}>
                                            <Row gutter={[20, 10]}>
                                                <Col span={10}>
                                                    <div className="AddMod__body_item_value">
                                                        {item.Name}
                                                    </div>
                                                </Col>
                                                <Col span={10}>
                                                    <div className="AddMod__body_item_value">
                                                        {item.Price}{checkDomain('₽', '₸')}
                                                    </div>
                                                </Col>
                                                {
                                                    item?.Image || item.PictureUrl ? (
                                                        <Col span={4}>
                                                            <div className={'AddMod__body_item_img'}>
                                                                <div className={'AddMod__body_item_img_el'}>
                                                                    <img src={item?.Image || item.PictureUrl} alt="" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ) : null
                                                }
                                            </Row>
                                        </div>
                                    </div>
                                    ))
                                ) : null
                            }
                           
                        </div>
                    </div>
                    <Pl shadow={true} text={'Добавить модификатор'} onClick={addMod} style={{backgroundColor: '#fff', marginBottom: 40}}/>

                </div>
                <div className="Modal__form_action">
                    <Button 
                        disabled={mods.length == 0}
                        load={saveLoad}
                        onClick={onSave}
                        type={'button'}  
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    <Button 
                        load={delLoad}
                        styles={{marginTop: 10}}
                        onClick={onDelete}
                        variant={'danger'}
                        type={'button'}  
                        before={<BsTrash size={20}/>} 
                        justify={'flex-start'} 
                        text={'Удалить группу'}/>
                </div>
            </div>
        </Modal>
    )
}

export default EditMod;