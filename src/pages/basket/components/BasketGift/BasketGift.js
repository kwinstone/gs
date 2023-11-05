import './BasketGift.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddGift from '../../modals/BasketAddGift/BasketAddGift';
import { useEffect } from 'react';

const BasketGift = ({
    data,
    setData,
    selectList
}) => {
    const [addGift, setAddGift] = useState(false);
    const [localList, setLocalList] = useState([])
    const [selected, setSelected] = useState(null)


    useEffect(() => {
        setLocalList(data)
    }, [data])



    const openAddGift = () => {
        setAddGift(true)
    }
    const closeAddGift = () => {
        setSelected(null)
        setAddGift(false)
    }
    return (
        <div className="BasketGift">

            <BasketAddGift 
                selectList={selectList}
                list={data}
                setList={setData}
                data={selected}
                visible={addGift} 
                close={closeAddGift}/>


            <h3 className="BasketRec__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Подарки
            </h3>
            <div className="BasketRec__list">
                {
                    localList?.map((item, index) => (
                        <Input
                            onClick={() => {
                                setSelected({...item, index})
                                openAddGift()
                            }}
                            maskType={String} 
                            style={{marginBottom: 10}} 
                            value={item.GiftName} 
                            readOnly/>
                    ))
                }
            </div>
            <div className="BasketRec__action">
                <Pl onClick={openAddGift} style={{backgroundColor: '#fff'}} text={'Добавить подарок'}/>
            </div>
        </div>
    )
}

export default BasketGift;