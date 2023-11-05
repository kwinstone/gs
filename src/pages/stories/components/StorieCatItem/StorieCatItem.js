import './StorieCatItem.scss';
import img from '../../../../assets/img/org.png';
import pl from '../../../../assets/img/pl-plate.png';
import LinesEllipsis from 'react-lines-ellipsis';

const StorieCatItem = (props) => {
    const {Name, ThumbnailPicture, style, select} = props;

    return (
        <div onClick={select ? () => select(props) : null}  className="StorieCatItem" style={style}>
            <div className="StorieCatItem__img">
                <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt={Name} />
            </div>
            <div className="StorieCatItem__name">
                <LinesEllipsis
                    text={Name}
                    maxLine={3}
                    basedOn={'words'}    
                    />
                
                
            </div>
        </div>
    )
}

export default StorieCatItem;