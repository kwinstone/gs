import './Mod.scss';
import Pl from '../../../../../components/Pl/Pl';
import AddMod from '../../../modals/addMod/AddMod';
import { useEffect, useState } from 'react';
import EditMod from '../../../modals/editMod/EditMod';
import { useSelector } from 'react-redux';
import catService from '../../../../../services/catService';
import { Row, Col } from 'antd';
import checkDomain from '../../../../../funcs/checkDomain';

const cs = new catService()


const Mod = ({plateId}) => {
    const {token} = useSelector(state => state)
    const [addMod, setAddMod] = useState(false);
    const [editMod, setEditMod] = useState(false);
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if(token) {
            cs.getMods(token, {ID: plateId}).then(res => {
                setList(res)
            })
        }
    }, [token])

    const openAddMod = () => {
        setAddMod(true)
    }
    const closeAddMod = () => {
        setAddMod(false)
    }

    const openEditMod = () => {
        setEditMod(true)
    }

    const closeEditMod = () => {
        setEditMod(false)
        setSelected(null)
    }

    const editToSelect = ({...item}) => {
        setSelected(item)
        openEditMod()
    }


    return (
        <div className="Mod">
            <AddMod update={setList} plateId={plateId} visible={addMod} close={closeAddMod}/>
            <EditMod update={setList} selected={selected} plateId={plateId} visible={editMod} close={closeEditMod}/>
            <h3 className="panel-label Mod__head">Модификаторы</h3>
            <div className="Mod__body ">
                <div className="Mod__body_action"></div>
                {
                    list && list.length > 0 ? (
                        list.map((item, index) => (
                            <div className="Mod__body_list panel" key={index} onClick={() => editToSelect({...item})}>
                                <div className="Mod__body_name">
                                    {item.Title}
                                </div>
                                {
                                    item.Modificators.map((i, ind) => (
                                        <div className="Mod__body_item" key={ind}>
                                            <Row gutter={[10,10]}>
                                                <Col span={12}>
                                                    <div className="Mod__body_item_name">{i.Name}</div>
                                                </Col>
                                                <Col span={8}>
                                                    <div className="Mod__body_item_value">{i.Price} {checkDomain('₽', '₸')}</div>
                                                </Col>
                                                {
                                                    i?.PictureUrl || i?.Image ? (
                                                        <Col span={4}>
                                                            <div className="Mod__body_item_img">
                                                                <div className="Mod__body_item_img_el">
                                                                    <img src={i?.PictureUrl || i?.Image} alt="" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ) : null
                                                }
                                            </Row>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        ))
                    ) : null
                    
                }
                
                {/* <div className="Mod__body_list panel">
                       
                    
                </div> */}
                
            </div>
            <div className="Mod__add">
                <Pl onClick={openAddMod} text={'Добавить группу модификаторов'} style={{backgroundColor: '#fff'}}/>
            </div>
        </div>
    )
}

export default Mod;