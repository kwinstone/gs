import './AllSettingsPage.scss';
import {motion} from 'framer-motion'
import pageEnterAnimProps from '../../funcs/pageEnterAnimProps';
import { Row, Col } from 'antd';
import Input from '../../components/Input/Input';
import Pl from '../../components/Pl/Pl';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import setService from '../../services/setService';


const ss = new setService();


const AllSettingsPage = () => {
    const {token} = useSelector(state => state)


    useEffect(() => {
        if(token) {
            ss.getMainSettings(token).then(res => {
              
            })
            ss.getPanelSettings(token).then(res => {
              
            })
        }
    }, [token])

    return (
        <motion.div 
            className="page AllSettingsPage"
            {...pageEnterAnimProps}
            >
            <div className="pageBody">
                <div className="pageBody-content AllSettingsPage__body">
                    <Row gutter={[15,15]}>
                        <Col span={12}>
                            <Row gutter={[15,15]}>
                                <Col span={24}>
                                    <Row gutter={[15,15]}>
                                        <Col span={24}>
                                        <div className="def-label">Пользователи админ-панели</div>
                                        </Col>
                                        {/* list */}
                                        <Col span={24}>
                                            <Input
                                                maskType={String}
                                                placeholder={'Администратор'}

                                                />
                                        </Col>
                                        <Col span={24}>
                                            <Input
                                                maskType={String}
                                                placeholder={'Администратор'}
                                                
                                                />
                                        </Col>
                                        {/* list */}
                                        <Col span={24}>
                                            <Pl
                                                style={{backgroundColor: '#fff'}}
                                                text={'Добавить пользователя'}
                                                />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[15,15]}>
                                        <Col span={24}>
                                            <div className="def-label">Контакты</div>
                                        </Col>
                                        {/* list */}
                                        <Col span={24}>
                                            <Input
                                                maskType={String}
                                                placeholder={'Контакт'}
                                                />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </div>
            </div>
        </motion.div> 
    )
}

export default AllSettingsPage;