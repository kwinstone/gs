import './PolygonModal.scss';
import { message, Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import { Row, Col } from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import orgService from '../../../../services/orgService';
import PolyPrice from '../polyPrice/PolyPrice';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import MapPolygon from '../../../../components/MapPolygon/MapPolygon';
import SelectColor from './SelectColor/SelectColor';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Text from '../../../../components/Text/Text';
import checkDomain from '../../../../funcs/checkDomain';
import switchCrm from '../../../../funcs/switchCrm';
const os = new orgService()


const PolygonModal = ({ visible, close, data, orgId, setPolList }) => {

    const { token, settings } = useSelector(state => state)
    const [selected, setSelected] = useState(null);
    const [Name, setName] = useState('')
    const [MinPrice, setMinPrice] = useState('')
    const [DeliveryTime, setDeliveryTime] = useState('')
    const [Delivery, setDelivery] = useState([])
    const [coords, setCoords] = useState(null)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [polyPriceModal, setPolyPriceModal] = useState(false)
    const [editPrice, setEditPrice] = useState(null)
    const [Color, setColor] = useState('')
    const [IsOnlyForOnlinePayment, setIsOnlyForOnlinePayment] = useState('0')
    const [isLoading, setIsLoading] = useState(false)
    // const [DeliveryItemID, setDeliveryItemID] = useState('')
    // const [DeliveryItemCount, setDeliveryItemCount] = useState('');

    const [textCoords, setTextCoords] = useState()

    useEffect(() => {
        if (data) {
            // setDeliveryItemID(data?.DeliveryItemID)
            // setDeliveryItemCount(data?.DeliveryItemCount)
            setMinPrice(data?.MinPrice)
            setDelivery(data?.Delivery)
            setDeliveryTime(data?.DeliveryTime)
            // setCoords(data?.Coordinates)
            setTextCoords(data?.Coordinates.map(item => {
                return `${item.lng},${item.lat}`
            }).join(' '))
            setColor(data?.Color)
            setName(data?.Name)
            setIsOnlyForOnlinePayment(data?.IsOnlyForOnlinePayment)
        } else {
            // setCoords(null)
            setTextCoords('')
            setColor('#000000')
        }
    }, [data, visible])

    const closePriceModal = () => {
        setEditPrice(null)
        setPolyPriceModal(false)
    }
    const openPriceModal = () => {
        setPolyPriceModal(true)
    }
    const openEditPrice = ({ ...item }) => {
        setEditPrice(item)
        openPriceModal()
    }
    const closeHandle = () => {
        setSelected(null)
        setMinPrice('')
        setDeliveryTime('')
        setDelivery([])
        setCoords(null)
        setName('')
        setIsOnlyForOnlinePayment('0')
        // setDeliveryItemID('')
        // setDeliveryItemCount('')
        close();
    }

    useEffect(() => {
        if (textCoords) {

            const arr = textCoords.split(' ');
            const r = arr.filter(item => {
                const ff = item.split(',')
                if (ff.length == 2) {
                    return item
                }

            }).map(g => {
                const tt = g.split(',')
                return {
                    lat: Number(tt[1]),
                    lng: Number(tt[0])
                }
            })
            setCoords(r)
        }
    }, [textCoords])

    const removeDelItem = (index) => {
        const r = Delivery;
        const m = r.splice(index, 1)
        setDelivery([...r])
    }

    useEffect(() => {
        if (selected?.length > 0) {
            setTextCoords(selected.map(item => {
                return `${item.lng()},${item.lat()}`
            }).join(' '))
        }
    }, [selected])

    const onSave = () => {
        console.log('EDIT')
        if (!data) {
            if (textCoords) {
                setIsLoading(true)
                const data = {
                    OrganisationID: orgId,
                    Disabled: '0',
                    // Coordinates: selected.map(item => {
                    //     return `${item.lat()},${item.lng()}`
                    // }).join(' '),
                    Coordinates: textCoords.split(' ').map(item => {
                        return item.split(',').reverse()
                    }).map(item => item.join(',')).join(' '),
                    MinPrice,
                    DeliveryTime,
                    Delivery,
                    Name,
                    Color,
                    IsOnlyForOnlinePayment,
                    // DeliveryItemCount,
                    // DeliveryItemID
                }

                os.addPol(token, data).then(res => {
                    console.log(res)
                    setPolList(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                    // setPolList(res)
                }).finally(_ => {
                    closeHandle()
                    setIsLoading(false)
                })
            } else {
                // os.addPol(token, {
                //     OrganisationID: orgId,
                //     Disabled: '0',
                //     Coordinates: coords.map(item => {
                //         return `${item.lat},${item.lng}`
                //     }).join(' '),
                //     MinPrice,
                //     DeliveryTime,
                //     Delivery,
                // }).then(res => {
                //     setLocation(res.map(item => {
                //         return {
                //             ...item,
                //             Coordinates: item.Coordinats.split(' ').map(item => {
                //                 return {
                //                     lat: Number(item.slice(0, item.indexOf(','))),
                //                     lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                //                 }
                //             }),
                //             Coordinats: null
                //         }
                //     }))
                // }).finally(_ => {
                //     closeHandle()
                // })
                message.error('Полигон не выбран')
            }

        } else {
            if (textCoords) {
                setIsLoading(true)
                os.editPol(token, {
                    PolygonID: data.PolygonID,
                    OrganisationID: orgId,
                    Disabled: '0',
                    // Coordinates: selected.map(item => {
                    //     return `${item.lat()},${item.lng()}`
                    // }).join(' '),
                    Coordinates: textCoords.split(' ').map(item => {
                        return item.split(',').reverse()
                    }).map(item => item.join(',')).join(' '),
                    MinPrice,
                    DeliveryTime,
                    Delivery,
                    Name,
                    Color,
                    IsOnlyForOnlinePayment,
                    // DeliveryItemCount,
                    // DeliveryItemID
                }).then(res => {
                    console.log(res)
                    setPolList(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                }).finally(_ => {
                    closeHandle()
                    setIsLoading(false)
                })

            } else {
                setIsLoading(true)
                os.editPol(token, {
                    PolygonID: data.PolygonID,
                    OrganisationID: orgId,
                    Disabled: '0',
                    MinPrice,
                    DeliveryTime,
                    // Coordinates: data.Coordinates.map(item => {
                    //     return `${item.lat},${item.lng}`
                    // }).join(' '),
                    Coordinates: textCoords,
                    Delivery,
                    Name,
                    Color,
                    IsOnlyForOnlinePayment,
                    // DeliveryItemCount,
                    // DeliveryItemID
                }).then(res => {
                    console.log(res)
                    setPolList(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                }).finally(_ => {
                    closeHandle()
                    setIsLoading(false)
                })
            }

        }

    }

    const onDelete = () => {
        console.log('DELETE')
        setDelLoad(true)
        os.deletePol(token, { PolygonID: data.PolygonID }).then(res => {

            setPolList(res.map(item => {
                return {
                    ...item,
                    Coordinates: item.Coordinats.split(' ').map(item => {

                        return {
                            lat: Number(item.slice(0, item.indexOf(','))),
                            lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                        }
                    }),
                    Coordinats: null,
                }
            }))
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }



    return (
        <Modal width={1220} className="Modal" open={visible} onCancel={closeHandle}>
            <PolyPrice
                data={editPrice}
                visible={polyPriceModal}
                close={closePriceModal}
                update={setDelivery}
            />
            <div className="Modal__head">Выбрать полигон</div>
            <form className="Modal__form">
                <Row gutter={[25, 0]}>
                    <Col span={14}>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <div className="Modal__form_map" style={{ height: 290 }}>
                                    <MapPolygon
                                        color={Color}
                                        id={'polygon-modal'}
                                        setSelected={setSelected}
                                        polygonCoords={coords}
                                        // center={{lat: 55.7522200,lng: 37.6155600}}
                                        center={checkDomain({ lat: 55.7522200, lng: 37.6155600 }, { lat: 43.23365, lng: 76.89623 })}
                                    />
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="def-label">Выберите цвет полигона</div>
                                <SelectColor color={Color} setColor={setColor} />
                            </Col>
                            <Col span={24}>
                                <Checkbox
                                    shadow={true}
                                    id={'IsOnlyForOnlinePayment'}
                                    text={'Только для онлайн оплаты'}
                                    checked={IsOnlyForOnlinePayment == '1'}
                                    onChange={e => e.target.checked ? setIsOnlyForOnlinePayment('1') : setIsOnlyForOnlinePayment('0')}
                                />
                            </Col>
                            <Col span={24}>
                                <Input
                                    maskType={String}
                                    shadow={true}
                                    placeholder={'Название'}
                                    value={Name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Col>
                            <Col span={24}>
                                <Input
                                    scale={5}
                                    maskType={Number}
                                    value={MinPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    shadow
                                    placeholder={'Минимальная сумма заказа'} />
                            </Col>
                            <Col span={24}>
                                <Input
                                    maskType={Number}
                                    value={DeliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                    shadow
                                    placeholder={'Время доставки'} />
                            </Col>
                            {/* <Col span={24}>
                                {
                                    switchCrm(settings, 
                                        <Input
                                            value={DeliveryItemID}
                                            onChange={e => setDeliveryItemID(e.target.value)}
                                            maskType={String}
                                            placeholder={'ID позиции доставки в IIko'}
                                            shadow
                                            />,
                                        <Input
                                            maskType={String}
                                            value={DeliveryItemID}
                                            onChange={e => setDeliveryItemID(e.target.value)}
                                            placeholder={'ID позиции доставки в RKeeper'}
                                            shadow
                                            />,
                                            <Input
                                            maskType={String}
                                            value={DeliveryItemID}
                                            onChange={e => setDeliveryItemID(e.target.value)}
                                            placeholder={'ID позиции доставки в 1C'}
                                            shadow
                                            />,
                                            <Input
                                            maskType={String}
                                            value={DeliveryItemID}
                                            onChange={e => setDeliveryItemID(e.target.value)}
                                            placeholder={'ID позиции доставки в FrontPad'}
                                            shadow
                                            />
                                        )
                                }
                            </Col> */}
                            {/* <Col span={24}>
                                <Input
                                    maskType={Number}
                                    value={DeliveryItemCount}
                                    onChange={e => setDeliveryItemCount(e.target.value)}
                                    placeholder="Количество позиций доставки"
                                    shadow
                                    />
                            </Col> */}
                            <Col span={24}>
                                <Button
                                    styles={{ width: '100%' }}
                                    text={'Сохранить'}
                                    before={<SaveIcon color={'#fff'} size={20} />}
                                    load={saveLoad}
                                    disabled={isLoading}
                                    type={'button'}
                                    onClick={onSave}
                                />
                                {
                                    data ? (
                                        <Button
                                            styles={{ width: '100%', marginTop: 10 }}
                                            text={'Удалить'}
                                            before={<BsTrash size={20} />}
                                            variant={'danger'}
                                            load={delLoad}
                                            type={'button'}
                                            onClick={onDelete}
                                        />
                                    ) : null
                                }
                            </Col>
                        </Row>

                    </Col>
                    <Col span={10}>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                {/* <Input
                                    shadow={true}
                                    placeholder={'Координаты'}
                                    value={textCoords}
                                    maskType={String}
                                    /> */}
                                <Text
                                    value={textCoords}
                                    placeholder={'Координаты'}
                                    shadow
                                    onChange={(e) => setTextCoords(e.target.value)}
                                />
                            </Col>
                            <Col span={24} className="def-label" style={{ margin: 0 }}>
                                Таблица цен доставки
                            </Col>
                            {
                                Delivery && Delivery.length > 0 ? (
                                    <Col span={24}>
                                        <div className="SelectPoly__list">
                                            <Row gutter={[10, 10]}>
                                                {
                                                    Delivery.map((item, index) => (
                                                        <Col span={24}>
                                                            <div className="SelectPoly__item" key={index}>
                                                                <div className="SelectPoly__item_main" onClick={() => openEditPrice({ ...item })}>
                                                                    <div className="SelectPoly__item_p">
                                                                        <div className="SelectPoly__item_p_name">Сумма заказа от</div>
                                                                        <div className="SelectPoly__item_p_value">{item.MinPrice}</div>
                                                                    </div>
                                                                    <div className="SelectPoly__item_p">
                                                                        <div className="SelectPoly__item_p_name">Цена доставки</div>
                                                                        <div className="SelectPoly__item_p_value">{item.DeliveryPrice}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="SelectPoly__item_action">
                                                                    <Button
                                                                        type={'button'}
                                                                        styles={{ width: '100%' }}
                                                                        variant={'danger'}
                                                                        text={'Удалить цену'}
                                                                        before={<BsTrash />}
                                                                        onClick={() => removeDelItem(index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>


                                        </div>
                                    </Col>
                                ) : null
                            }

                            <Col span={24}>
                                <Pl
                                    shadow={true}
                                    onClick={openPriceModal}
                                    style={{ backgroundColor: '#fff', width: '100%' }}
                                    text={'Добавить цену'} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}

export default PolygonModal;