import './ClientsInfo.scss';
import Input from '../../../../components/Input/Input';
import Checkbox from '../../../../components/Checkbox/Checkbox';

const ClientsInfo = ({
    value,
    setValue,
    selectAll,
    selected
}) => {
    return (
        <div className="ClientsInfo">
            <div className="ClientsInfo__item ClientsInfo__item-input"> 
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'Поиск'}
                    maskType={String}
                    />
            </div>  
            <div className="ClientsInfo__item">
                <Checkbox
                    id={'select_all'}
                    checked={selected}
                    onChange={selectAll}
                    text={'Выбрать всех'}
                    />
            </div>
        </div>
    )
}

export default ClientsInfo;