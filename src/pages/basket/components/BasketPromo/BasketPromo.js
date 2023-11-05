import './BasketPromo.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddPromo from '../../modals/BasketAddPromo/BasketAddPromo';
import { useEffect } from 'react';

const BasketPromo = ({
    data,
    setData,
    selectList
}) => {
    const [addPromo, setAddPromo] = useState(false);
    const [selected, setSelected] = useState(null)
    const [localList, setLocalList] = useState([])


    useEffect(() => {
        setLocalList(data)
    }, [data])
    
    const openAddPromo = () => {
        setAddPromo(true)
    }
    const closeAddPromo = () => {
        setAddPromo(false)
    }


    return (
        <div className="BasketPromo">
            <BasketAddPromo 
                selectList={selectList}
                data={selected}
                list={data}
                setList={setData}
                visible={addPromo} 
                close={closeAddPromo}/>

            <h3 className="BasketPromo__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
                Промокоды
            </h3>
            <div className="BasketPromo__list">
                {
                    localList?.map((item, index) => (
                        <Input 
                            key={index}
                            maskType={String}
                            onClick={() => {
                                setSelected({...item, index})
                                openAddPromo()
                                
                            }} 
                            style={{marginBottom: 10}} 
                            value={item.Promocode} 
                            readOnly/>
                    ))
                }
            </div>
            <div className="BasketPromo__action">
                <Pl onClick={openAddPromo} style={{backgroundColor: '#fff'}} text={'Добавить промокод'}/>
            </div>
        </div>
    )
}

export default BasketPromo;