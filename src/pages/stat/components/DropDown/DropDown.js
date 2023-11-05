import './DropDown.scss';
import { useEffect, useState, useRef } from 'react';
import {BsChevronCompactDown} from 'react-icons/bs';



const DropDown = ({
    list,
    value,
    onChange,
    shadow,
    closeCalendar
}) => {
    const bodyRef = useRef()
    const dropEl = useRef();
    const [isOpen, setIsOpen] = useState(false)
    const [bodyHeight, setBodyHeight] = useState(0)
    const [bodyPos, setBodyPos] = useState({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    })

    useEffect(() => {
        if(bodyRef?.current) {
            if(isOpen) {
                setBodyHeight(bodyRef?.current.scrollHeight)
            } else {
                setBodyHeight(0)
            }
        }
    }, [bodyRef, isOpen])
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

    const openDrop = () => {
        setIsOpen(!isOpen)
    }

   

    return (
        <div ref={dropEl} className={"DropDown" + (isOpen ? ' is-open ' : '') + (shadow ? ' shadow ' : '')}>
            <div className="DropDown__head" onClick={openDrop}>
                <div className="DropDown__head_icon">
                    <BsChevronCompactDown/>
                </div>
                <div className="DropDown__head_value">{value}</div>
            </div>
            <div className="DropDown__body" ref={bodyRef} style={{width: dropEl?.current?.scrollWidth, height: bodyHeight, top: bodyPos?.top, right: bodyPos?.right, bottom: bodyPos?.bottom, left: bodyPos?.left}}>
                {
                    list?.map((item, index) => (
                        <div onClick={() => {
                            onChange(item.value)
                            setIsOpen(false)
                        }} className={"DropDown__body_item" + (item.label == value ? ' selected ' : '')} key={item?.value}>
                            {item?.label}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DropDown;