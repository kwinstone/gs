import './ReservPage.scss';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../funcs/pageEnterAnimProps';
import { Row,Col } from 'antd';
import { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import { useSelector } from 'react-redux';
import rsService from '../../services/rsService';
import * as _ from 'lodash';
import TablePag from '../../components/TablePag/TablePag';
import Loader from '../../components/Loader/Loader';
import { BsChevronDown } from 'react-icons/bs';
import ReservItemModal from './modals/ReservItemModal/ReservItemModal';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';

const orderBy = [
    {name: 'ID', label: 'ID'},
    {name: 'Name', label: 'Имя'},
    {name: 'Phone', label: 'Телефон'},
    {name: 'Guests', label: 'Кол-во гостей'},
    {name: 'ReservationDate', label: 'Дата брони'},
    {name: 'DateCreated', label: 'Дата создания'},
] 

const rs = new rsService();

const ReservPage = () => {
    const {token} = useSelector(state => state);
    const nav = useNavigate()
    const [params] = useSearchParams()
    const [totalCount, setTotalCount] = useState('0')
    const [firstFetch, setFirstFetch] = useState(true)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    const [page, setPage] = useState(0)
    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(false);
    const [TotalPage, setTotalPage] = useState(0)
    const [search, setSearch] = useState('')
    const dbSearch = useDebounce(search, 500)

    const [selected, setSelected] = useState(null)
    const [itemModal, setItemModal] = useState(false)

    const openItemModal = () => setItemModal(true)
    const closeItemModal = () => {
        setSelected(null)
        setItemModal(false)
    }


    useEffect(() => {
        if(params?.get('page')) {
            const page = Number(params?.get('page'))
            setPage(page)
        }   
    }, [params])




    const getReserv = () => {
        setLoading(true)
        if(token && page >= 1) {
            setLoading(true)
            const body = {
                sortby: `${OrderBy}|${OrderType ? 'ASC' : 'DESC'}`,
                search: dbSearch,
                page,
                pagination: 1
            }
            rs.getReserv(token, body).then(res => {

                setTotalPage(Math.ceil(Number(res?.countReservation) / 25))
                setTotalCount(res?.countReservation)
                setList(res?.reservationList)
                
            }).finally(_ => {
                setFirstFetch(false)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        if(token) {
            getReserv();
        }
    }, [token, OrderBy, OrderType, dbSearch, page])


    useEffect(() => {
        if(!params?.get('page')) setPage(1)
    }, [dbSearch, params])


    return (    

        <motion.div 
            {...pageEnterAnimProps}
            className="page ReservPage">
            <ReservItemModal
                visible={itemModal}
                close={closeItemModal}
                data={selected}
                />
            <div className="pageBody">
                <div className="ReservPage__body pageBody-content">
                    <Col span={24}>
                        <Row gutter={[30,30]}>
                            <Col span={24}>
                                <div className="ReservPage__search">
                                    <div className="ReservPage__search_inp">
                                        <Input
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            maskType={String}
                                            placeholder={"Поиск"}
                                            />
                                    </div>
                                    <div className="ReservPage__search_value">
                                        Всего броней: {totalCount}
                                    </div>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="ReservPage__table">
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
                                                    <tr>
                                                        {
                                                            orderBy?.length > 0 ? (
                                                                orderBy?.map((item,index) => (
                                                                    <th
                                                                        key={index}
                                                                        onClick={() => {
                                                                            setOrderBy(item.name)
                                                                            setOrderType(state => !state)
                                                                        }}
                                                                        >
                                                                        <div className={'gs-table__head' + (OrderBy == item.name ? ' active ' : '') + (OrderType ? ' asc ' : '')}>
                                                                            <div className={'gs-table__head_label'}>
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
                                                            list?.map((item, index) => (
                                                                <tr 
                                                                    onClick={() => {
                                                                        setSelected(item)
                                                                        openItemModal();
                                                                    }}
                                                                    className='row'
                                                                    key={item.ID}
                                                                    >
                                                                    <td>{item.ID}</td>
                                                                    <td>{item.Name}</td>
                                                                    <td>{item.Phone}</td>
                                                                    <td>{item.Guests}</td>
                                                                    <td>{item.ReservationDate}</td>
                                                                    <td>{item.DateCreated}</td>
                                                                </tr>
                                                            ))
                                                        ) : null
                                                    }
                                                </table>
                                                {
                                                    TotalPage <= 1 ? (
                                                        null
                                                    ) : (
                                                        
                                                        <TablePag
                                                            style={{padding: '40px 0'}}
                                                            pageSize={1}
                                                            current={page}
                                                            total={TotalPage}
                                                            onChange={e => {
                                                                nav(`/reservations?p=Брони&page=${e}`)
                                                                setPage(e)
                                                                // if(e == 1) {
                                                                //     setOffset(0)
                                                                // } else {
                                                                //     setOffset((Number(e) - 1) * Limit)
                                                                // }
                                                            }}
                                                            jumpToEnd={() => setPage(TotalPage)}
                                                            jumpToStart={() => setPage(1)}
                                                            />
                                                    )
                                                }
                                            </>
                                        ) : null
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        </motion.div>
    )
}

export default ReservPage;