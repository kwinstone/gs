import './GridToggle.scss';
import {BsGrid3X2Gap, BsGrid3X2} from 'react-icons/bs';
import {Tooltip} from 'antd';



const GridToggle = ({
    selectBig,
    selectSmall
}) => {
    return (
        <div className="GridToggle">
            <div className="GridToggle__in">
                <Tooltip
                    placement='bottom'
                    title='Маленькие карточки'
                    >
                    <button onClick={selectSmall} className="GridToggle__item">
                        <BsGrid3X2Gap/>
                    </button>
                </Tooltip>
                <Tooltip
                    placement='bottom'
                    title='Большие карточки'
                    >
                    <button onClick={selectBig} className="GridToggle__item">
                        <BsGrid3X2/>
                    </button>
                </Tooltip>
                
            </div>
        </div>
    )
}

export default GridToggle;