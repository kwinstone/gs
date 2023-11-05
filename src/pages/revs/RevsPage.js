import './RevsPage.scss';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../funcs/pageEnterAnimProps';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import rtService from '../../services/rtService';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import TablePag from '../../components/TablePag/TablePag';
import * as _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import { BsChevronDown } from 'react-icons/bs';
import { Rate } from 'antd';
import RevInfo from './modals/RevInfo';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearchParams, useNavigate } from 'react-router-dom';
import checkDomain from '../../funcs/checkDomain';

const rt = new rtService();

const orderBy = [
    {name: 'ID', label: 'ID'},
    {name: 'UserName', label: 'Имя'},
    {name: 'Stars', label: 'Оценка'},
    {name: 'SalePrice', label: 'Сумма'},
    {name: 'DeliveryType', label: 'Тип доставки'},
    {name: 'PayType', label: 'Тип оплаты'},
    {name: 'DateCreated', label: 'Дата заказа'},
    {name: 'Comment', label: 'Комментарий'},
] 


const RevsPage = () => {
    const {token} = useSelector(state => state);
    const nav = useNavigate()
    const [totalCount, setTotalCount] = useState('0')
    const [firstFetch, setFirstFetch] = useState(true)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    
    const [page, setPage] = useState(0)
    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(false);
    const [search, setSearch] = useState('')
    const debSearch = useDebounce(search, 500)
    const [params] = useSearchParams()

    // const [Offset, setOffset] = useState(0)
    // const [Limit, setLimit] = useState(50)
    const [TotalPages, setTotalPages] = useState(0)

    const [selected, setSelected] = useState(null)
    const [infoModal, setInfoModal] = useState(false)

    const openInfoModal = () => setInfoModal(true)
    const closeInfoModal = () => setInfoModal(false)


    useEffect(() => {
        if(params?.get('page')) {
            const page = Number(params?.get('page'))
            setPage(page)
        }   
    }, [params])
    

    const getRevs = () => {
        if(token && page >= 1) {
            setLoading(true)
            const body = {
                sortby: `${OrderBy}|${OrderType ? 'ASC' : 'DESC'}`,
                search: debSearch,
                page,
                pagination: 1   
            }
            rt.getRevs(token, body).then(res => {
                setTotalCount(res.countReviews)
                setTotalPages(Math.ceil(Number(res?.countReviews)/ 25))
                setList(res?.reviewsList)
            }).finally(_ => {
                setFirstFetch(false)
                setLoading(false)
            })
        }
    }


    useEffect(() => {
        if(token) {
            getRevs();
        }
    }, [token, OrderBy, OrderType, debSearch, page])

 
    useEffect(() => {
        if(!params?.get('page')) setPage(1)
    }, [debSearch, params])



    return (
        <motion.div
            {...pageEnterAnimProps}
            className="RevsPage page"
            >
            <RevInfo
                visible={infoModal}
                close={closeInfoModal}
                data={selected}
                />
            <div className="pageBody">
                <div className="RevsPage__body pageBody-content">
                    <Col span={24}>
                        <Row gutter={[30,30]}>
                            <Col span={24}>
                                <div className="RevsPage__search">
                                    <div className="RevsPage__search_inp">
                                        <Input
                                            maskType={String}
                                            placeholder="Поиск"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            />
                                    </div>
                                    <div className="RevsPage__search_value">
                                    Всего оценок: {totalCount}
                                    </div>
                                </div>
                            </Col>
                            <Col span={24}>

                                <div className="RevsPage__table">
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
                                                                        openInfoModal()
                                                                    }}
                                                                    className='row'
                                                                    key={index}
                                                                  
                                                                    >
                                                                    <td>{item.ID}</td>
                                                                    <td>{item.UserName}</td>
                                                                    <td>
                                                                        <Rate 
                                                                            style={{pointerEvents: 'none'}}
                                                                            className="star-rating"
                                                                            value={item.Stars}/>
                                                                    </td>
                                                                    <td>{item.SalePrice} {checkDomain('₽', '₸')}</td>
                                                                    <td>{item.DeliveryType}</td>
                                                                    <td>{item.PayType}</td>
                                                                    <td>{item.DateCreated}</td>
                                                                    <td>
                                                                        <div className={'revs-comment'}>
                                                                            {item.Comment}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : null
                                                    }
                                                </table>
                                                {
                                                    TotalPages <= 1 ? (
                                                        null
                                                    ) : (
                                                        
                                                        <TablePag
                                                            style={{padding: '40px 0'}}
                                                            pageSize={1}
                                                            current={page}
                                                            total={TotalPages}
                                                            onChange={e => {
                                                                nav(`/revs?p=Оценки&page=${e}`)
                                                                setPage(e)
                                                                // if(e == 1) {
                                                                //     setOffset(0)
                                                                // } else {
                                                                //     setOffset((Number(e) - 1) * Limit)
                                                                // }
                                                                console.log('changed')
                                                            }}
                                                            jumpToEnd={() => setPage(TotalPages)}
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

export default RevsPage;