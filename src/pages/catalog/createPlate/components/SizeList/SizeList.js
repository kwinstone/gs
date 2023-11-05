import './SizeList.scss';
import '../DefList/DefList.scss';
import catService from '../../../../../services/catService';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pl from '../../../../../components/Pl/Pl';
import AddSize from '../../../modals/addSize/AddSize';

const cs = new catService()

const SizeList = ({
    head,
    addText,
    plateId
}) => {
    const {token} = useSelector(state => state)
    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(null)


    useEffect(() => {
        if(token) {
            cs.getSizes(token, {ItemID: plateId}).then(res => {
                setList(res)
                console.log(res)
            })
        }
        
    }, [token])


    const onEdit = ({...item}) => {
        setSelected(item)
        setModal(true)
    }


    useEffect(() => {
        console.log(list)
    }, [list])


    return (
        <div className="DefList">
            <AddSize visible={modal} update={setList} data={selected} close={() => {
                setSelected(null)
                setModal(false)
            }} plateId={plateId}/>
            <h3 className="DefList__head panel-label">{head}</h3>
            <div className="DefList__body">
                {
                    list && list.length > 0 ? (
                        list.map((item, index) => (
                            <div onClick={() => onEdit(item)} className="DefList__body_item panel" key={index}>
                                {item.Size}
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

export default SizeList;