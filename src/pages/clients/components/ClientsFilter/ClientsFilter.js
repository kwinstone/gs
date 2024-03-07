import './ClientsFilter.scss';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import { useState, useEffect } from 'react';
import anService from '../../../../services/anService';
import { useSelector } from 'react-redux';
import InputSelect from '../../../../components/InputSelect/InputSelect';
import { CSVLink } from "react-csv";
import Papa from 'papaparse';


const anl = new anService()


const delList = [
    {
        ID: '1',
        value: '1',
        label: 'Доставка'
    },
    {
        ID: '2',
        value: '2',
        label: 'Самовывоз'
    },
]

const ClientsFilter = ({
    setFilter,
    load,
}) => {
    const {token} = useSelector(s => s)
    const [cities, setCities] = useState([])

    const [Phone, setPhone] = useState('')
    const [AverageCostMin, setAverageCostMin] = useState('')
    const [AverageCostMax, setAverageCostMax] = useState('')
    const [CostMin, setCostMin] = useState('')
    const [CostMax, setCostMax] = useState('')
    const [CountOrdersMin, setCountOrdersMin] = useState('')
    const [CountOrdersMax, setCountOrdersMax] = useState('')
    const [firstOrderDataBegin, setfirstOrderDataBegin] = useState('')
    const [firstOrderDataEnd, setfirstOrderDataEnd] = useState('')
    const [lastOrderDataBegin, setlastOrderDataBegin] = useState('')
    const [lastOrderDataEnd, setlastOrderDataEnd] = useState('')
    const [OrderDataBegin, setOrderDataBegin] = useState('')
    const [OrderDataEnd, setOrderDataEnd] = useState('')
    const [AgeFrom, setAgeFrom] = useState('')
    const [AgeUpTo, setAgeUpTo] = useState('')
    const [City, setCity] = useState('')
    const [Gender, setGender] = useState('')
    const [DateOfBirthBegin, setDateOfBirthBegin] = useState('')
    const [DateOfBirthEnd, setDateOfBirthEnd] = useState('')
    const [DataRegistrationBegin, setDataRegistrationBegin] = useState('')
    const [DataRegistrationEnd, setDataRegistrationEnd] = useState('')

    const [lastDayOrders, setlastDayOrders] = useState('')
    const [DeliveryType, setDeliveryType] = useState(delList[0])

    const onClear = () => {
        setPhone('')
        setAverageCostMin('')
        setAverageCostMax('')
        setCostMin('')
        setCostMax('')
        setCountOrdersMin('')
        setCountOrdersMax('')
        setfirstOrderDataBegin('')
        setfirstOrderDataEnd('')
        setlastOrderDataBegin('')
        setlastOrderDataEnd('')
        setOrderDataBegin('')
        setOrderDataEnd('')
        setAgeFrom('')
        setAgeUpTo('')
        setCity('')
        setGender('')
        setDateOfBirthBegin('')
        setDateOfBirthEnd('')
        setlastDayOrders('')
        setDeliveryType(delList[0].value)
        setDataRegistrationBegin('')
        setDataRegistrationEnd('')

        setFilter(null)
    }

    const onFilter = () => {
        setFilter({
            Phone,
            AverageCostMin,
            AverageCostMax,
            CostMin,
            CostMax,
            CountOrdersMin,
            CountOrdersMax,
            firstOrderDataBegin,
            firstOrderDataEnd,
            lastOrderDataBegin,
            lastOrderDataEnd,
            OrderDataBegin,
            OrderDataEnd,
            AgeFrom,
            AgeUpTo,
            City: City?.label ? City?.label : '',
            Gender,
            DateOfBirthBegin,
            DateOfBirthEnd,
            lastDayOrders,
            DeliveryType: Number(DeliveryType.ID),
            DataRegistrationBegin,
            DataRegistrationEnd
        })
    }

    const onImport = (e) => {
        
        Papa.parse(e.target.files[0], {
            complete: (e) => {
                setPhone(e.data[1][0])
                setAverageCostMin(e.data[1][1])
                setAverageCostMax(e.data[1][2])
                setCostMin(e.data[1][3])
                setCostMax(e.data[1][4])
                setCountOrdersMin(e.data[1][5])
                setCountOrdersMax(e.data[1][6])
                setfirstOrderDataBegin(e.data[1][7])
                setfirstOrderDataEnd(e.data[1][8])
                setlastOrderDataBegin(e.data[1][9])
                setlastOrderDataEnd(e.data[1][10])
                setOrderDataBegin(e.data[1][11])
                setOrderDataEnd(e.data[1][12])
                setAgeFrom(e.data[1][13])
                setAgeUpTo(e.data[1][14])
                setCity(e.data[1][15] && cities?.length > 0 ? cities.find(i => i?.label == e.data[1][15]) : '')
                setGender(e.data[1][16])
                setDateOfBirthBegin(e.data[1][17])
                setDateOfBirthEnd(e.data[1][18])
                setlastDayOrders(e.data[1][19])
                setDeliveryType(delList.find(i => i.ID == e.data[1][20]))
                setDataRegistrationBegin(e.data[1][21])
                setDataRegistrationEnd(e.data[1][22])
            }
        })
        
    }

    const onExport = () => {
        return [
            [
                'Phone', 
                'AverageCostMin', 
                'AverageCostMax',
                'CostMin',
                'CostMax',
                'CountOrdersMin',
                'CountOrdersMax',
                'firstOrderDataBegin',
                'firstOrderDataEnd',
                'lastOrderDataBegin',
                'lastOrderDataEnd',
                'OrderDataBegin',
                'OrderDataEnd',
                'AgeFrom',
                'AgeUpTo',
                'City',
                'Gender',
                'DateOfBirthBegin',
                'DateOfBirthEnd',
                'lastDayOrders',
                'DeliveryType',
                'DataRegistrationBegin',
                'DataRegistrationEnd'
            ],
            [
                Phone,
                AverageCostMin,
                AverageCostMax,
                CostMin,
                CostMax,
                CountOrdersMin,
                CountOrdersMin,
                firstOrderDataBegin,
                firstOrderDataEnd,
                lastOrderDataBegin,
                lastOrderDataEnd,
                OrderDataBegin,
                OrderDataEnd,
                AgeFrom,
                AgeUpTo,
                City?.label ? City?.label : '',
                Gender,
                DateOfBirthBegin,
                DateOfBirthEnd,
                lastDayOrders,
                DeliveryType?.ID,
                DataRegistrationBegin,
                DataRegistrationEnd
            ]
        ]
    }

    useEffect(() => {
        if(token) {
            anl.getCities(token).then(res => {
                console.log('res', res)
                setCities(res?.Cities?.map((i,index) => ({label: i.City, value: index + 1, ID: index + 1})))
            })
        }
    }, [token])

   


    return (
        <div className='ClientsFilter'>
            <div className='ClientsFilter__main'>
                <Row gutter={[20,20]}>
                    <Col span={12}>
                        <Row gutter={[18,18]}>
                            <Col span={24}>
                                <Input
                                    placeholder={'Номера телефонов'}
                                    value={Phone}
                                    maskType={String}
                                    onChange={e => setPhone(e.target.value)}
                                    />
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10,10]}>
                                    <Col span={12}>
                                        <Input
                                            maskType={Number}
                                            placeholder={'Ср. чек от'}
                                            value={AverageCostMin}
                                            onChange={e => setAverageCostMin(e.target.value)}
                                            />
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            maskType={Number}
                                            placeholder={'Ср. чек до'}
                                            value={AverageCostMax}
                                            onChange={e => setAverageCostMax(e.target.value)}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10,10]}>
                                    <Col span={12}>
                                        <Input
                                            maskType={Number}
                                            placeholder={'Кол-во заказов от'}
                                            value={CountOrdersMin}
                                            onChange={e => setCountOrdersMin(e.target.value)}
                                            />
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            maskType={Number}
                                            value={CountOrdersMax}
                                            onChange={e => setCountOrdersMax(e.target.value)}
                                            placeholder={'Кол-во заказов до'}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10,10]}>
                                    <Col span={12}>
                                        <Input
                                            maskType={'0000-00-00'}
                                            value={lastOrderDataBegin}
                                            onChange={e => setlastOrderDataBegin(e.target.value)}
                                            placeholder={'Последняя покупка от'}
                                            />
                                    </Col>
                                    <Col span={12}>
                                        <Input  
                                            maskType={'0000-00-00'}
                                            value={lastOrderDataEnd}
                                            onChange={e => setlastOrderDataEnd(e.target.value)}
                                            placeholder={'Последняя покупка до'}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10,10]}>
                                    <Col span={12}>
                                        <Input
                                            maskType={Number}
                                            value={AgeFrom}
                                            onChange={e => setAgeFrom(e.target.value)}
                                            placeholder={'Возраст от'}
                                            />
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            maskType={Number}
                                            value={AgeUpTo}
                                            onChange={e => setAgeUpTo(e.target.value)}
                                            placeholder={'Возраст до'}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10,10]}>
                                    <Col span={12}>
                                        <InputSelect
                                            list={delList}
                                            placeholder={'Тип доставки'}
                                            value={DeliveryType?.label}
                                            onSelect={(e) => {
                                                console.log(e)
                                                setDeliveryType(e)
                                            }}
                                            />
                                    </Col>
                                    <Col span={12}>
                                        <InputSelect
                                            list={cities}
                                            placeholder={'Город'}
                                            value={City?.value}
                                            onSelect={(e,v) => {
                                                console.log('f', e,v)
                                                setCity(e)
                                            }}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10,10]}>
                                    <Col span={12} style={{ position: 'relative'}}>
                                        <InputSelect
                                            list={[
                                                {
                                                    ID: '1',
                                                    value: 'M',
                                                    label: 'Мужской'
                                                },
                                                {
                                                    ID: '2',
                                                    value: 'F',
                                                    label: 'Женский'
                                                }
                                            ]}
                                            placeholder={'Пол'}
                                            value={Gender}
                                            onSelect={(e) => {
                                                setGender(e.value)
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 26,
                                            fontWeight: 600,
                                            display: Gender ? 'none' : 'block'
                                        }}>Пол</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[18,18]}>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    placeholder={'Дата выборки от'}
                                    value={OrderDataBegin}
                                    onChange={e => setOrderDataBegin(e.target.value)}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={OrderDataEnd}
                                    onChange={e => setOrderDataEnd(e.target.value)}
                                    placeholder={'Дата выборки до'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={Number}
                                    value={CostMin}
                                    onChange={e => setCostMin(e.target.value)}
                                    placeholder={'Сумма заказов от'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={Number}
                                    value={CostMax}
                                    onChange={e => setCostMax(e.target.value)}
                                    placeholder={'Сумма заказов до'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={firstOrderDataBegin}
                                    onChange={e => setfirstOrderDataBegin(e.target.value)}
                                    placeholder={'Первая покупка от'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={firstOrderDataEnd}
                                    onChange={e => setfirstOrderDataEnd(e.target.value)}
                                    placeholder={'Первая покупка до'}
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    maskType={Number}
                                    placeholder={' За сколько дней брать информацию'}
                                    value={lastDayOrders}
                                    onChange={e => setlastDayOrders(e.target.value)}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={DateOfBirthBegin}
                                    onChange={e => setDateOfBirthBegin(e.target.value)}
                                    placeholder={'День рождения от'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={DateOfBirthEnd}
                                    onChange={e => setDateOfBirthEnd(e.target.value)}
                                    placeholder={'День рождения до'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={DataRegistrationBegin}
                                    onChange={e => setDataRegistrationBegin(e.target.value)}
                                    placeholder={'Дата регистрации от'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Input
                                    maskType={'0000-00-00'}
                                    value={DataRegistrationEnd}
                                    onChange={e => setDataRegistrationEnd(e.target.value)}
                                    placeholder={'Дата регистрации до'}
                                    />
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </div>
            <div className='ClientsFilter__action'>
                <Row gutter={[20,20]}>
                    <Col span={12}>
                        <Row gutter={[10,10]}>
                            <Col span={12}>
                                <Button
                                    styles={{width: '100%'}}
                                    text={'Поиск'}
                                    load={load}
                                    onClick={onFilter}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    onClick={onClear}
                                    styles={{width: '100%'}}
                                    text={'Очистить все поля'}
                                    />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[10,10]}>
                            <Col span={12}>
                                <input onChange={onImport} value={''} id='csv-import' type="file" className='ClientsFilter__import_input' accept='.csv'/>
                                <label htmlFor="csv-import" className='ClientsFilter__import_label'>
                                Импортировать
                                </label>

                            </Col>
                            <Col span={12}>
                                <CSVLink
                                    data={onExport()}
                                    >
                                    <Button
                                        styles={{width: '100%'}}
                                        variant={'light'}
                                        text={'Экспортировать'}
                                        />
                                </CSVLink>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ClientsFilter;