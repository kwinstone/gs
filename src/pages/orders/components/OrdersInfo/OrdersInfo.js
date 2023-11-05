import './OrdersInfo.scss';
import Input from '../../../../components/Input/Input';
import InputSelect from '../../../../components/InputSelect/InputSelect';
import checkDomain from '../../../../funcs/checkDomain';

const list = [
    {ID: 'id', value: 'ID'},
    {ID: 'name', value: 'Имя'},
    {ID: 'cost', value: 'Цена'},
    {ID: 'phone', value: 'Телефон'},
]


const OrdersInfo = ({
    total,
    price,
    onSearch,
    value,
    setValue,
    Field,
    setField
}) => {
    
   

    

    return (
        <div className="OrdersInfo">
            <div className="OrdersInfo__item OrdersInfo__item-input">
                <Input
                    maskType={String}
                    placeholder={'Поиск'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
            </div>
            <div className='OrdersInfo__item'>
                <InputSelect
                    list={list}
                    // defaultValue={fVal}
                    showSearch={false}
                    value={Field}
                    onSelect={setField}
                    />
            </div>
            <div className="OrdersInfo__item">
            Всего заказов: {total}
            </div>
            <div className="OrdersInfo__item">
            На сумму: {price} {checkDomain('₽', '₸')}
            </div>
        </div>
    )
}

export default OrdersInfo;