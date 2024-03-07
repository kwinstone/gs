import './Sidebar.scss';
import {useSelector, useDispatch} from 'react-redux';
import catService from '../../services/catService';
import {useEffect, useState} from 'react';
import SidebarItem from './components/SidebarItem/SidebarItem';
import {FiCodesandbox, FiHome} from 'react-icons/fi';
import {BeatLoader} from 'react-spinners';
import {AiOutlineRollback} from 'react-icons/ai';
import {motion} from 'framer-motion';
import CatalogIcon from '../../icons/CatalogIcon/CatalogIcon';
import {CgTag} from 'react-icons/cg';
import StatIcon from '../../icons/StatIcon/StatIcon';
import OrderIcon from '../../icons/OrderIcon/OrderIcon';
import {FiUsers, FiSettings} from 'react-icons/fi';
import SettingsIcon from '../../icons/SettingsIcon/SettingsIcon';
import StatisticIcon from '../../icons/StatisticIcon/StatisticIcon';
import IntegrIcon from '../../icons/IntegrIcon/IntegrIcon';
import TrashIcon from '../../icons/TrashIcon/TrashIcon';
import {BsBag} from 'react-icons/bs';
import {AiOutlineStar} from 'react-icons/ai';
import {BiMessageDetail} from 'react-icons/bi';
import {catalogUpdate, handleSidebarOpen} from '../../store/actions'
import {RiReservedLine} from 'react-icons/ri';
import checkDomain from '../../funcs/checkDomain';
import {HiOutlineStatusOnline} from "react-icons/hi";
import {TbTruckDelivery, TbWorldWww} from "react-icons/tb";
import {IoNewspaperOutline} from "react-icons/io5";
import {MdAccessTime} from "react-icons/md";

const cs = new catService();

