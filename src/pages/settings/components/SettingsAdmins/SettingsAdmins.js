import { useEffect } from 'react';
import { useState } from 'react';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import SettingsAddUser from '../../modals/SettingsAddUser/SettingsAddUser';
import { Row, Col } from 'antd';

const SettingsAdmins = ({
    data,
    setData
}) => {
    const [addUser, setAddUser] = useState(false)
    const [localList, setLocalList] = useState([])
    const [selected, setSelected] = useState(null)


    const openAddUser = () => setAddUser(true)
    const closeAddUser = () => {
        setSelected(null)
        setAddUser(false)
    }

    useEffect(() => {
        setLocalList(data)

    }, [data])


    return (
        <div className="SettingsAdmins part">
            <SettingsAddUser
                visible={addUser}
                close={closeAddUser}
                list={data}
                setList={setData}
                data={selected}
                />
            <h3 className="def-label">Пользователи админ-панели</h3>
            <div className="SettingsAdmins__body">
                <Row gutter={[15,15]}>
                    {
                        localList?.map((item, index) => (
                            <Col span={24}>
                                <Input 
                                    maskType={String}
                                    onClick={() => {
                                        setSelected({...item, index})
                                        openAddUser()
                                    }}
                                    readOnly 
                                    value={item.Name} 
                                    />
                            </Col>
                        ))
                        
                    }
                    <Col span={24}>
                        <Pl 
                            onClick={() => {
                                setSelected(null)
                                openAddUser()
                            }}
                            text={'Добавить пользователя'} 
                            style={{backgroundColor: '#fff'}}/>
                    </Col>

                </Row>
                
            </div>
        </div>
    )
}

export default SettingsAdmins;