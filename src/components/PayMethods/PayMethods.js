import './PayMethods.scss';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Button from '../Button/Button';
import {BsTrash} from 'react-icons/bs';

const PayMethods = ({
    list,
    selected,
    onChange,
    onCashbackChange,
    onDelete,
    openEditModal,
    onSelect
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [listHeight, setListHeight] = useState(0)
    const listRef = useRef()

    

    useEffect(() => {
        if(listRef?.current && isOpen) {
            setListHeight(listRef.current.scrollHeight)
        } 

    }, [listRef, isOpen, list])


    const toggleList = () => {
        setIsOpen(!isOpen)
    }

    const closeList = () => {
        setIsOpen(false)
    }
    

    const handleSelect = () => {
        onSelect(selected)
        openEditModal()
    }

    return (
        <div className={"PayMethods" + (isOpen ? ' active ' : '')} onClick={handleSelect}>
            <div className="PayMethods__in">
                <div className="PayMethods__main">
                    <div className="PayMethods__main_label" >
                        {/* <div className="PayMethods__main_label_icon">
                            <BsChevronCompactDown/>
                        </div> */}
                        <div className="PayMethods__main_label_selected">
                            {selected?.value}
                        </div>
                    </div>
                    {/* {
                        selected?.PaymentType == '0' ? (
                            <div className="PayMethods__main_checkbox">
                                <Checkbox 
                                    checked={selected.IsNeedToChangeCash == '1'}
                                    onChange={(e) => onCashbackChange(e, selected)}
                                    after={true}  
                                    shadow 
                                    text={'Спросить про сдачу'} 
                                    id={'askCash'}/>
                            </div>
                        ) : null
                    }
                     */}
                </div>
                {/* <div className="PayMethods__list" ref={listRef} style={{height: isOpen ? listHeight : 0}}>
                    {
                        list && list.length > 0 ? (
                            list.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={"PayMethods__item" + (selected?.value == item.value ? ' active ' : '')}
                                    onClick={() => {
                                        onChange(item, selected)
                                        closeList()
                                    }}
                                    >
                                    {item.value}
                                </div>
                            ))
                        ) : null
                    }
                </div> */}
            </div>
            
            {
                isOpen ? (
                    <div className="PayMethods__action">
                        <Button
                            before={<BsTrash/>}
                            onClick={() => onDelete(selected)}
                            text={'Удалить способ оплаты'}
                            variant={'danger'}
                            />
                    </div>
                ) : null
            }
        </div>
    )
}

export default PayMethods;