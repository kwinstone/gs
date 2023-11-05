import './BasketOnlinePay.scss';
import Input from '../../../../components/Input/Input';

const BasketOnlinePay = ({
    value,
    setValue
}) => {
    return (
        <div className="BasketOnlinePay">
            <h3 className="BasketRec__head" style={{fontWeight: 600, color: '#989898', marginBottom: 20, fontSize: '16px'}}>
            Оплата только онлайн при сумме заказа более
            </h3>
            <Input 
                maskType={String}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={'Сумма заказа'}/>
        </div>
    )
}

export default BasketOnlinePay;