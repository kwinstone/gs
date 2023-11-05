import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Input from '../../../../components/Input/Input';


const mock = [
    {value: 'Stripe'},
    {value: 'PayPal'},
    {value: 'Visa'},
    {value: 'MasterCard'}
]

const IntegrPaySystem = () => {
    return (
        <div className="IntegrPaySystem part">
            <h3 className="def-label">Платежная система</h3>
            <div className="IntegrPaySystem__body">
                <DropCollapse value={mock[0].value} styles={{marginBottom: 10}} list={mock} afterIcon/>
                <Input placeholder={'API key'}/>
            </div>
        </div>
    )
}

export default IntegrPaySystem;