import './AddMod.scss';
import {Modal, Tabs} from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import AddModItem from '../addModItem/AddModItem';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon'
import { useEffect } from 'react';
import switchCrm from '../../../../funcs/switchCrm';
import checkDomain from '../../../../funcs/checkDomain';
import {checkIsBao} from "../../../../utils/checkIsBao";
const cs = new catService();



const countModList = [
    {
        value: 'Выбор нескольких модификаторов',
    },
    {
        value: 'Выбор одного из модификаторов',
    }
]





const AddMod = ({visible, close, plateId, update}) => {
    const {token, settings} = useSelector(state => state)
    const [mods, setMods] = useState([])
    const [IsRequired, setIsRequired] = useState('0')

    const [Title, setTitle] = useState('')
    const [TitleEn, setTitleEn] = useState('')
    const [TitleKz, setTitleKz] = useState('')

    const [Type, setType] = useState({label: 'Выбор нескольких модификаторов', value: '2'})
    const [modCreateModal, setModCreateModal] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [IIkoID, setIIkoID] = useState('')
    const [selected, setSelected] = useState(null)

    const [hidden, sethidden] = useState('0');
    

    const closeHandle = () => {
        setMods([])
        setIsRequired('0')
        setTitle('')
        setTitleEn('')
        setTitleKz('')
        setIIkoID('')
        setType({label: 'Выбор нескольких модификаторов', value: '2'})
        setSelected(null)
        sethidden('0')
        close();
    }




    const onSave = () => {
        setSaveLoad(true)
        cs.addMod(token, {
            IIkoID,
            ItemID: plateId,

            Title,
            Title_en: checkIsBao() ? TitleEn : undefined,
            Title_kz: checkIsBao() ? TitleKz : undefined,

            Type: Type.value,
            IsRequired,
            Modificators: mods,
            hidden
        }).then(res => {
            update(res)
        }).finally(_ => {
            setSaveLoad(false)
            closeHandle()
        })
    }

    const addMod = () => {
        setModCreateModal(true)
    }

    const removeMod = (itemIndex) => {  
        setMods(s => s.filter((_,index) => index !== itemIndex))
        setModCreateModal(false)
        setSelected(null)
        
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

    useEffect(() => {
        if(!modCreateModal) {
            setSelected(null)
        }
    }, [modCreateModal])

    const editItem = (item, index) => {
        setSelected({
            ...item,
            index: index
        })
        addMod()
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
                onDelete={removeMod}
                data={selected} 
                update={setMods} 
                visible={modCreateModal} 
                close={() => setModCreateModal(false)}/>
            <h2 className="Modal__head">Добавить группу модификаторов</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    {
                        checkIsBao() ? (
                            <Tabs defaultActiveKey="1" items={titleTabs} onChange={() => {}} style={{ width: '100%'}} />
                        ) : titleTabs[0].children
                    }
                    {/*<Input*/}
                    {/*    maskType={String}*/}
                    {/*    shadow={true}*/}
                    {/*    value={Title}*/}
                    {/*    onChange={(e) => setTitle(e.target.value)} */}
                    {/*    placeholder={'Название группы'}/>*/}
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
                        checked={IsRequired == '1'}
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
                        text={'Скрытая группа'}
                        onChange={(e) => {
                            if(e.target.checked) {
                                sethidden('1')
                            } else sethidden('0')
                        }}
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
                                            <div onClick={() => editItem(item, index)} className="AddMod__body_item_main panel">
                                                <Row gutter={[20, 0]}>
                                                    <Col span={10}>
                                                        <div className="AddMod__body_item_name">
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
                        load={saveLoad}
                        onClick={onSave}
                        disabled={mods.length == 0}
                        type={'button'}  
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default AddMod;