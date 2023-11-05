import './RatesetPage.scss';
import Pl from '../../components/Pl/Pl';
import Button from '../../components/Button/Button';
import SaveIcon from '../../icons/SaveIcon/SaveIcon';
import { Row,Col } from 'antd';
import {motion} from 'framer-motion';
import rtService from '../../services/rtService';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import OptItem from './components/OptItem/OptItem';
import EditOpt from './modals/editOpt/EditOpt';


const rs = new rtService();

const RatesetPage = () => {
    const {token} = useSelector(state => state)
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState(null)
    const [editModal, setEditModal] = useState(false)

    const [createType, setCreateType] = useState('0')

    const [positive, setPositive] = useState([])
    const [negative, setNegative] = useState([])

    useEffect(()=> {
        if(token) {
            rs.getOptions(token).then(res => {
                setPositive(res.positive)
                setNegative(res.negative)
                
            })
        }
    }, [token])


    const openEditModal = () => setEditModal(true)
    const closeEditModal = () => {
        setSelected(null)
        setCreateType('')
        setEditModal(false)
    }

    const selectItem = (item) => {
        setSelected(item)
        openEditModal();
    }


    const onSave = () => {
        setLoad(true);
        const body = {
            positive: positive?.filter(item => {
                delete item.index;
                return item
            }),
            negative: negative?.filter(item => {
                delete item.index;
                return item
            })
        }
        rs.editOption(token, body).then(res => {
            
        }).finally(_ => {
            setLoad(false)
        })
    }



    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className=" RatesetPage page">


            <EditOpt
                positiveList={positive}
                negativeList={negative}
                setPositiveList={setPositive}
                setNegativeList={setNegative}
                visible={editModal}
                close={closeEditModal}
                data={selected}
                positive={createType}
                />

            <div className="pageBody">
                <div className="RatesetPage__body pageBody-content">
                    <Row gutter={[30,0]}>
                        <Col span={12}>
                            <Row gutter={[0,20]}>
                                <Col span={24}>
                                    <div className="def-label" style={{marginBottom: 0}}>Положительные опции</div>
                                </Col>
                                {
                                    positive?.length > 0 ? (
                                        positive?.map((item, index) => (
                                            <Col span={24}>
                                                <OptItem
                                                    {...item}
                                                    onSelect={selectItem}
                                                    index={index}
                                                    />
                                            </Col>
                                        ))
                                    ) : null
                                }
                                <Col span={24}>
                                    <Pl 
                                        onClick={() => {
                                            setSelected(null)
                                            setCreateType('1')
                                            openEditModal();
                                        }} 
                                        style={{backgroundColor: '#fff'}} 
                                        text={'Добавить опцию'}/>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        onClick={onSave}
                                        load={load}
                                        text={'Сохранить'}
                                        styles={{width: '100%'}}
                                        before={<SaveIcon size={15} color={'#fff'}/>}
                                        />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={[0,20]}>
                                <Col span={24}>
                                    <div className="def-label" style={{marginBottom: 0}}>Отрицательные опции</div>
                                </Col>
                                {
                                    negative?.length > 0 ? (
                                        negative?.map((item, index) => (
                                            <Col span={24}>
                                                <OptItem 
                                                    {...item}
                                                    onSelect={selectItem}
                                                    index={index}
                                                    />
                                            </Col>
                                        ))
                                    ) : null
                                }
                                <Col span={24}>
                                    <Pl 
                                        onClick={() => {
                                            setSelected(null)
                                            setCreateType('0')
                                            openEditModal();
                                        }} 
                                        text={'Добавить опцию'} 
                                        style={{backgroundColor: '#fff'}}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </motion.div>   
    )
}

export default RatesetPage;