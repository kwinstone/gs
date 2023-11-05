import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import { useState } from 'react';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';


const promoTypes = [
    {value: 'Скидка (%)'},
    {value: 'Скидка (₽)'},
    {value: 'Подарок'}
]

const roles = [
    {value: 'Администратор', id: 'Admin'},
    {value: 'Менеджер', id: 'Manager'},
    {value: 'Модератор', id: 'Moderator'},
]

const SettingsAddUser = ({
    visible, 
    close,
    list,
    setList,
    data
}) => {
    const [CanEditAdminUsers, setCanEditAdminUsers] = useState('0')
    const [CanEditCart, setCanEditCart] = useState('0')
    const [CanEditCatalog, setCanEditCatalog] = useState('0')
    const [CanEditIntegrations, setCanEditIntegrations] = useState('0')
    const [CanEditOrganisations, setCanEditOrganisations] = useState('0')
    const [CanEditSettings, setCanEditSettings] = useState('0')
    const [CanEditStories, setCanEditStories] = useState('0')
    const [CanReadAnalitics, setCanReadAnalitics] = useState('0')
    const [CanReadCart, setCanReadCart] = useState('0')
    const [CanReadCatalog, setCanReadCatalog] = useState('0')
    const [CanReadIntegrations, setCanReadIntegrations] = useState('0')
    const [CanReadOrders, setCanReadOrders] = useState('0')
    const [CanReadOrganisations, setCanReadOrganisations] = useState('0')
    const [CanReadSettings, setCanReadSettings] = useState('0')
    const [CanReadStories, setCanReadStories] = useState('0')
    const [CanReadUsers, setCanReadUsers] = useState('0')
    const [ID, setID] = useState('0')
    const [Login, setLogin] = useState('')
    const [Name, setName] = useState('')
    const [Role, setRole] = useState('Admin')
    const [Token, setToken] = useState('')
    const [index, setindex] = useState(1)
    const [Password, setPassword] = useState('');

    const [editPass, setEditPass] = useState(false)

    useEffect(() => {
        if(data) {
            console.log(data)
            setCanEditAdminUsers(data?.CanEditAdminUsers)
            setCanEditCart(data?.CanEditCart)
            setCanEditCatalog(data?.CanEditCatalog)
            setCanEditIntegrations(data?.CanEditIntegrations)
            setCanEditOrganisations(data?.CanEditOrganisations)
            setCanEditSettings(data?.CanEditSettings)
            setCanEditStories(data?.CanEditStories)
            setCanReadAnalitics(data?.CanReadAnalitics)
            setCanReadCart(data?.CanReadCart)
            setCanReadCatalog(data?.CanReadCatalog)
            setCanReadIntegrations(data?.CanReadIntegrations)
            setCanReadOrders(data?.CanReadOrders)
            setCanReadOrganisations(data?.CanReadOrganisations)
            setCanReadSettings(data?.CanReadSettings)
            setCanReadStories(data?.CanReadStories)
            setCanReadUsers(data?.CanReadUsers)
            setID(data?.ID)
            setLogin(data?.Login)
            setName(data?.Name)
            setRole(data?.Role)
            setPassword(data?.Password)
            setindex(data?.index)
        } else {
            setCanEditAdminUsers('0')
            setCanEditCart('0')
            setCanEditCatalog('0')
            setCanEditIntegrations('0')
            setCanEditOrganisations('0')
            setCanEditSettings('0')
            setCanEditStories('0')
            setCanReadAnalitics('0')
            setCanReadCart('0')
            setCanReadCatalog('0')
            setCanReadIntegrations('0')
            setCanReadOrders('0')
            setCanReadOrganisations('0')
            setCanReadSettings('0')
            setCanReadStories('0')
            setCanReadUsers('0')
            setID('0')
            setLogin('')
            setName('')
            setRole('Admin')
            setPassword('')
            setindex(1)
        }
    }, [data])

    const handleClose = () => {
        setCanEditAdminUsers('0')
        setCanEditCart('0')
        setCanEditCatalog('0')
        setCanEditIntegrations('0')
        setCanEditOrganisations('0')
        setCanEditSettings('0')
        setCanEditStories('0')
        setCanReadAnalitics('0')
        setCanReadCart('0')
        setCanReadCatalog('0')
        setCanReadIntegrations('0')
        setCanReadOrders('0')
        setCanReadOrganisations('0')
        setCanReadSettings('0')
        setCanReadStories('0')
        setCanReadUsers('0')
        setID('0')
        setLogin('')
        setName('')
        setRole('Admin')
        setToken('')
        setindex(1)
        setEditPass(false)
        close();
    }



    const selectRole = (role) => {
        switch(role) {
            case 'Администратор':
                setRole('Admin')
                break;
            case 'Менеджер':
                setRole('Manager')
                break;
            case 'Модератор':
                setRole('Moderator')
                break;
            default:
                setRole('Admin')
                break;
        } 
    }

    const switchRole = (role) => {
        switch(role) {
            case 'Admin':
                return 'Администратор'
            case 'Manager':
                return 'Менеджер'
            case 'Moderator':
                return 'Модератор'
            default:
                return 'Администратор'
        }
    }

    const onSave = () => {
        const body = {
            CanEditAdminUsers,
            CanEditCart,
            CanEditCatalog,
            CanEditIntegrations,
            CanEditOrganisations,
            CanEditSettings,
            CanEditStories,
            CanReadAnalitics,
            CanReadCart,
            CanReadCatalog,
            CanReadIntegrations,
            CanReadOrders,
            CanReadOrganisations,
            CanReadSettings,
            CanReadStories,
            CanReadUsers,
            ID,
            Login,
            Name,
            Role,
            Token,
            Password,
            index
        }
        if(data) {
            if(ID != '0') {
                const r = list;
                const rm = r.splice(r.findIndex(i => i.ID == ID), 1, {...body})
                setList([...r])
            } else {
                const r = list;
                const rm = r.splice(index, 1, {...body})
            }
        } else {
            setList(state => [...state, body])
        }
        handleClose()
    }

    const onDelete = (itemIndex) => {
        setList(s => s.filter((_,index) => index !== itemIndex))
        handleClose()
    }

    
    return (
        <Modal width={500} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить пользователя</h2>
            <form className="Modal__form">
                
                <div className="Modal__form_row">
                    <Input 
                        shadow={true}
                        value={Name}
                        onChange={e => setName(e.target.value)}
                        maskType={String}
                        placeholder={'Имя пользователя'}/>
                </div>
                <div className="Modal__form_row">
                    <Input 
                        shadow={true}
                        value={Login}
                        onChange={e => setLogin(e.target.value)}
                        maskType={String}
                        placeholder={'Логин'}/>
                </div>
                <div className="Modal__form_row">
                    {
                        !editPass ? (
                            <Button
                                text={'Редактировать пароль'}
                                styles={{width: '100%'}}
                                onClick={() => setEditPass(!editPass)}
                                />
                        ) : (
                            <Input 
                                onChange={e => setPassword(e.target.value)}
                                value={Password}
                                shadow={true}
                                maskType={String}
                                placeholder={'Пароль'} 
                                type={'password'}/>
                        )   
                    }
                    
                </div>
                <div className="Modal__form_row">
                    <h3 className="def-label">Роль</h3>
                </div>
                <div className="Modal__form_row">
                    <DropCollapse 
                        list={roles}
                        selectItem={selectRole}
                        shadow={true}
                        justify={'justifyLeft'}
                        value={switchRole(Role)}
                        beforeIcon
                        />
                </div>
                <div className="Modal__form_row">
                    <h3 className="def-label">Разрешения</h3>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadCatalog == '1'}
                        onChange={e => e.target.checked ? setCanReadCatalog('1') : setCanReadCatalog('0')}
                        shadow={true}
                        text={'Просматривать каталог'} 
                        id={'set1'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanEditCatalog == '1'}
                        onChange={e => e.target.checked ? setCanEditCatalog('1') : setCanEditCatalog('0')}
                        shadow={true}
                        text={'Редактировать каталог'} 
                        id={'set2'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadOrganisations == '1'}
                        onChange={e => e.target.checked ? setCanReadOrganisations('1') : setCanReadOrganisations('0')}
                        shadow={true}
                        text={'Просматривать организации'} 
                        id={'set3'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanEditOrganisations == '1'}
                        onChange={e => e.target.checked ? setCanEditOrganisations('1') : setCanEditOrganisations('0')}
                        shadow={true}
                        text={'Редактировать организации'} 
                        id={'set4'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadSettings == '1'}
                        onChange={e => e.target.checked ? setCanReadSettings('1') : setCanReadSettings('0')}
                        shadow={true}
                        text={'Просматривать настройки'} 
                        id={'set5'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanEditSettings == '1'}
                        onChange={e => e.target.checked ? setCanEditSettings('1') : setCanEditSettings('0')}
                        shadow={true}
                        text={'Редактировать настройки'} 
                        id={'set6'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanEditAdminUsers == '1'}
                        onChange={e => e.target.checked ? setCanEditAdminUsers('1') : setCanEditAdminUsers('0')}
                        shadow={true}
                        text={'Редактировать пользователей админ-панели'} 
                        id={'set7'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadOrders == '1'}
                        onChange={e => e.target.checked ? setCanReadOrders('1') : setCanReadOrders('0')}
                        shadow={true}
                        text={'Просматривать заказы'} 
                        id={'set8'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadUsers == '1'}
                        onChange={e => e.target.checked ? setCanReadUsers('1') : setCanReadUsers('0')}
                        shadow={true}
                        text={'Просматривать клиентов'} 
                        id={'set9'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadStories == '1'}
                        onChange={e => e.target.checked ? setCanReadStories('1') : setCanReadStories('0')}
                        shadow={true}
                        text={'Просматривать сториз'} 
                        id={'set10'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanEditStories == '1'}
                        onChange={e => e.target.checked ? setCanEditStories('1') : setCanEditStories('0')}
                        shadow={true}
                        text={'Редактировать сториз'} 
                        id={'set11'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadAnalitics == '1'}
                        onChange={e => e.target.checked ? setCanReadAnalitics('1') : setCanReadAnalitics('0')}
                        shadow={true}
                        text={'Просматривать статистику'} 
                        id={'set12'}/>
                </div> 
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadCart == '1'}
                        onChange={e => e.target.checked ? setCanReadCart('1') : setCanReadCart('0')}
                        shadow={true}
                        text={'Просматривать настройки корзины'} 
                        id={'set13'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox   
                        checked={CanEditCart == '1'}
                        onChange={e => e.target.checked ? setCanEditCart('1') : setCanEditCart('0')}
                        shadow={true}
                        text={'Редактировать настройки корзины'} 
                        id={'set14'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanReadIntegrations == '1'}
                        onChange={e => e.target.checked ? setCanReadIntegrations('1') : setCanReadIntegrations('0')}
                        shadow={true}
                        text={'Просматривать интеграции'} 
                        id={'set15'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox 
                        checked={CanEditIntegrations == '1'}
                        onChange={e => e.target.checked ? setCanEditIntegrations('1') : setCanEditIntegrations('0')}
                        shadow={true}
                        text={'Редактировать интеграции'} 
                        id={'set16'}/>
                </div>
                <div className="Modal__form_action">
                    <Row gutter={[15,15]}>
                        <Col span={24}>
                            <Button 
                                disabled={!Password || !Name || !Login || !Role}
                                onClick={onSave}
                                type={'button'} 
                                styles={{paddingTop: 15, paddingBottom: 15}} 
                                before={<SaveIcon color="#fff" size={16}/>} 
                                justify={'flex-start'} 
                                text={'Сохранить'}/>
                        </Col>
                        {
                            data ? (
                                <Col span={24}>
                                    <Button 
                                        onClick={() => onDelete(index)}
                                        type={'button'} 
                                        variant={'danger'}
                                        styles={{paddingTop: 15, paddingBottom: 15}} 
                                        before={<BsTrash/>} 
                                        justify={'flex-start'} 
                                        text={'Удалить'}/>
                                </Col>
                            ) : null
                        }
                    </Row>
                    
                    
                </div>
            </form>
        </Modal>
    )
}

export default SettingsAddUser;