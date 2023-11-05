import './StatList.scss';
import { useState, useEffect } from 'react';
import Loader from '../../../../components/Loader/Loader';
import orderBy from '../../helpers/orderBy';
import { BsChevronDown } from 'react-icons/bs';
import * as _ from 'lodash';
import TablePag from '../../../../components/TablePag/TablePag';
import Input from '../../../../components/Input/Input';

const StatList = ({
    data,
    setOrderBy,
    setOrderType,
    OrderBy,
    OrderType,
    firstFetch,
    loading,
    search,
    setSearch
}) => {
    
    const [list, setList] = useState([])
    const [pp, setPp] = useState([])
    const [Page, setPage] = useState(0)

    useEffect(() => {
        setList(data)
        const p = _.chunk(data, 10)
        setPp(p);
    }, [data])


    useEffect(() => {
        if(pp?.length > 0) {
            setList(pp[Page])
        } else {
            setList([])
        }
    }, [Page, pp])


    return (
        <div className="StatList">
            <div className="StatList__search">
                <Input
                    placeholder={'Поиск'}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    maskType={String}
                    shadow
                    />
            </div>
            <div className="StatList__table">
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
                                            orderBy.map((item, index) => (
                                                <th 
                                                    key={index}
                                                    onClick={() => {
                                                        setOrderBy(item.name)
                                                        setOrderType(state => !state);
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
                                {/* {
                                        totalList?.map((item,inde) => (

                                        ))
                                    } */}
                                <div className="spacer"></div>
                                {
                                    list?.length > 0 ? (
                                        list?.map((item, index) => (
                                        <tr              
                                            // onClick={(e) => clickHandle(e, item)}
                                            className={'row'} 
                                            key={index}>
                                            <td>{item.ID}</td>
                                            <td>{item.Name ? item.Name : 'Не указано'}</td>
                                            <td>{item.Price}</td>
                                            <td>{item.Count}</td>
                                            <td>{item.Views}</td>
                                            <td>{item.Conversion}</td>
                                        </tr>
                                    ))) : null
                                }
                            </table>
                            {
                                pp?.length <= 1 ? (
                                    null
                                ) : (
                                    <TablePag
                                        style={{padding: '40px 0'}}
                                        total={pp.length}
                                        current={Page + 1}
                                        onChange={e => setPage(e - 1)}
                                        pageSize={1}
                                        jumpToStart={e => setPage(0)}
                                        jumpToEnd={e => setPage(pp.length - 1)}
                                        />
                                )
                            }
                        </>
                    ):null
                }
            </div>
        </div>
    )
}

export default StatList;