const Sidebar = () => {
    const {token, catalog, user} = useSelector(state => state)
    const [catLoad, setCatLoad] = useState(false)
    const [isHide, setIsHide] = useState(true)
    const dispatch = useDispatch();


    useEffect(() => {
        setCatLoad(true)
        if (token) {
            cs.getCats(token, {OrganisationID: 0}).then(res => {
                // setCats(res)
                dispatch(catalogUpdate(res))
            }).finally(_ => {
                setCatLoad(false)
            })
        }
    }, [token])


    const toggleSidebar = () => {
        setIsHide(!isHide)
    }

    useEffect(() => {
        if (isHide) {
            dispatch(handleSidebarOpen(false))
        } else {
            dispatch(handleSidebarOpen(true))
        }
    }, [isHide])


    return (
        <>
            <div className={"Sidebar-pl" + (isHide ? ' hide ' : '')}></div>
            <motion.div
                initial={{translateX: '-100%'}}
                animate={{translateX: 0}}
                transition={{duration: 0.5}}
                exit={{translateX: '-100%'}}

                className={"Sidebar gs-scroll" + (isHide ? ' hide ' : '')}>
                <div className="Sidebar__head">
                    <div className="Sidebar__head_label">
                        МЕНЮ
                    </div>

                    <div className="Sidebar__head_icon" onClick={toggleSidebar}>
                        <AiOutlineRollback/>
                    </div>
                </div>
                {
                    user && (
                        <div className="Sidebar__list">
                            {
                                user?.Role === 'Admin' && (
                                    <>
                                        <SidebarItem
                                            labelHide={isHide}
                                            name={'Организации'}
                                            root={'/organizations'}
                                            link={`/organizations?p=Организации`}
                                            icon={<FiHome/>}
                                        />

                                        <SidebarItem
                                            labelHide={isHide}
                                            toggleSidebar={setIsHide}
                                            name={'Каталог'}
                                            root={'/catalog'}
                                            link={'/catalog?p=Каталог'}
                                            isSubmenu={catalog?.length > 0 ? true : false}
                                            icon={<CatalogIcon size={22}/>}
                                        >
                                            {
                                                catLoad ? (
                                                    <div className="SidebarItem__load">
                                                        <BeatLoader color='var(--violet)'/>
                                                    </div>

                                                ) : (
                                                    catalog && catalog.length > 0 ? (
                                                        catalog.map((item, index) => (
                                                            <SidebarItem
                                                                key={index}
                                                                labelHide={isHide}
                                                                icon={<FiCodesandbox/>}
                                                                name={item.Name}
                                                                root={`/catalog/${item.ID}`}
                                                                link={`/catalog/${item.ID}?p=Каталог&p=${item.Name}`}
                                                            />
                                                        ))
                                                    ) : null
                                                )
                                            }

                                        </SidebarItem>
                                        <SidebarItem
                                            labelHide={isHide}
                                            name={'Сториз'}
                                            link={window.location.origin?.includes('mama.gscore.ru') ? '/stories-ym?p=Сториз' : '/stories?p=Сториз'}
                                            root={window.location.origin?.includes('mama.gscore.ru') ? '/stories-ym' : '/stories'}
                                            icon={<CgTag style={{transform: 'rotate(-45deg)'}}/>}
                                        />
                                    </>
                                )
                            }
                            <SidebarItem
                                labelHide={isHide}
                                name={'Аналитика'}
                                isSubmenu={true}
                                toggleSidebar={setIsHide}
                                icon={<StatIcon size={22}/>}
                            >
                                <SidebarItem
                                    labelHide={isHide}
                                    name={'Клиенты'}
                                    link={'/clients?p=Клиенты'}
                                    root={'/clients'}
                                    icon={<FiUsers/>}/>
                                {/*<SidebarItem*/}
                                {/*    labelHide={isHide}*/}
                                {/*    name={'Заказы с мобильных устройств'}*/}
                                {/*    link={'/orders?p=Заказы'}*/}
                                {/*    root={'/orders'}*/}
                                {/*    icon={<OrderIcon size={22}/>}/>*/}
                                <SidebarItem
                                    labelHide={isHide}
                                    name={'Заказы'}
                                    link={'/orders?p=Заказы'}
                                    root={'/orders'}
                                    icon={<OrderIcon size={22}/>}/>
                                <SidebarItem
                                    labelHide={isHide}
                                    name={'Оценки'}
                                    link={'/revs?p=Оценки'}
                                    root={'/revs'}
                                    icon={<AiOutlineStar size={22}/>}
                                />
                                {
                                    user?.Role === 'Admin' && (
                                        <>
                                            {
                                                checkDomain(<>
                                                    <SidebarItem
                                                        labelHide={isHide}
                                                        name={'Брони'}
                                                        link={'/reservations?p=Брони'}
                                                        root={'/reservations'}
                                                        icon={<RiReservedLine size={22}/>}
                                                    />
                                                </>, null)
                                            }
                                            <SidebarItem
                                                labelHide={isHide}
                                                name={'Статистика'}
                                                link={'/statistic?p=Статистика'}
                                                root={'/statistic'}
                                                icon={<StatisticIcon size={22}/>}/>
                                        </>
                                    )
                                }
                            </SidebarItem>
                            {
                                process.env.REACT_APP_ENABLE_SITE_CONFIGURATION === 'true' && (
                                    <SidebarItem
                                        labelHide={isHide}
                                        name={'Настройки сайта'}
                                        toggleSidebar={setIsHide}
                                        isSubmenu={true}
                                        icon={<TbWorldWww size={22}/>}
                                    >

                                        <SidebarItem
                                            root={'/site/status'}
                                            labelHide={isHide}
                                            name={'Статус сайта'}
                                            link={'/site/status'}
                                            icon={<HiOutlineStatusOnline />}
                                        />
                                        <SidebarItem
                                            root={'/site/reservation'}
                                            labelHide={isHide}
                                            name={'Бронь'}
                                            link={'/site/reservation'}
                                            icon={<MdAccessTime />}
                                        />
                                        <SidebarItem
                                            root={'/site/delivery'}
                                            labelHide={isHide}
                                            name={'Информация о доставке'}
                                            link={'/site/delivery'}
                                            icon={<TbTruckDelivery />}
                                        />
                                        <SidebarItem
                                            root={'/site/news'}
                                            labelHide={isHide}
                                            name={'Новости и мероприятия'}
                                            link={'/site/news'}
                                            icon={<IoNewspaperOutline />}
                                        />
                                    </SidebarItem>
                                )}
                            {
                                user?.Role === 'Admin' && (
                                    <SidebarItem
                                        labelHide={isHide}
                                        name={'Настройки'}
                                        toggleSidebar={setIsHide}
                                        isSubmenu={true}
                                        icon={<SettingsIcon size={22}/>}
                                    >
                                        <SidebarItem
                                            root={'/basket'}
                                            labelHide={isHide}
                                            name={'Корзина'}
                                            link={'/basket?p=Настройки корзины'}
                                            icon={<BsBag/>}/>
                                        <SidebarItem
                                            labelHide={isHide}
                                            root={'/integr'}
                                            name={'Интеграции'}
                                            link={'/integr?p=Интеграции'}
                                            icon={<IntegrIcon size={22}/>}/>
                                        <SidebarItem
                                            labelHide={isHide}
                                            name={'Все настройки'}
                                            link={'/allsettings?p=Все настройки'}
                                            root={'/allsettings'}
                                            icon={<FiSettings/>}/>
                                        <SidebarItem
                                            labelHide={isHide}
                                            name={'Настройки отзывов'}
                                            link={'/ratingSettings?p=Настройки отзывов'}
                                            root={'/ratingSettings'}
                                            icon={<BiMessageDetail size={22}/>}/>
                                        <SidebarItem
                                            labelHide={isHide}
                                            name={'Удаленные объекты'}
                                            link={'/trash?p=Удаленные обьекты'}
                                            root={'/trash'}
                                            icon={<TrashIcon size={22}/>}/>
                                    </SidebarItem>
                                )
                            }

                        </div>
                    )
                }
            </motion.div>
        </>

    )
}

export default Sidebar;