import './HeaderProfile.scss';
import logo from '../../assets/img/logo.svg';
import logo_bao from '../../assets/img/logo-bao.png';
import {BsChevronLeft, BsChevronCompactDown, BsArrowRightShort} from 'react-icons/bs';
import { Dropdown } from 'antd';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Bc from '../Bc/Bc';
import checkDomain from '../../funcs/checkDomain';



const HeaderProfile = () => {
    const {sidebarOpen, user, backFunc} = useSelector(state => state)
    const [back, setBack] = useState(false);
    const [links, setLinks] = useState([])
    const nav = useNavigate();


    const url = useMemo(() => {
        return new URLSearchParams(window.location.search)
    }, [window.location.search])


    const updateHead = (path) => {
        if(path == ('/')) {
            return (
                <div className="HeaderProfile__main_nav_head_item">
                    <Link to={'/organizations'}>Организации</Link>
                </div>
                
            )
        }
        if(path.includes('organizations')) {
            return (
                <div className="HeaderProfile__main_nav_head_item">
                    <Link to={'/organizations'}>Организации</Link>
                </div>
                
            )
        }
        if(path.includes('catalog')) {
            return (
                <div className="HeaderProfile__main_nav_head_item">
                    <Link to={'/catalog'}>Каталог</Link>
                </div>
            )
        }
        if(path.includes('stories')) {
            return 'Сториз'
        }
        if(path.includes('clients')) {
            return 'Клиенты'
        }
        if(path.includes('orders')) {
            return 'Заказы'
        }
        if(path.includes('statistic')) {
            return 'Статистика'
        }
        if(path.includes('basket')) {
            return 'Корзина'
        }
        if(path.includes('integr')) {
            return 'Интеграции'
        }
        if(path.includes('allsettings')) {
            return 'Все настройки'
        }
        if(path.includes('trash')) {
            return 'Удаленные обьекты'
        }
    }


    useEffect(() => {
        setLinks(url.getAll('p'))
    }, [url])

    useEffect(() => {
        if(links?.length > 0) {
            setBack(true)
        } else {
            setBack(false)
        }
    }, [links])


    return (
        <header className="HeaderProfile">
            <div className="HeaderProfile__in">
                <div className={"HeaderProfile__logo" + (!sidebarOpen ? ' hide ' : '')}>
                    <img src={checkDomain(logo, logo_bao)} alt="Logo" />
                </div>
                <div className="HeaderProfile__main">
                    {/* breadcrumbs */}
                    <div className="HeaderProfile__main_nav">
                        <div className="HeaderProfile__main_nav_head">
                            {
                                back ? (
                                    (
                                        backFunc ? (
                                            <div className="HeaderProfile__main_nav_head_back" onClick={backFunc}>
                                                <BsChevronLeft/>
                                            </div>
                                        ) : (
                                            <div className="HeaderProfile__main_nav_head_back" onClick={() => nav(-1)}>
                                                <BsChevronLeft/>
                                            </div>
                                        )
                                    )
                                    
                                   
                                ) : null
                            }
                            {/* {
                                updateHead(loc?.pathname)
                            } */}
                            {
                                links && links.length > 0 ? (
                                    links.map((item, index) => (
                                        <div key={index} className={"HeaderProfile__main_nav_head_item"}>
                                            {index != 0 ? <BsArrowRightShort className='HeaderProfile__main_nav_head_item_icon'/> : null}
                                            <div className="HeaderProfile__main_nav_head_item_label">
                                                {item}
                                            </div>

                                        </div>
                                        
                                    ))
                                ) : null
                            }
                        </div>
                    </div>
                    <Bc />


                    <Dropdown
                        placement='bottom'
                        trigger={['click']}
                        overlay={<ProfileMenu/>}
                    >
                        <div className="HeaderProfile__main_user">
                            <span className="HeaderProfile__main_user_name">{user?.Name}</span>
                            <span className="HeaderProfile__main_user_icon">
                                <BsChevronCompactDown/>
                            </span>
                        </div>
                    </Dropdown>
                    
                </div>
            </div>
        </header>
    )
}

export default HeaderProfile;