import './Text.scss';
import { useRef, useEffect, useState } from 'react';


const Text = ({
    onChange,
    name,
    value,
    id,
    placeholder,
    height,
    shadow,
    style
    
}) => {
    const inpRef = useRef()
    const [validFocus, setValidFocus] = useState(false)

    useEffect(() => {
        if(value) {
            setValidFocus(true)
        } 
    }, [value])

    const focusInp = () => {
        inpRef?.current?.focus()
    }

    return (
        <div className="TextWrap">
            {
                placeholder && (
                    <div onClick={focusInp} className={"TextWrap__label" + (validFocus ? ' valid ' : '')}>
                        {placeholder}
                    </div>
                )
            }
            <textarea 
            
            onChange={onChange}
            onBlur={() => {
                if(!value) {
                    setValidFocus(false)
                } else {
                    setValidFocus(true)
                }
            }}
            onFocus={(e) => {
                setValidFocus(true)
            }}
            style={{height: height, ...style}} 
            name={name} 
            value={value} 
            id={id} 
            ref={inpRef}
            className={"Text" + (shadow ? ' shadow ' : '')} 
            // placeholder={placeholder}
            
            >

            </textarea>
        </div>
        
    )
}

export default Text;