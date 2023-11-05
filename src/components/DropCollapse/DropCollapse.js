import './DropCollapse.scss';
import { useState, useRef, useEffect } from 'react';
import {BsChevronCompactDown} from 'react-icons/bs';
import Button from '../Button/Button';
import {BsTrash} from 'react-icons/bs';
import {LoadingOutlined} from '@ant-design/icons';

const DropCollapse = ({
    label,
    list,
    value,
    selectItem,
    afterIcon,
    beforeIcon,
    checkbox,
    styles,
    del,
    index,  
    onChange,
    checkboxValue,
    textAlign,
    delText,
    id ,
    shadow,
    justify,
    load
}) => {
    const [listActive, setListActive] = useState(false);
    const selectList = useRef(null);
    const [listHeight, setListHeight] = useState(0);


    const handleList = () => {
        setListActive(!listActive)
    }
    
    const handleSelectItem = (value, index, ID) => {
        
        selectItem(value, index, ID)
    }

    useEffect(() => {
        
        if(selectList.current) {
            if(listActive) {
                setListHeight(selectList.current.scrollHeight) 
            } else {
                setListHeight(0)
            }
        }
        
    }, [listActive, selectList])
    
    const closeList = () => {
        setListActive(false)
    }


    return (
        <>
            <div style={styles} className={"DropCollapse" + (listActive ? ' active ' : '') + (shadow ? ' shadow ' : '') + (justify ? ` ${justify}` : '')  + (load ? ' load ' : '')}>
                {
                    load ? (
                        <div className="DropCollapse__load">
                            <LoadingOutlined color='var(--violet)'/>
                        </div>
                    ) : null
                }
                <div onClick={handleList} className={"DropCollapse__head"}>
                    
                    {
                        label && !value ? (
                            <div className="DropCollapse__head_label">{label}</div>
                        ) : null
                    }
                    <div className="DropCollapse__head_value">
                        {beforeIcon ? (
                            <div className="DropCollapse__head_value_icon"><BsChevronCompactDown/></div>
                        ): null}
                        {
                            value ? (
                                <span style={{textAlign: textAlign}} className="DropCollapse__head_value_el">{value}</span>
                            ) : null
                        }
                        {afterIcon ? (
                            <div className="DropCollapse__head_value_icon"><BsChevronCompactDown/></div>
                        ) : null}
                    </div>
                    
                </div>
                <div style={{height:`${listHeight}px`}} ref={selectList} className="DropCollapse__list" >
                    <div className="DropCollapse__list_in">
                        {
                            list && list.length > 0 ? (
                                list.map((item, i) => {
                                    if(value == item.value) {
                                        return (
                                            <div onClick={() => {
                                                handleSelectItem(item.value, index, item.ID)
                                                closeList()
                                            }} className="DropCollapse__item active" key={i}>{item.value}</div>
                                        )
                                    } else {
                                        return (
                                            <div onClick={() => {
                                                handleSelectItem(item.value, index, item.ID)
                                                closeList()
                                            }} className="DropCollapse__item" key={i}>{item.value}</div>
                                        )
                                    }
                                    
                                })
                            ) : null
                        }
                    </div>
                    {
                        del ? (
                            <div className="DropCollapse__list_ex">
                                <Button onClick={() => del(index, id)} styles={{width: '100%'}} before={<BsTrash/>} variant={'danger'} text={'Удалить'}/>
                            </div>
                        ) : null
                    }
                   
                </div>
            </div>
           
        </>
        
    )
}

export default DropCollapse;