import './OrdersPage.scss';
import Loader from '../../components/Loader/Loader';
import useContent from '../../hooks/useContent';
import { useEffect, useState } from 'react';
import OrderInfo from './modals/OrderInfo/OrderInfo';
import useModal from '../../hooks/useModal';
import {motion} from 'framer-motion';
import orderBy from './helpers/orderBy';
import { useSelector } from 'react-redux';
import anService from '../../services/anService';
import {BsChevronDown} from 'react-icons/bs';
import checkPay from './helpers/checkPay';
import checkDelivery from './helpers/checkDelivery';
import OrdersInfo from './components/OrdersInfo/OrdersInfo';
import TablePag from '../../components/TablePag/TablePag';
import checkDomain from '../../funcs/checkDomain';

import * as _ from 'lodash';
import { useDebounce } from '@uidotdev/usehooks';

import { useNavigate, useSearchParams } from 'react-router-dom';


const ans = new anService();


const OrdersPage = () => {
    const {token} = useSelector(state => state)
    const [params] = useSearchParams()
    const nav = useNavigate()
    const {loading, view, error, setLoading, setView} = useContent();
    const {visible, hideModal, showModal} = useModal();
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(null);
    const [pp, setPp] = useState([])
    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(false)
    // const [page, setPage] = useState(0)
    const [firstFetch, setFirstFetch] = useState(true)
    const [search, setSearch] = useState('')
    const debSearch = useDebounce(search, 1000)
    const [Field, setField] = useState({ID: 'id', value: 'ID'})

    const [totalOrders, setTotalOrders] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [statuses, setStatuses] = useState([])

    const [Limit, setLimit] = useState(50)
    const [Offset, setOffset] = useState(0)
    const [totalPages, setTotalPages] = useState(0)


    useEffect(() => {
        if(params?.get('page') && Limit) {
            const page = Number(params?.get('page'))
            if(page === 1) setOffset(0)
            if(page > 1) setOffset(Limit * (page - 1))
        }   
    }, [params, Limit])

 

    const getOrders = () => {
        if(token) {
            setLoading(true)
            // setPage(1)
            const body = {
                OrderBy,
                OrderType: OrderType ? 'ASC' : 'DESC',
                Search: debSearch,
                Offset,
                Limit,
                Field: Field?.ID
            }
            ans.getOrders(token, body).then(res => {
                setList(res?.Orders)
                
                setTotalPrice(res?.TotalPrice)
                setTotalOrders(Number(res?.TotalCount))
                setTotalPages(Math.ceil(Number(res?.TotalCount) / Limit))
                 
            }).finally(_ => {
                setLoading(false)
                setFirstFetch(false)
            })
            ans.getStatuses(token).then(res => {
                setStatuses(res?.Statuses)
            })
        }
    }

    const selectItem = (item) => {
        setSelected(item)
        showModal()
    }
  

    useEffect(() => {
        getOrders()
    }, [token, OrderBy, OrderType, debSearch, Limit, Offset, Field])


    useEffect(() => {
        if(!params?.get('page')) setOffset(0)
    }, [debSearch, params, Field])

    useEffect(() => console.log(list), [list])

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="OrdersPage page">
            <OrderInfo 
                updateList={getOrders}
                data={selected} 
                visible={visible} 
                close={hideModal}/>
            <main className="Main">
                <div className="pageBody">
                    <div className="OrdersPage__body pageBody-content">
                        <OrdersInfo
                            total={totalOrders}
                            price={totalPrice}
                            value={search}
                            setValue={setSearch}
                            Field={Field}
                            setField={setField}
                            />
                        <div className="OrdersPage__body_table">
                            {
                                !firstFetch ? (
                                    <>
                                        <table className="gs-table">
                                                {
                                                    loading ? (
                                                        <div className="gs-table__load">
                                                            <Loader/>
                                                        </div>
                                                    ) : null
                                                }
                                                <tr>
                                                    {
                                                        orderBy?.length > 0 ? (
                                                            orderBy.map((item) => (
                                                                <th 
                                                                    key={item.ID}
                                                                    onClick={() => {
                                                                        if(item?.name) {
                                                                            setOrderBy(item.name)
                                                                            setOrderType(state => !state)
                                                                        }
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
                                                    list && list.length > 0 ? (
                                                        list.map((item) => (
                                                            <tr 
                                                                onClick={() => selectItem(item)}
                                                                className={'row'} 
                                                                key={item.ID}>
                                                                <td>{item.ID}</td>
                                                                <td>{item.UserName}</td>
                                                                <td>{<div style={{color: statuses.find(i => i.ID == item.Status)?.Color}}>{statuses.find(i => i.ID == item?.Status)?.Name}</div>}</td>
                                                                <td>{item.SalePrice} {checkDomain('₽', '₸')}</td>
                                                                <td>{checkDelivery(Number(item.DeliveryType))}</td>
                                                                <td>{checkPay(Number(item.PayType))}</td>
                                                                <td>{item.DateCreated}</td>
                                                                <td>
                                                                    {item?.IsPaid == '1' ? 'Оплачено' : 'Не оплачено'}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        Number(item?.DeliveryType) === 2 && item?.OrganisationID
                                                                    }
                                                                    {
                                                                        Number(item?.DeliveryType) === 1 && (
                                                                            <>
                                                                                {item?.City && item?.City}
                                                                                {item?.Street && `, ул.${item?.Street}`}
                                                                                {item?.HouseNumber && `, дом ${item?.HouseNumber}`}
                                                                                {item?.Apt && `, кв.${item?.Apt}`}
                                                                                {item?.Entrance && `, подъезд ${item?.Entrance}`}
                                                                                {item?.Floor && `, этаж ${item?.Floor}`}
                                                                                {item?.DoorPhone && `, домофон ${item?.DoorPhone}`}
                                                                            </>
                                                                        )
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : null
                                                }
                                            </table>
                                            {
                                                totalPages <= 1 ? (
                                                    null
                                                ) : (
                                                    
                                                    <TablePag
                                                        style={{padding: '40px 0'}}
                                                        pageSize={1}
                                                        current={(Offset / Limit) + 1}
                                                        total={totalPages}
                                                        onChange={e => {
                                                            if(e == 1) {
                                                                setOffset(0)
                                                            } else {
                                                                setOffset((Number(e) - 1) * Limit)
                                                            }
                                                            nav(`/orders?p=Заказы&page=${e}`)
                                                            
                                                        }}
                                                        jumpToEnd={() => setOffset((totalPages - 1) * Limit)}
                                                        jumpToStart={() => setOffset(0)}
                                                        />
                                                )
                                            }
                                            
                                        
                                    </>
                                    
                                ) : <Loader/>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default OrdersPage;