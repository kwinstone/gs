import './OptItem.scss';

const switchDelType = (type) => {
    switch(type) {
        case '0':
            return 'Доставка'
        case '1':
            return 'Самовывоз'
        case '2':
            return 'Доставка и самовывоз'
        case '3':
            return 'Не указано';
        default: 
            return 'Не указано'
    }
}

const OptItem = ({
    DeliveryType,
    ID,
    IsPositive,
    OptionText,
    index,
    onSelect,
}) => {
    return (
        <div className="OptItem" onClick={() => onSelect({
            DeliveryType,
            ID,
            IsPositive,
            OptionText,
            index
        })}>
            <div className="OptItem__name">{OptionText}</div>
            <div className="OptItem__value">
                {switchDelType(DeliveryType)}
            </div>
        </div>
    )
}

export default OptItem;