import './Input.scss';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { IMaskInput } from 'react-imask';


const Input = ({
    style,
    onChange,
    onBlur,
    value,
    disabled,
    error,
    placeholder,
    type,
    readOnly,
    shadow,
    onClick,
    name,
    showErrorText,
    maskType = Number,
    unmask = true,
    scale,
    onFocus
}) => {
    const [validFocus, setValidFocus] = useState(false)
    const inpRef = useRef()
    const handleChange = (e) => {
        onChange(e)
    }
    const [acValue, setAcValue] = useState('')

    
    useEffect(() => {
        setAcValue(value)
        if(value || acValue) {
            setValidFocus(true)
        } 
        // else {
        //     setValidFocus(false) 
        // }
    }, [value])

    const focusInp = () => {
        inpRef.current.focus()
    }


    

    

    return (
        <div onClick={onClick} className={"Input" + (error ? ' error ' : '') + (shadow ? ' shadow ' : '')} style={style}>
            {
                placeholder ? (
                    <div onClick={focusInp} className={"Input__label" + (validFocus ? ' valid ' : '')}>{placeholder}</div>
                ) : null
            }

            <IMaskInput
                mask={maskType}
                // radix={'.'}
                scale={scale}
                radix={'.'}
                inputRef={inpRef}
                disabled={disabled}
                type={type} 
                value={acValue} 
                mapToRadix={['.', ',']}
                name={name}
                onFocus={(e) => {
                    setValidFocus(true)
                    if(onFocus) {
                        onFocus()
                    }
                }}
                onBlur={(e) => {
                    if(!acValue) {
                        setValidFocus(false)
                    } else {
                        setValidFocus(true)
                    }
                    if(onBlur) {
                        onBlur();
                    }
                }}
                onChange={(e) => handleChange(e)} 
                onAccept={e => setAcValue(e)}
                // onBlur={onBlur} 
                readOnly={readOnly}
                className="Input__el"
                unmask={unmask}
                />
            
            {/* <input 
                ref={inpRef}
                disabled={disabled}
                type={type} 
                value={value} 
                name={name}
                onChange={(e) => handleChange(e)} 
                onBlur={onBlur} 
                readOnly={readOnly}
                className="Input__el" /> */}
            {
                error && showErrorText ? (
                    <div  
                        className="Input__error">
                        {error}
                    </div>
                ) : null
            }
            
        </div>
    )
}

export default Input;