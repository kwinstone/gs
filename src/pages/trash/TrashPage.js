import './TrashPage.scss';
import {Row, Col, message} from 'antd';
import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import trService from '../../services/trService';
import switchContent from './helpers/switchContent';


const service = new trService()

const TrashPage = () => {
    const {token} = useSelector(s => s)

    const [activeTab, setActiveTab] = useState('1')

    const [catsList, setCatsList] = useState([])
    const [catsLoad, setCatsLoad] = useState(false)

    const [subcatsList, setSubcatsList] = useState([])
    const [subcatsLoad, setSubcatsLoad] = useState(false)

    const [prodsList, setProdsList] = useState([])
    const [prodsLoad, setProdsLoad] = useState(false)


    const getCats = () => {
        if(token) {
            service.getRemovedElements(token, {element: 'categories'}).then(res => {
                setCatsList(res)
            })
        }
    }

    const getSubcats = () => {
        if(token) {
            service.getRemovedElements(token, {element: 'subcategories'}).then(res => {
                setSubcatsList(res)
            })
        }
    }

    const getProds = () => {
        if(token) {
            service.getRemovedElements(token, {element: 'plates'}).then(res => {
                setProdsList(res)
            })
        }
    }


    useEffect(() => {
        getCats()
        getSubcats()
        getProds()
    }, [token])


    const deleteItem = (element, id) => {
        if(element && id && token) {
            service.deleteTrashItem(token, {element, ids: id}).then(res => {
                if(res?.error === 0) {
                    if(element === 'categories') {
                        setCatsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i?.ID == id), 1)
                            return [...m]
                        })
                    }
                    if(element === 'subcategories') {
                        setSubcatsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i?.ID == id), 1)
                            return [...m]
                        })
                    }
                    if(element === 'plates') {
                        setProdsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i?.ID == id), 1)
                            return [...m]
                        })
                    }
                } else {
                    message.error('Произошла ошибка')
                }
            }) 
        }
    }


    const restoreItem = (element, ids) => {
        if(element && ids && token) {
            service.restoreTrashItem(token, {element, ids}).then(res => {
                if(res?.error === 0) {
                    if(element === 'categories') {
                        setCatsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i?.ID == ids), 1)
                            return [...m]
                        })
                    }
                    if(element === 'subcategories') {
                        setSubcatsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i?.ID == ids), 1)
                            return [...m]
                        })
                    }
                    if(element === 'plates') {
                        setProdsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i?.ID == ids), 1)
                            return [...m]
                        })
                    }
                } else {
                    message.error(res?.message)
                }
            })
        }
    }


    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className='TrashPage page'
            >
            <main className='Main'>
                <div className='pageBody'>
                    <div className='TrashPage__body pageBody-content'>
                        <Row gutter={[40,40]}>
                            <Col span={24}>
                                <div className='TrashPage__body_tabs'>
                                    <div className='TrashPage__body_tabs_item'>
                                        <Button
                                            text={'Категории'}
                                            variant={activeTab === '1' ? 'default' : 'light'}
                                            onClick={() => setActiveTab('1')}
                                            />
                                    </div>
                                    <div className='TrashPage__body_tabs_item'>
                                        <Button
                                            text={'Подкатегории'}
                                            variant={activeTab === '2' ? 'default' : 'light'}
                                            onClick={() => setActiveTab('2')}
                                            />
                                    </div>
                                    <div className='TrashPage__body_tabs_item'>
                                        <Button
                                            text={'Блюда'}
                                            variant={activeTab === '3' ? 'default' : 'light'}
                                            onClick={() => setActiveTab('3')}
                                            />
                                    </div>
                                </div>
                            </Col>
                            <Col span={24}>
                                {switchContent(activeTab, {cats: catsList, subs: subcatsList, prods: prodsList}, deleteItem, restoreItem)}
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>

        </motion.div>
    )
}

export default TrashPage;