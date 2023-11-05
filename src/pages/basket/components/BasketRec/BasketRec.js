import './BasketRec.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddRec from '../../modals/BasketAddRec/BasketAddRec';
import { useEffect } from 'react';

const BasketRec = ({
    data, 
    setData,
    selectList
}) => {
    const [addRec, setAddRec] = useState(false)
    const [localList, setLocalList] = useState([])
    const [selected, setSelected] = useState(null)



    useEffect(() => {
        setLocalList(data)
        
    }, [data])


    const openAddRec = () => {
        setAddRec(true)
    }
    const closeAddRec = () => {
        setSelected(null)
        setAddRec(false)
    }
    
    



    return (
        <div className="BasketRec">
            <BasketAddRec 
                selectList={selectList}
                data={selected}
                list={data}
                setList={setData}
                visible={addRec} 
                close={closeAddRec}/>
            
            <h3 className="BasketRec__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Общие рекомендации
            </h3>
            <div className="BasketRec__list">
                {
                    localList?.map((item, index) => (
                        <Input
                            onClick={() => {
                                setSelected({...item})
                                openAddRec()
                            }}
                            style={{marginBottom: 10}} 
                            value={item.Name}
                            maskType={String} 
                            readOnly/>
                    ))
                }
            </div>
            <div className="BasketRec__action">
                <Pl onClick={openAddRec} style={{backgroundColor: '#fff'}} text={'Добавить блюдо'}/>
            </div>
        </div>  
    )
}

export default BasketRec;