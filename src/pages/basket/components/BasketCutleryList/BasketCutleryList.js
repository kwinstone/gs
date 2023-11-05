import './BasketCutleryList.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddCutlery from '../../modals/BasketAddCutlery/BasketAddCutlery';
import { useEffect } from 'react';

const BasketCutleryList = ({
    data,
    setData,
    selectList
}) => {
    const [addCutlery, setAddCutlery] = useState(false);
    const [localList, setLocalList] = useState([])

    const [selected, setSelected] = useState(null)


    useEffect(() => {
        setLocalList(data)
    }, [data])

    const openAddCutlery = () => {
        setAddCutlery(true)
    }
    const closeAddCutlery = () => {
        setSelected(null)
        setAddCutlery(false)
    }
    
    
    return (
        <div className="BasketCutleryList">
            <BasketAddCutlery 
                selectList={selectList}
                list={data?.map((i,index) => ({...i, index}))}
                setList={setData}
                data={selected}
                visible={addCutlery} 
                close={closeAddCutlery}/>
            <h3 className="BasketCutleryList__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Список столовых приборов
            </h3>
            <div className="BasketCutleryList__list">
                {
                    localList?.map((item, index) => (
                        <Input 
                            key={index}
                            onClick={() => {
                                setSelected({...item, index})
                                openAddCutlery();
                            }} 
                            style={{marginBottom: 10}} 
                            value={item.Title} 
                            maskType={String}
                            readOnly/>
                    ))
                }
            </div>
            <div className="BasketCutleryList__action">
                <Pl onClick={openAddCutlery} style={{backgroundColor: '#fff'}} text={'Добавить столовый прибор'}/>
            </div>
        </div>
    )
}

export default BasketCutleryList;