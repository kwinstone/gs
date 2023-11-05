import './OrderExList.scss';
import Input from '../../../../components/Input/Input';

const OrderExList = ({name, list}) => {
    
    return (
        <div className="OrderExList">
            <div className="OrderExList__name">{name}</div>
            <div className="OrderExList__list">
                {
                    list && list.length > 0 ? (
                        list.map((item, index) => (
                            <div className="OrderExList__list_item" key={index}>
                                <Input maskType={String} shadow readOnly value={`${item.Count} x ${item.Name}`}/>
                            </div>
                        ))
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default OrderExList;