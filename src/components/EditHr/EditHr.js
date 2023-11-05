import { useEffect, useState } from 'react';
import './EditHr.scss';
import catService from '../../services/catService';
import { useSelector } from 'react-redux';
import {Row, Col, Select, message} from 'antd';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const cs = new catService();

const EditHr = ({
    ID,
    onSave,
    buttonLabel = 'Изменить иерархию' ,
    type="only",
    shadow = false,
    isPlate = true
}) => {
    const nav = useNavigate();
    const {token} = useSelector(state => state)
    const [cats, setCats] = useState([])
    const [subcats, setSubcats] = useState([])
    const [load, setLoad] = useState(false)

    const [isActive, setIsActive] = useState(false)

    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedSubcat, setSelectedSubcat] = useState(null);
    
    const [catSearchVal, setCatSearchVal] = useState('')
    const [subcatSearchVal, setSubcatSearchVal] = useState('')


    useEffect(() => {
    
        if(token) {
            cs.getCatsNames(token, {
                elements: 'categories',
            }).then(res => {
                if(isPlate) {
                    setCats(res.map(i => {
                        return {
                            ...i,
                            value: i?.ID,
                            label: i.Name
                        }
                    }))
                } else {
                    setCats([{
                        value: 0,
                        label: 'Без категории',
                    }, ...res.map(i => {
                        return {
                            ...i,
                            value: i?.ID,
                            label: i.Name
                        }
                    })])
                }
            })
            cs.getCatsNames(token, {
                elements: 'subcategories',
                CategoryID: selectedCat?.ID ? selectedCat?.ID : '0'
            }).then(res => {
                setSubcats([{
                    value: 0,
                    label: 'Без подкатегории'
                }, ...res.map(i => {
                    return {
                        ...i,
                        value: i?.ID,
                        label: i?.Name
                    }
                })])
                
            })
        }
    }, [token, selectedCat, isPlate])


    // useEffect(() => {
    //     if(selectedCat?.ID == 0) {
    //         setSelectedSubcat({ID: 0})
    //     }
    // }, [selectedCat])


    const saveHandle = () => {
        setLoad(true)
        if(type == 'only') {
            const body = {
                ID,
                CategoryID: selectedCat?.ID ? selectedCat?.ID : 0,
                ParentID: selectedSubcat?.ID ? selectedSubcat?.ID : 0
            }
            onSave(token, body).then(res => {
                if(res) {
                    message.success('Иерархия изменена')
                    if(isPlate) {
                        nav('/catalog?p=Каталог')
                    }
                }
            }).finally(_ => setLoad(false))
        }
        if(type == 'all') {
            const body = {
                CategoryParent: ID,
                CategoryID: selectedCat?.ID ? selectedCat?.ID : 0,
                ParentID: selectedSubcat?.ID ? selectedSubcat?.ID : 0
            }
            onSave(token, body).then(res => {
                if(res) {
                    message.success('Иерархия у всех дочерних элементов изменена')
                }
            }).finally(_ => setLoad(false))
        }
    }


    const cancelHandle = () => {
        setIsActive(false)
        setSelectedCat(null)
        setSelectedSubcat(null)
        setSubcatSearchVal('')
        setCatSearchVal('')
    }


    return (
        <div className={`EditHr ${shadow ? ' shadow ' : ''}`}>
            <Row gutter={[20,20]}>
                {
                    !isActive ? (
                        <Col span={24}>
                            <Button
                                styles={{width: '100%'}}
                                text={buttonLabel}
                                onClick={() => setIsActive(true)}
                                />
                        </Col>
                    ) : (
                        <Col span={24}>
                            <Row gutter={[15,15]}>
                                <Col span={24}>
                                    <div className="def-label">Категория <span style={{color: 'red'}}>*</span></div>
                                    <Select
                                        className='EditHr__select'
                                        showSearch
                                        placeholder="Выберите категорию"
                                        popupClassName='EditHr__list'
                                        filterOption={(input, option) => 
                                            (option?.Name ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        searchValue={catSearchVal}
                                        onSearch={e => setCatSearchVal(e)}
                                        options={cats}
                                        onChange={e => {
                                            if(e == 0) {
                                                setSelectedCat({ID: 0})
                                            } else {
                                                setSelectedCat(cats?.find(i => i.ID == e))
                                            }
                                        }}
                                        />
                                </Col>
                                <Col span={24}>
                                    <div className="def-label">Подкатегории <span style={{color: 'red'}}>*</span></div>
                                    <Select
                                        // className={'EditHr__select' + (!selectedCat || selectedCat?.ID == 0 ? ' disabled ' : '')}
                                        className={'EditHr__select' + (!selectedCat ? ' disabled ' : '')}
                                        showSearch
                                        placeholder="Выберите подкатегорию"
                                        popupClassName='EditHr__list'
                                        filterOption={(input, option) => 
                                            (option?.Name ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        searchValue={subcatSearchVal}
                                        onSearch={e => setSubcatSearchVal(e)}
                                        options={subcats}
                                        onChange={e => {
                                            if(e == 0) {
                                                setSelectedSubcat({ID: 0})
                                            } else {
                                                setSelectedSubcat(subcats?.find(i => i.ID == e))
                                            }
                                        }}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[10,10]}>
                                        <Col span={12}>
                                            <Button
                                                onClick={saveHandle}
                                                styles={{width: '100%'}}
                                                text={'Сохранить'}
                                                disabled={!selectedCat || !selectedSubcat}
                                                load={load}
                                                />
                                        </Col>
                                        <Col span={12}>
                                            <Button
                                                styles={{width: '100%'}}
                                                onClick={cancelHandle}
                                                text={'Отмена'}
                                                variant={'danger'}
                                                />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}

export default EditHr;