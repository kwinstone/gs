import './StatSale.scss';
import { Row,Col } from 'antd';

const StatSale = ({
    head,
    value,
    dif,
    compareDays
}) => {

    const switchDif = (val) => {
        if(val < 0) {
            return `-${val}`
        }
        if(val == 0) {
            return val
        }
        if(val > 0) {
            return `+${val}`
        }
        return val
    }

    return (
        <div className="StatSale">
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <div className="StatSale__head">{head}</div>
                </Col>
                <Col span={24}>
                    <div className="StatSale__value">
                        {value}
                    </div>
                </Col>
                <Col span={24}>
                    <div className="StatSale__info">
                        <span style={{color: dif <= 0 ? 'red' : '#30B42E'}}>{switchDif(dif)}</span> в сравнении с предыдущими {compareDays} днями
                    </div>
                </Col>
            </Row>
           
            
            
        </div>
    )
}

export default StatSale;