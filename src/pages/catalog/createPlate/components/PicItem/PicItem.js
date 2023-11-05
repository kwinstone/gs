import './PicItem.scss';
import Button from '../../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import {AiOutlineEye} from 'react-icons/ai';
import {AiOutlineEyeInvisible} from 'react-icons/ai';


const PicItem = ({image, remove, style, isHidden, onToggleHide}) => {




    return (
        <div className="PicItem" style={style}>
            <div className={"PicItem__img" + (isHidden ? ' hidden ' : '')}>
                <img src={image} alt="" />
            </div>
            <button 
                onClick={onToggleHide}
                className='PicItem__hide'>
                {
                    isHidden ? (
                        <AiOutlineEyeInvisible/>
                    ) : (
                        <AiOutlineEye/>
                    )
                }
                
            </button>
            <div className="PicItem__action">
                <Button 
                    onClick={remove} 
                    styles={{width: '100%'}} 
                    variant={'danger'} 
                    before={<BsTrash size={20}/>} 
                    text={'Удалить'} 
                    justify={'center'}/>
            </div>
        </div>
    )
}

export default PicItem;