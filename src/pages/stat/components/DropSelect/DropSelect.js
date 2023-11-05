import './DropSelect.scss';
import { useState, useEffect } from 'react';
import {BsChevronCompactDown} from 'react-icons/bs';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useRef } from 'react';


const DropSelect = ({
    setOrganisations,
    list,
    defaultVal,
    organisations,
    type,
    label
}) => {
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const bodyRef = useRef();
    const dropEl = useRef();
    const [all, setAll] = useState(false)


    const [bodyPos, setBodyPos] = useState({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }) 

   

    useEffect(() => {
        setValue(defaultVal)
    }, [defaultVal])

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
      
        return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
      }

    const setBodyStyle = () => {
        if(dropEl?.current) {
            const b = getCoords(dropEl?.current)
            setBodyPos({
                ...b,
                top: b.top + 46,
            })
        }
    }

    useEffect(() => {
        setBodyStyle()
    }, [dropEl])

    useEffect(() => {
        window.addEventListener('resize', setBodyStyle)
        document.body.addEventListener('scroll', setBodyStyle)
        return () => {
            window.removeEventListener('resize', setBodyStyle)
            document.body.removeEventListener('scroll', setBodyStyle)
        }
    }, [])

    
    const selectItem = (value) => {
        const find = organisations?.split(',').find(i => i == value);
        
        if(find) {
            const r = organisations.split(',');
            const rm = r.splice(r.findIndex(i => i == value), 1)
            // setSelects([...r])
            setOrganisations(r.join(','))
        } else {
            if(!organisations) {
                setOrganisations(value)
            } else {
                setOrganisations(state => `${state},${value}`)
            }
            
        }
    }


    useEffect(() => {
        if(organisations) {
            setAll(false)
            setValue(`${organisations?.split(',').length} ${label}`)
        } else {
            setAll(true)
            setValue(defaultVal)
        }
       
    }, [organisations, defaultVal])


    
   

    const closeDrop = (e) => {
        if(e.target.classList.contains('DropSelect__body_wrapper')) {
            setIsOpen(false)
        }
    }

    return (
        
        <div className={"DropSelect" + (isOpen ? ' is-open ' : '')} ref={dropEl}>
            <div className="DropSelect__head" onClick={() => setIsOpen(!isOpen)}>
                <div className="DropSelect__head_icon">
                    <BsChevronCompactDown/>
                </div>
                <div className="DropSelect__head_value">
                    {value}
                </div>
            </div>
            <div className="DropSelect__body_wrapper" onClick={e => closeDrop(e)}>
                <div className="DropSelect__body gs-scroll" ref={bodyRef}  style={{width:dropEl?.current?.scrollWidth ,height: isOpen ? 300 : 0, top: bodyPos?.top, right: bodyPos?.right, bottom: bodyPos?.bottom, left: bodyPos?.left}}>
                    <div className="DropSelect__body_item">
                        <Checkbox
                            shadow={true}
                            checked={all}
                            onChange={e => {
                                if(e.target.checked) {
                                    setAll(true)
                                    setOrganisations('')
                                } else {
                                    if(organisations) {
                                        setAll(false)
                                    }
                                }
                            }}
                            // onChange={e => {
                            //     if(e.target.checked) {
                            //         setAll(true)
                            //     } else {
                            //         setAll(false)
                            //     }
                            // }}
                            text={defaultVal}
                            id={`${type}0`}
                            />
                    </div>
                    {
                        list?.map((item, index) => (
                            <div className="DropSelect__body_item" key={item.ID}>
                                <Checkbox
                                    onChange={() => selectItem(item.ID)}
                                    shadow={true}
                                    checked={organisations?.split(',').find(i => i == item.ID)}
                                    id={`${type}${item.ID}`}
                                    text={item?.Name}
                                    />
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}

export default DropSelect;