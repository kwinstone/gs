import './PeriodDate.scss';
import { Row, Col } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../../../funcs/pageEnterAnimProps';
import {BsChevronLeft} from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
// import { DatePicker, Space } from 'antd';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // 
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn'

import { ru } from 'date-fns/locale';
// const { RangePicker } = DatePicker;


var dayValues = {
    narrow: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    abbreviated: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    wide: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  }

const monthValues = {
    narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'Ил', 'А', 'C', "О", "Н", "Д"],
    short: ['Ян', 'Фв', 'Мр', 'Ап', 'Мй', 'Ин', 'Ил', 'Ав', 'Cн', "Ок", "Нб", "Дк"],
    abbreviated: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Cентябрь', "Октябрь", "Ноябрь", "Декабрь"],
    wide: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Cентябрь', "Октябрь", "Ноябрь", "Декабрь"]
}


const PeriodDate = ({
    data,
    open,
    setOpen,
    pos,
    setPeriod,
}) => {
    const [startValue, setStartValue] = useState('')
    const [endValue, setEndValue] = useState('')

    const rangePicker = useRef();
    
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })


    const closeOnWrapper = (e) => {
        if(e.target.classList.contains('PeriodDate')) {
            setOpen(false)
        }
    } 



    const onSave = () => {
        setPeriod({
            label: `${moment(selectionRange?.startDate).format('DD.MM.YYYY')};${moment(selectionRange?.endDate).format('DD.MM.YYYY')}`,
            value: `${selectionRange?.startDate};${selectionRange?.endDate}`
        })
        
        setOpen(false)
    }
    

    useEffect(() => {
    
        if(startValue?.length == 10) {
            setSelectionRange(state => {
                return {
                    startDate: moment(Date.parse(startValue))._d,
                    endDate: state?.endDate
                }
            })
        }
        if(endValue?.length == 10) {
            setSelectionRange(state => {
                return {
                    startDate: state?.startDate,
                    endDate: moment(Date.parse(startValue))._d
                }
            })
        }
    }, [startValue, endValue])
    


    
    if(!open) {
        return null;
    }   

    return ( 
        <motion.div {...pageEnterAnimProps} className="PeriodDate"
        onClick={(e) => closeOnWrapper(e)}
        >
            <div className="PeriodDate__in" style={{top: pos?.top, left: pos?.left}}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <div className="PeriodDate__back">
                            <button onClick={() => {
                                if(!startValue && !endValue) {
                                    setPeriod({
                                        label: 'Последние 7 дней',
                                        value: '7'
                                    })
                                    setOpen(false)
                                } else {
                                    // setPeriod({
                                    //     label: `${moment(startValue).format('DD.MM.YYYY')};${moment(endValue).format('DD.MM.YYYY')}`,
                                    //     value: `${startValue};${endValue}`
                                    // })
                                    setOpen(false)
                                }
                            }} className="PeriodDate__back_btn">
                                <span className="PeriodDate__back_btn_icon">
                                    <BsChevronLeft/>
                                </span>
                                Вернуться к предустановленным промежуткам
                            </button>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="PeriodDate__head">
                            Выбрать промежуток
                        </div>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[20, 20]}>
                            <Col span={12}>
                                <Input 
                                    // readOnly={true}
                                    value={selectionRange?.startDate ? moment(selectionRange?.startDate).format('DD.MM.YYYY') : ''}
                                    shadow={true}
                                    maskType={'00.00.0000'}
                                    placeholder={"Дата начала"}
                                    onChange={e => setStartValue(e.target.value)}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    value={selectionRange?.endDate ? moment(selectionRange?.endDate).format('DD.MM.YYYY') : ''}
                                    // readOnly={true}
                                    shadow={true}
                                    maskType={'00.00.0000'}
                                    placeholder={"Дата окончания"}
                                    onChange={e => setEndValue(e.target.value)}
                                    />
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col span={24}>
                        <Row gutter={[20,20]}>
                            <Col span={12}>
                                <div className="PeriodDate__cal">
                                    <Calendar
                                        selectRange={false}
                                        onClickDay={e => setStartValue(e)}
                                        value={startValue}
                                        className={'PeriodDate__cal_el'}
                                        />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="PeriodDate__cal">
                                    <Calendar   
                                        selectRange={false}
                                        onClickDay={e => setEndValue(e)}
                                        value={endValue}
                                        className={'PeriodDate__cal_el'}
                                        />
                                </div>
                            </Col>
                        </Row>
                    </Col> */}
                    <Col span={24}>
                        {
                            selectionRange ? (
                                <DateRangePicker
                                    showSelectionPreview={true}
                                    months={2}
                                    direction={'horizontal'}
                                    ranges={[selectionRange]}
                                    locale={{
                                        ...ru,
                                        localize: {
                                            ...ru.localize,
                                            day: buildLocalizeFn({
                                                values: dayValues,
                                                defaultWidth: 'short'
                                            }),
                                            month: buildLocalizeFn({
                                                values: monthValues,
                                                defaultWidth: 'wide'
                                            })
                                        }
                                    }}
                                    onChange={e => {
                                        setSelectionRange({
                                            startDate: e?.range1?.startDate,
                                            endDate: e?.range1?.endDate
                                        })
                                    }}
                                    />
                            ) : null
                        }
                    </Col>
                    <Col span={24}>
                        <Button
                            disabled={!selectionRange?.endDate || !selectionRange?.startDate}
                            text={'Применить'}
                            before={<SaveIcon size={16} color={'#fff'}/>}
                            onClick={onSave}
                            />
                    </Col>
                </Row>
            </div>
            
        </motion.div>
    )
}

export default PeriodDate;