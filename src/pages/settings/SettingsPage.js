import { Row, Col, message } from 'antd';
import SettingsAdmins from './components/SettingsAdmins/SettingsAdmins';
import SettingsContacts from './components/SettingsContacts/SettingsContacts';
import Button from '../../components/Button/Button';
import { useCallback, useState } from 'react';

import {motion} from 'framer-motion';
import setService from '../../services/setService';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SettingsEditArticle from './modals/SettingsEditArticle/SettingsEditArticle';
import Input from '../../components/Input/Input';
import DropCollapse from '../../components/DropCollapse/DropCollapse';
import SaveIcon from '../../icons/SaveIcon/SaveIcon';
import checkDomain from '../../funcs/checkDomain';
import {BannersModal} from "./components/BannersModal/BannersModal";
import {checkIsTigrus} from "../../utils/checkIsTigrus";

const ss = new setService();


const bonusTypes = [
    {value: 'Количество бонусов'},
    {value: 'Процент бонусов'}
]


const SettingsPage = () => {
    const {token} = useSelector(state => state)
    const [ReferalSettings, setReferalSettings] = useState(null)
    const [UserList, setUserList] = useState([])
    const [Articles, setArticles] = useState(null)
    const [Contacts, setContacts] = useState([])
    const [load, setLoad] = useState(false)

    const [selectedArticle, setSelectedArticle] = useState(null)
    const [editArt, setEditArt] = useState(false)

    const openEditArt = () => setEditArt(true)
    const closeEditArt = () => {
        setSelectedArticle(null)
        setEditArt(false)
    }


    const updateData = useCallback(() => {
        if(token) {
            ss.getMainSettings(token).then(res => {
                setArticles(res?.Articles)
                setContacts(res?.Contacts)
            })
            ss.getPanelSettings(token).then(res => {
                setReferalSettings(res?.ReferalSettings)
                setUserList(res?.UserList)
            })
        }
    }, [token])

    useEffect(() => {
        updateData()
        // if(token) {
        //     ss.getMainSettings(token).then(res => {
        //         setArticles(res?.Articles)
        //         setContacts(res?.Contacts)
        //     })
        //     ss.getPanelSettings(token).then(res => {
        //         setReferalSettings(res?.ReferalSettings)
        //         setUserList(res?.UserList)
        //     })
        // }
    }, [token])




    const onSave = () => {
        const main = {
            Articles,
            Contacts: Contacts.map(i => {
                delete i.index;
                return i;
            })
        }
        const panel = {
            ReferalSettings,
            UserList: UserList.map(i => {
                delete i.index;
                return i;
            })
        }
        setLoad(true)
        Promise.all([ss.editMainSettings(token, main), ss.editPanelSettings(token, panel)]).then(res => {
            
            if(res) {
                message.success('Настройки сохранены')
            }
        }).finally(_ => {
            setLoad(false)
            updateData()
        })
    }

    const switchBonusValue = (value) => {
      
        if(value === 'Количество бонусов') {
            setReferalSettings(state => {
                return {
                    ...state,
                    GetBonusesType: '1'
                }
            })
        }
        if(value === 'Процент бонусов') {
            setReferalSettings(state => {
                return {
                    ...state,
                    GetBonusesType: '2'
                }
            })
        }
    }

    const switchBonusType = (type) => {
        if(type === '1') {
            return 'Количество бонусов'
        }
        if(type === '2') {
            return 'Процент бонусов'
        }
    }
    const [bannerOpen, setBannerOpen] = useState(false)


    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="SettingsPage page">

            <SettingsEditArticle
                data={selectedArticle}
                setData={setArticles}
                visible={editArt}
                close={closeEditArt}
                articles={Articles}
                contacts={Contacts}
                />


            <div className="pageBody">
                <div className="SettingsPage__body pageBody-content">
                    <Row gutter={[30, 0]}>
                        <Col span={12} style={{display: 'flex', flexDirection: 'column'}}>
                            <Row className="row-custom">
                                <SettingsAdmins
                                    data={UserList}
                                    setData={setUserList}
                                    />
                            </Row>
                            <Row className="row-custom">
                                <SettingsContacts
                                    data={Contacts}
                                    setData={setContacts}
                                    />
                            </Row>
                            {
                                checkIsTigrus() && (
                                    <Row className="row-custom">
                                        <BannersModal open={bannerOpen} onClose={() => setBannerOpen(false)} />
                                        <Button text={'Редактировать баннеры'} styles={{width: '100%'}} onClick={() => setBannerOpen(true)} />
                                    </Row>
                                )
                            }
                            <Row className="row-custom" style={{marginTop: 30, flex: '1 0 auto', alignItems: 'flex-end'}}>
                                <Button
                                    load={load}
                                    onClick={onSave} 
                                    text={'Сохранить'} 
                                    before={<SaveIcon color={'#fff'} size={16}/>} 
                                    styles={{width: '100%'}}/>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className="row-custom">
                                <Button
                                    onClick={() => {
                                        setSelectedArticle({
                                            name: 'Бонусы',
                                            text: Articles?.Bonuses,
                                            textEn: Articles?.Bonuses_en,
                                            textKz: Articles?.Bonuses_kz,
                                            index: 0
                                        })
                                        openEditArt();
                                    }} 
                                    text={'Бонусы'} 
                                    variant={'light'} 
                                    styles={{width: '100%'}}/>
                            </Row>
                            <Row className="row-custom">
                                <Button
                                    onClick={() => {
                                        setSelectedArticle({
                                            name: 'Доставка и оплата',
                                            text: Articles?.DeliveryAndPayment,
                                            textEn: Articles?.DeliveryAndPayment_en,
                                            textKz: Articles?.DeliveryAndPayment_kz,
                                            index: 1
                                        })
                                        openEditArt()

                                    }} 
                                    text={'Доставка и оплата'} 
                                    variant={'light'} 
                                    styles={{width: '100%'}}/>
                            </Row>
                            <Row className="row-custom">
                                <Button 
                                    onClick={() => {
                                        setSelectedArticle({
                                            name: 'Политика конфидециальности',
                                            text: Articles?.PrivacyPolicy,
                                            textEn: Articles?.PrivacyPolicy_en,
                                            textKz: Articles?.PrivacyPolicy_kz,
                                            index: 2
                                        })
                                        openEditArt()
                                    }}
                                    text={'Политика конфидециальности'} 
                                    variant={'light'} 
                                    styles={{width: '100%'}}/>
                            </Row>
                            {
                                checkDomain(<>
                                    <Row className='row-custom'>
                                
                                <Row gutter={[15, 15]}>
                                    <Col span={24}>
                                    <div className="def-label" style={{marginBottom: 0}}>Реферальная система</div>
                                    </Col>
                                    <Col span={24}>
                                        <Input
                                            value={ReferalSettings?.ReferalBonuses}
                                            onChange={e => {
                                                setReferalSettings(state => {
                                                    return {
                                                        ...state,
                                                        ReferalBonuses: e.target.value
                                                    }
                                                })
                                            }}
                                            placeholder={''}
                                            />
                                    </Col>
                                </Row>
                            </Row>
                            <Row className='row-custom'>
                                <Row gutter={[15,15]}>
                                    <Col span={24}>
                                        <div className="def-label" style={{marginBottom: 0}}>Бонус пригласившему</div>
                                    </Col>
                                    <Col span={24}>
                                        <DropCollapse
                                            selectItem={switchBonusValue}
                                            value={switchBonusType(ReferalSettings?.GetBonusesType)}
                                            beforeIcon
                                            justify={'justifyLeft'}
                                            list={bonusTypes}
                                            />
                                    </Col>
                                    {
                                        ReferalSettings?.GetBonusesType == '1' ? (
                                            <Col span={24}>
                                                <Input
                                                    placeholder={'Количество бонусов'}
                                                    value={ReferalSettings?.GetBonuses}
                                                    onChange={e => {
                                                        setReferalSettings(state => {
                                                            return {
                                                                ...state,
                                                                GetBonuses: e.target.value
                                                            }
                                                        })
                                                    }}
                                                    />
                                            </Col>
                                        ) : (
                                            <Col span={24}>
                                                <Input
                                                    placeholder={'Процент бонусов'}
                                                    value={ReferalSettings?.GetBonusesPercent}
                                                    onChange={e => {
                                                        setReferalSettings(state => {
                                                            return {
                                                                ...state,
                                                                GetBonusesPercent: e.target.value
                                                            }
                                                        })
                                                    }}
                                                    />
                                            </Col>
                                        )

                                    }
                                    
                                    <Col span={24}>
                                        <Input
                                            placeholder={'Максимальный процент от заказа'}
                                            value={ReferalSettings?.MaxGetBonusesPercent}
                                            onChange={e => {
                                                setReferalSettings(state => {
                                                    return {
                                                        ...state,
                                                        MaxGetBonusesPercent: e.target.value
                                                    }
                                                })
                                            }}
                                            />
                                    </Col>
                                </Row>
                            </Row>
                                </>, null)
                            }
                            
                        </Col>
                    </Row>
                </div>
            </div>
        </motion.div>
    )
}


export default SettingsPage;
