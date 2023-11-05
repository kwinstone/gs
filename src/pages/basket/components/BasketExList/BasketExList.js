import Input from '../../../../components/Input/Input';
import './BasketExList.scss';
import Pl from '../../../../components/Pl/Pl';
import BasketAddAddition from '../../modals/BasketAddAddition/BasketAddAddition';
import { useState } from 'react';
import { useEffect } from 'react';



const BasketExList = ({
    data,
    setData,
    selectList
}) => {
    const [addAddition, setAddAddition] = useState(false);
    const [selected, setSelected] = useState(null);

    const [localList, setLocalList] = useState([])

    const openAddAddition = () => {
        setAddAddition(true)
    }
    const closeAddAddition = () => {
        setSelected(null)
        setAddAddition(false)
    }    
    
    useEffect(() => {
        setLocalList(data)
    },[data])

    return (
        <div className="BasketExList">
            <BasketAddAddition
                selectList={selectList}
                list={data?.map((i,index) => ({...i, index}))}
                setList={setData}
                data={selected} 
                visible={addAddition} 
                close={closeAddAddition}/>
            <h3 className="BasketExList__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Список дополнений
            </h3>
            <div className="BasketExList__list">
                {
                    localList?.map((item, index) => (
                        <Input 
                            key={item.ID}
                            onClick={() => {
                                setSelected({...item, index})
                                openAddAddition()
                            }} 
                            maskType={String}
                            style={{marginBottom: 10}} 
                            value={item.Title} 
                            readOnly/>
                    ))
                }
            </div>
            <div className="BasketExList__action">
                <Pl onClick={openAddAddition} style={{backgroundColor: '#fff'}} text={'Добавить дополнение'}/>
            </div>
        </div>
    )
}

export default BasketExList;