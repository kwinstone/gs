import './ClientsPage.scss';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Push from './modals/push/Push';
import Email from './modals/email/Email';
import User from './modals/user/User'; 
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';
import orderBy from './helpers/orderBy';
import anService from '../../services/anService';
import TablePag from '../../components/TablePag/TablePag';
import ClientsInfo from './components/ClientsInfo/ClientsInfo';
import Loader from '../../components/Loader/Loader';
import {BsChevronDown} from 'react-icons/bs';
import ClientsFilter from './components/ClientsFilter/ClientsFilter';
import {HiChevronDown} from 'react-icons/hi';
import checkDomain from '../../funcs/checkDomain';
import { message } from 'antd';
import {useNavigate} from "react-router-dom";

const ans = new anService();


const ClientsPage = () => {
    const navigate = useNavigate();

    const {token, sidebarOpen} = useSelector(state => state)
    const [selects, setSelects] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [push, setPush] = useState(false);
    const [email, setEmail] = useState(false);
    const [user, setUser] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [firstFetch, setFirstFetch] = useState(true)
    const [pushLoad, setPushLoad] = useState(false)
    const [emailLoad, setEmailLoad] = useState(false)
    const [loading, setLoading] = useState(false)

    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(false)
    const [Search, setSearch] = useState('') 
    const [Page, setPage] = useState(0)
    const [list, setList] = useState([])
    const [fullList, setFullList] = useState([])
    const [pp, setPp] = useState([])
    const [shiftDown, setShiftDown] = useState(false)
    const [ctrlDown, setCtrlDown] = useState(false)
    const [lastSelected, setLastSelected] = useState(null)

    const [Limit, setLimit] = useState(50)
    const [Offset, setOffset] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [filterOpen, setFilterOpen] = useState(false)
    const [filter, setFilter] = useState(null)

    const [all, setAll] = useState(false)


    const keyDownHandle = (e) => {
        
        if(e.keyCode == 16 && e.code == 'ShiftLeft') {
           
            setShiftDown(true)
            setCtrlDown(false)
        } else if((e.keyCode == 91 && e.code == 'MetaLeft') || (e.keyCode == 17 && e.code == 'ControlLeft')) {
           
            setCtrlDown(true)
            setShiftDown(false)
        } else {
            setCtrlDown(false)
            setShiftDown(false)
        }
    }

    const keyUpHandle = (e) => {
        setCtrlDown(false)
        setShiftDown(false)
    }


    useEffect(() => {
        window.addEventListener('keydown', keyDownHandle)
        window.addEventListener('keyup', keyUpHandle)
        return () => {
            window.removeEventListener('keydown', keyDownHandle)
            window.removeEventListener('keyup', keyUpHandle)
        }
    }, [])

    


    const getUsers = () => {
        if(token) {
            setLoading(true)
            let body;

            if(filter) {
                body = {
                    OrderBy,
                    OrderType: OrderType ? 'ASC' : 'DESC',
                    Search,
                    Limit,
                    Offset,
                    filter
                }
            } else {
                body = {
                    OrderBy,
                    OrderType: OrderType ? 'ASC' : 'DESC',
                    Search,
                    Limit,
                    Offset
                }
            }
            
            ans.getUsers(token, body).then(res => {
                setList(res?.Users)
                setTotalPages(Math.ceil(Number(res?.TotalCount) / Limit))
            }).finally(_ => {
                setFirstFetch(false)
                setLoading(false)
            })
        }
    }

    const updateUsersTrigger = () => {
        getUsers()
    }

    useEffect(() => {
        getUsers()
    }, [token, OrderBy, OrderType, Search, Limit, Offset,filter])

    useEffect(() => {
        if(pp?.length > 0) {
            setList(pp[Page])
        } else {
            setList([])
        }
    }, [Page, pp])


    const openPush = () => {
        setPush(true)
    }

    const closePush = () => {
        setPush(false)
    }

    const openEmail = () => {
        setEmail(true)
    }

    const closeEmail = () => {
        setEmail(false)
        setEmailLoad(false)
    }

    const openUser = () => {
        setUser(true)
    }

    const closeUser = () => {
        setUser(false)
    }

    const openDiscount = () => {
        setDiscount(true)
    }

    const selectAll = (e) => {
        if(e.target.checked) {
            setSelects(list)
            setAll(true)
        } else {
            setSelects([])
            setAll(false)
        }
    }


    const clickHandle = (e, item) => {
        e.preventDefault()
        if(!ctrlDown && !shiftDown) {
            setSelectedUser(item)
            openUser()
        }
        if(ctrlDown && !shiftDown) {
            if(e.currentTarget.classList.contains('active')) {
                const mm = selects;
                const rm = mm.splice(mm.findIndex(i => i.ID == item.ID), 1)
                setSelects([...mm])
                setLastSelected(null)
            } else {    
                setSelects(state => [...state, item])
                setLastSelected(item)
            }
        }
        if(!ctrlDown && shiftDown) {

            if(lastSelected !== null) {
                const mm = [...fullList];
                const firstIndex = mm.findIndex(i => i.ID == item.ID);
                const secondIndex = mm.findIndex(i => i.ID == lastSelected.ID);
                let rm = [];
                if(firstIndex > secondIndex) {
                    rm = mm.splice(secondIndex, firstIndex - secondIndex + 1)
                }
                if(secondIndex > firstIndex) {
                    rm = mm.splice(firstIndex, secondIndex - firstIndex + 1)

                }
                const res = [...selects, ...rm].reduce((o, i) => {
                    if(!o.find(v => v.ID == i.ID)) {
                        o.push(i)
                    }
                    return o;
                }, [])

                setSelects(res)
            }
        }
    }   


    const sendPush = (body) => {
        setPushLoad(true)
        if(all) {
            ans.sendPushToAllUsers(token, {
                ...body,
                filter
            }).then(res => {
                if(!res.error) {
                    closePush()
                } else {
                    //handle error
                }
            }).finally(() => {
                setPushLoad(false)
            })
        } else {
            ans.sendPushToUsers(token, {
                ...body,
                UsersID: selects.map(item => item.ID)
            }).then(res => {
                if(!res.error) {
                    closePush()
                } else {
                    //handle error
                }
            }).finally(() => {
                setPushLoad(false)
            })
        }
        
    }
    
    const sendEmail = (body) => {
        setEmailLoad(true)
        if(all) {
            ans.sendMailToAllUsers(token, {
                ...body,
                filter
            }).then(res => {
                if(res.error === false) {
                    closeEmail()
                }
                if(res?.error === true) {
                    message.error('Произошла ошибка!')
                }
                setEmailLoad(false)
            }).finally(() => setEmailLoad(false))
        } else {
            ans.sendMailToUsers(token, {
                ...body,
                UsersID: selects.map(item => item.ID),
            }).then(res => {
                if(res.error === false) {
                    closeEmail()
                }
                if(res?.error === true) {
                    message.error('Произошла ошибка!')
                }
                
            }).finally(() => setEmailLoad(false))
        }
    }




    useEffect(() => {
        setOffset(0)
    }, [Search])
    

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="ClientsPage page">
            <Push
                onSave={sendPush}
                load={pushLoad}  
                visible={push} 
                close={closePush}/>
            <Email
                onSave={sendEmail}
                load={emailLoad} 
                visible={email} 
                close={closeEmail}/>
            <User 
                updateList={getUsers}
                data={selectedUser}
                updateTrigger={updateUsersTrigger}
                visible={user} 
                close={closeUser}
                name={selectedUser?.name}  
                bonus={selectedUser?.bonus}
                phone={selectedUser?.phone}
                addDiscount={openDiscount}
                />
            {/* <Discount visible={discount} close={closeDiscount}/> */}
            <main className="Main">
                <div className="pageBody">
                    <div className="ClientsPage__body pageBody-content">
                        <ClientsInfo
                            selected={all}
                            value={Search}
                            setValue={setSearch}
                            selectAll={selectAll}
                            />
                        <div style={{ marginBottom: '20px'}}>
                            <Button text={'Добавить клиента'} onClick={() => {
                                navigate('/clients/create')
                            }} />
                        </div>
                        <div className={`ClientsPage__body_filter ${filterOpen ? 'active' : ''}`}>
                            <div className={'ClientsPage__body_filter_in'}>
                                <div onClick={() => setFilterOpen(s => !s)} className={'ClientsPage__body_filter_label'}>
                                    Дополнительные фильтры
                                    <span>
                                        <HiChevronDown/>
                                    </span>
                                </div>
                            </div>
                            <div className={'ClientsPage__body_filter_body'}>
                                <ClientsFilter
                                    setFilter={setFilter}
                                    load={loading}
                                    />
                            </div>
                        </div>
                        
                       
                        <div className="ClientsPage__body_table">
                            {
                                !firstFetch ? (
                                    <>
                                        <table className='gs-table'>
                                            {
                                                loading ? (
                                                    <div className="gs-table__load">
                                                        <Loader/>
                                                    </div>
                                                ) : null
                                            }
                                            {/* <tr>
                                                <th>ID</th>
                                                <th>Имя</th>
                                                <th>Телефон</th>
                                                <th>Кол-во заказов</th>
                                                <th>На сумму</th>
                                                <th>Бонусы</th>
                                                <th>Дата последнего заказа</th>
                                            </tr> */}
                                            <tr>
                                                {
                                                    orderBy?.length > 0 ? (
                                                        orderBy.map((item, index) => (
                                                            <th 
                                                                key={index}
                                                                onClick={() => {
                                                                    setOrderBy(item.name)
                                                                    setOrderType(state => !state)
                                                                }}
                                                                >
                                                                <div className={"gs-table__head" + ( OrderBy == item.name ? ' active ' : '') + (OrderType ? ' asc ' : '')}>
                                                                    <div className={"gs-table__head_label"}> 
                                                                    {item.label}
                                                                    </div>
                                                                    <div className="gs-table__head_icon">
                                                                        <BsChevronDown/>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </th>
                                                        ))
                                                    ) : null
                                                }
                                            
                                            </tr>
                                            <div className="spacer"></div>
                                            {
                                                list?.length > 0 ? (
                                                    list.map((item, index) => (
                                                        <tr 
                                                            
                                                            onClick={(e) => clickHandle(e, item)}
                                                            className={'row' + (selects.find(i => i.ID == item.ID) ? ' active ' : '')} 
                                                            key={item.ID}>
                                                            <td>{item.ID}</td>
                                                            <td>{item.Name ? item.Name : 'Не указано'}</td>
                                                            <td>{item.Phone ? item.Phone : 'Не указано'}</td>
                                                            <td>{item?.DateOfBirth}</td>
                                                            <td>{item.OrdersCount}</td>
                                                            <td>{item.OrdersTotalPrice}{checkDomain('₽', '₸')}</td>
                                                            <td>{item.Bonuses} бонусов</td>
                                                            <td>{item.LastOrderDate ? item.LastOrderDate : 'Не указано'}</td>
                                                            {
                                                                item.RegistrationDate ? (
                                                                    <td>{item.RegistrationDate ? item.RegistrationDate : 'Не указано'}</td>
                                                                ) : (
                                                                    <td>Не указано</td>
                                                                )
                                                            }
                                                        </tr>
                                                    ))
                                                ) : null
                                            }
                                            
                                             
                                        </table>
                                        {
                                            (totalPages === 0 || totalPages === 1)  ? (
                                                null
                                            ) : (
                                                <TablePag
                                                    style={{padding: '40px 0'}}
                                                    total={totalPages}
                                                    current={(Offset / Limit) + 1}
                                                    onChange={e => {
                                                        if(e == 1) {
                                                            setOffset(0)
                                                        } else {
                                                            setOffset((Number(e) - 1) * Limit)
                                                        }
                                                        
                                                        
                                                    }}
                                                    pageSize={1}
                                                    jumpToEnd={() => setOffset((totalPages - 1) * Limit)}
                                                        jumpToStart={() => setOffset(0)}
                                                    />
                                            )
                                        }
                                    </>
                                ) : (
                                    <Loader/>
                                )
                            }
                            
                            
                        </div>
                        
                        <div className={`ClientsPage__body_action ${!sidebarOpen ? ' fill' : ''}`}>
                            <Button 
                                disabled={selects.length == 0}
                                onClick={openPush} 
                                styles={{boxShadow: '0px 0px 43px rgba(255, 255, 255, 0.5)'}} 
                                justify={'center'} 
                                text={'Отправить Push-уведомление выбранным пользователям'}/>
                            <Button 
                                disabled={selects.length == 0}
                                onClick={openEmail} 
                                styles={{boxShadow: '0px 0px 43px rgba(255, 255, 255, 0.5)'}} 
                                justify={'center'} 
                                text={'Отправить E-mail выбранным пользователям'}/>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default ClientsPage;