import './SelectColor.scss';
import { useState, useEffect } from 'react';
import Input from '../../../../../components/Input/Input';

const SelectColor = ({setColor, color}) => {
    const [error, setError] = useState(false)
    const [localInp, setLocalInp] = useState(color)

    useEffect(() => {
        setLocalInp(color)
    }, [color])

    const onChange = (e) => {
        setLocalInp(e.target.value)
        const rg = /^#[0-9A-F]{6}$/i
        if(rg.test(e.target.value)) {
            setColor(e.target.value)
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div className="SelectColor">
            <div className="SelectColor__input">
                <input id='selectColor' type="color" value={color?.toUpperCase()} onChange={e => {
                    setColor(e.target.value)
                    setLocalInp(e.target.value)
                }}/>
                <label htmlFor="selectColor" className="SelectColor__label" style={{backgroundColor: color}}></label>
            </div>
            <div className="SelectColor__value" style={{color: color}}>
                <Input
                    maskType={String}
                    shadow={true}
                    value={localInp?.toUpperCase()}
                    onChange={e => onChange(e.target.value)}
                    error={error}
                    />
            </div>
        </div>
    )
}

export default SelectColor;