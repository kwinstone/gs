import './DefList.scss';
import Pl from '../../../../../components/Pl/Pl';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../../services/catService';
import AddAlrgn from '../../../modals/addAlrgn/AddAlrgn';

const cs = new catService()


const DefList = ({head, addText, openModal, editModal,  plateId}) => {
    const {token} = useSelector(state => state)
    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if(token) {
            cs.getAllergens(token, {ItemID: plateId}).then(res => {
                console.log(res)
                setList(res)
            })
        }
        
    }, [token])

    const onEdit = ({...item}) => {
        setSelected(item)
        setModal(true)
    }


 
    return (
        <div className="DefList">
            <AddAlrgn visible={modal} update={setList} data={selected} close={() => {
                setSelected(null)
                setModal(false)
            }} plateId={plateId}/>
            <h3 className="DefList__head panel-label">{head}</h3>
            <div className="DefList__body">
                {
                    list && list.length > 0 ? (
                        list.map((item, index) => (
                            <div onClick={() => onEdit({...item})} className="DefList__body_item panel" key={index}>
                                {item.Name}
                            </div>
                        ))
                    ) : null
                }
            </div>
            <div className="DefList__add">
                <Pl onClick={() => {
                    setSelected(null)
                    setModal(true)
                }} style={{backgroundColor: '#fff'}} text={addText}/>
            </div>
        </div>
    )
}

export default DefList;