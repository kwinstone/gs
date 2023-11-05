import './Pl.scss';
import { BsTrash } from 'react-icons/bs';

const Pl = ({style, text, onClick, prev, shadow, onDelete}) => {
    return (
        <div className={'Pl-layer'} style={style}>
            <div onClick={onClick} className={"Pl" + (shadow ? ' shadow ' : '')}>
                {prev ? prev : text}
            </div>
        {
                onDelete && (
                    <button className="Pl__delete" onClick={onDelete}>
                        <BsTrash/>
                    </button>
                )
            }
        </div>

        
    )
}

export default Pl;