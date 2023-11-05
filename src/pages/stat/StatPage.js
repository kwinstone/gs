
import {motion} from 'framer-motion';
import { useSelector } from "react-redux";
import statService from '../../services/statService';
import { useEffect, useState, useRef } from "react";
import { Row, Col } from "antd";
import StatChart from "./components/StatChart/StatChart";
import StatList from './components/StatList/StatList';
import DropSelect from "./components/DropSelect/DropSelect";
import './StatPage.scss';
import DropDown from "./components/DropDown/DropDown";
import orgService from "../../services/orgService";
import catService from '../../services/catService';
import moment from "moment";
import StatSale from "./components/StatSale/StatSale";
import PeriodDate from "./components/PeriodDate/PeriodDate";
import orderBy from "./helpers/orderBy";
import checkDomain from '../../funcs/checkDomain';

const st = new statService();
const os = new orgService();
const cs = new catService();





const chartTypes = [
    {label: `Продажи (${checkDomain('₽', '₸')})`, value: '1'},
    {label: 'Продажи (шт)', value: '2'},
]



const periodList = [
    {label: 'Последние 7 дней', value: '7', dLabel: '7'},
    {label: 'Последние 30 дней', value: '30', dLabel: '30'},
    {label: 'Свой промежуток', value: 'custom', dLabel: ''}
]


const StatPage = () => {
    const {token, settings} = useSelector(state => state);
    const [period, setPeriod] = useState({value: '30', label: 'Последние 30 дней', dLabel: '30'})
    const [organisations, setOrganisations] = useState('')
    const [items, setItems] = useState('')
    const [sortby, setSortby] = useState(orderBy[0].name)
    const [sortType, setSortType] = useState(true);
    const [search, setSearch] = useState('')

    const [orgsList, setOrgsList] = useState([])
    const [platesList, setPlatesList] = useState([])

    const [chartType, setChartType] = useState(chartTypes[0].label)

    const [firstFetch, setFirstFetch] = useState(true)
    const [loading, setLoading] = useState(false)

    //data
    const [totalCost, settotalCost] = useState(0)
    const [totalCostDifference, settotalCostDifference] = useState(0)
    const [totalCount, settotalCount] = useState(0)
    const [totalCountDifference, settotalCountDifference] = useState(0)
    const [chartData, setChartData] = useState(null)
    const [itemsList, setItemsList] = useState([])
    const [compareDays, setCompareDays] = useState('')
    
    const [showCalendar, setShowCalendar] = useState(false)

 

    //calendar (EX)
    const [pos, setPos] = useState({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    })
    const calRef = useRef()

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
      
        return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
      }

    const setBodyStyle = () => {
        if(calRef?.current) {
            const b = getCoords(calRef?.current)
            setPos({
                ...b,
                top: b.top + 46,
            })
        }
    }

    useEffect(() => {
        setBodyStyle()
    }, [calRef])

    useEffect(() => {
        window.addEventListener('resize', setBodyStyle)
        document.body.addEventListener('scroll', setBodyStyle)
        return () => {
            window.removeEventListener('resize', setBodyStyle)
            document.body.removeEventListener('scroll', setBodyStyle)
        }
    }, [])


    const getOrgs = () => {
        os.getOrgs(token).then(res => {
            setOrgsList(res)
        })
    }

    const getPlates = () => {
        cs.getProds(token).then(res => {
            setPlatesList(res.filter(i => i.IsSubCategory == '0'))
        })
    }

    const getStat = (body) => {
        setLoading(true)
        st.getStat(token, body).then(res => {
            
            setCompareDays(res.compareDays)
            setItemsList(res.items)
            settotalCost(res.totalCost)
            settotalCostDifference(res.totalCostDifference)
            settotalCount(res.totalCount)
            settotalCountDifference(res.totalCountDifference)
            setChartData(res.graphic)
        }).finally(_ => {
            setLoading(false)
            setFirstFetch(false)
        })
    }

    useEffect(() => {
        if(token) {
            getOrgs()
            getPlates()
        }
    }, [token])

    useEffect(() => {
        if(token) {
            if(period.value == 'custom') {
                return;
            } else {
                getStat({
                    period: period?.value !== '30' && period?.value !== '7' ? `${moment(period?.value.split(';')[0]).format('DD.MM.YYYY')};${moment(period?.value.split(';')[1]).format('DD.MM.YYYY')}` : period?.value,
                    organisations,
                    items,
                    sortby: `${sortby}|${sortType ? 'ASC' : 'DESC'}`,
                    search
                })
            }
            
        }
    }, [token, period, organisations, items, sortType, sortby, search])

    

    const selectPeriod = (value) => {
        if(value == '7') {
            setPeriod({
                value: '7',
                label: 'Последние 7 дней',
            })
            setShowCalendar(false)
        }
        if(value == '30') {
            setPeriod({
                value: '30',
                label: 'Последние 30 дней',
            })
            setShowCalendar(false)
        }   
        if(value == 'custom') {
            setShowCalendar(true)
        }
    }



    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="StatPage">
            <main className="Main">
                <div className="pageBody">
                    <div className="StatPage__body pageBody-content">

                        

                        <Row gutter={[30,30]}>
                            <Col span={24}>
                                <Row gutter={[20,20]}>
                                    <Col span={8}>
                                        <div className="period-select" ref={calRef}>
                                            <DropDown
                                                value={period?.label}
                                                list={periodList}
                                                onChange={selectPeriod}
                                                closeCalendar={() => setShowCalendar(false)}
                                            />
                                            <PeriodDate
                                                data={period}
                                                open={showCalendar}
                                                setOpen={setShowCalendar}
                                                pos={pos}
                                                setPeriod={setPeriod}
                                                />
                                        </div>
                                        
                                    </Col>
                                    <Col span={8}>
                                        <DropSelect
                                            setOrganisations={setOrganisations}
                                            type={'org'}
                                            list={orgsList}
                                            organisations={organisations}
                                            defaultVal={'Все организации'}
                                            label={'организации'}
                                            />
                                    </Col>
                                    <Col span={8}>
                                        <DropSelect
                                            setOrganisations={setItems}
                                            type={'cat'}
                                            list={platesList}
                                            organisations={items}
                                            defaultVal={'Все блюда'}
                                            label={'блюда'}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[20,20]}>
                                    <Col span={12}>
                                        <StatSale
                                            compareDays={compareDays}
                                            head={'Продажи'}
                                            value={totalCost + checkDomain('₽', '₸')}
                                            dif={totalCostDifference}
                                            />
                                    </Col>
                                    <Col span={12}>
                                        <StatSale
                                            compareDays={compareDays}
                                            head={'Количество проданных блюд'}
                                            value={totalCount}
                                            dif={totalCountDifference}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}> 
                                <StatChart
                                    setChartType={setChartType}
                                    chartTypes={chartTypes}
                                    data={chartData}
                                    type={chartType}
                                    
                                    />
                            </Col>
                            <Col span={24}>
                                <StatList
                                    search={search}
                                    setSearch={setSearch}
                                    setOrderBy={setSortby}
                                    setOrderType={setSortType}
                                    OrderBy={sortby}
                                    OrderType={sortType}    
                                    data={itemsList}
                                    firstFetch={firstFetch}
                                    loading={loading}
                                    />
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default StatPage;