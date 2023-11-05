import './ExMass.scss';
import Pl from '../../../../../components/Pl/Pl';
import AddMassModal from '../../../modals/addMassModal/AddMassModal';
import { useEffect, useState } from 'react';
import EditMass from '../../../modals/editMass/EditMass';
import { useSelector } from 'react-redux';

import catService from '../../../../../services/catService';
import checkDomain from '../../../../../funcs/checkDomain';

const cs = new catService()


const ExMass = ({plateId}) => {
    const {token} = useSelector(state => state)
    const [editMass, setEditMass] = useState(false);
    const [addMass, setAddMass] = useState(false);
    const [selected, setSelected] = useState(null)
    const [localList, setLocalList] = useState()

    useEffect(() => {
        if(token) {
            cs.getPriceMass(token, {ItemID: plateId}).then(res => {
                setLocalList(res)
            })
        }
    }, [token])

    const openAddMass = () => {
        setAddMass(true)
    }
    const closeAddMass = () => {
        setAddMass(false)
    }

    const openEditMass = ({...item}) => {
        setSelected(item)
        setEditMass(true)
    }
    const closeEditMass = () => {
        setEditMass(false)
        setSelected(null)
    }


    return (
        <div className="ExMass">
            <AddMassModal plateId={plateId} update={setLocalList} visible={addMass} close={closeAddMass}/>
            <EditMass plateId={plateId} update={setLocalList} selected={selected} visible={editMass} close={closeEditMass}/>
            <h3 className="ExMass__head panel-label">Список дополнительных масс</h3>
            <div className="ExMass__body">
                <div className="ExMass__body_list">
                    {
                        localList && localList.length > 0 ? (
                            localList.map((item, index) => {
                                return (
                                    <div onClick={() => openEditMass({...item})} className="ExMass__body_item panel" key={index}>
                                        <div  className="ExMass__body_item_mass ExMass__body_item_val">Масса: {item.Mass}</div>
                                        <div className="ExMass__body_item_prices">
                                            <div className="ExMass__body_item_prices_main ExMass__body_item_val">Цена: {item.Price} {checkDomain('₽', '₸')}</div>
                                            <div className="ExMass__body_item_prices_discount ExMass__body_item_val">Старая цена: {item.SalePrice} {checkDomain('₽', '₸')}</div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    
                    
                </div>
                <div className="ExMass__add">
                    <Pl onClick={openAddMass} text={'Добавить массу'} style={{backgroundColor: '#fff'}}/>
                </div>
            </div>
        </div>
    )
}

export default ExMass;