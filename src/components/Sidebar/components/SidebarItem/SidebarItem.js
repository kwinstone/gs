import './SidebarItem.scss';
import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {BsChevronCompactDown} from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

const SidebarItem = ({
    link,
    isSubmenu,
    children,
    name,
    icon,
    labelHide,
    toggleSidebar,
    root
}) => {
    const loc = useLocation();
    const submenuRef = useRef();

    const [isOpen, setIsOpen] = useState(false)
    const [menuHeight, setMenuHeight] = useState(0)

    useEffect(() => {
        if(submenuRef?.current) {
            setMenuHeight(submenuRef.current.scrollHeight)
        }
    }, [children, submenuRef, labelHide, isOpen])
    
    const toggleSubmenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if(labelHide) {
            setIsOpen(false)
        }
    }, [labelHide]) 

    useEffect(() => {
        if(isOpen) {
            toggleSidebar(false)
        }
    }, [isOpen])

   


    return (
        <div className={"SidebarItem"}>
            <div className={"SidebarItem__main" + ((loc?.pathname.includes(root) && children?.length > 0) || (children && children.length > 0 && children?.find(item => item?.props?.root == loc?.pathname)?.props?.root == loc?.pathname && !isOpen) || (loc?.pathname == root && !children) ? ' active ' : '')}>
                {
                    link ? (
                        <NavLink onClick={isSubmenu ? toggleSubmenu : null}  to={link} className="SidebarItem__main_label">
                            <span className="SidebarItem__main_label_icon">
                                {icon}
                            </span>
                            <span className="SidebarItem__main_label_name">{name}</span>
                        </NavLink>
                    ) : (
                        <div onClick={isSubmenu ? toggleSubmenu : null} className="SidebarItem__main_label">
                            <span className="SidebarItem__main_label_icon">
                                {icon}
                            </span>
                            <span className="SidebarItem__main_label_name">{name}</span>
                        </div>
                    )
                }
                {
                    isSubmenu ? (
                        <span onClick={toggleSubmenu} className={"SidebarItem__main_dropicon" + (isOpen ? ' active ' : '')}>
                            <BsChevronCompactDown/>
                        </span>
                    ) : null
                }
            </div>
            {
                isSubmenu ? (
                    <div className="SidebarItem__submenu" style={{height: isOpen ? `${menuHeight}px` : '0px'}} ref={submenuRef}>
                        {children}
                    </div>
                ) : null
            }
            
        </div>
    )
}

export default SidebarItem;