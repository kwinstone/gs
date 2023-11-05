import Input from "../../../../components/Input/Input";

const IntegrSms = () => {
    return (
        <div className="IntegrSms part">
            <h3 className="def-label">SMS.ru API key</h3>
            <div className="IntegrSms__body">
                <Input placeholder={'API key'}/>
            </div>
        </div>
    )
}
export default IntegrSms;