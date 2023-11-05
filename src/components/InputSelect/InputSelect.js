import './InputSelect.scss';
import { Select } from 'antd';
import { useState } from 'react';


const InputSelect = ({
    list,
    onSelect,
    shadow = true,
    defaultValue,
    placeholder,
    value,
    showSearch = true
}) => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className={'InputSelect' + (shadow ? ' shadow ' : '')}>
            <Select
                value={value}
                showSearch={showSearch}
                placeholder={placeholder ? placeholder : "Выберите блюдо"}
                filterOption={(input, option) => 
                    (option?.Name ?? '').toLowerCase().includes(input.toLowerCase())
                }
                searchValue={searchValue}
                onSearch={e => setSearchValue(e)}
                onChange={(e, v) => {
                    onSelect(list?.find(i => i.ID == v?.ID))
                }}
                popupClassName='InputSelect__list'
                className='InputSelect__el'
                options={list}
                />
        </div>
    )
}

export default InputSelect