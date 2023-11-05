import './PlUpload.scss';
import '../Pl/Pl.scss';

const PlUpload = ({
    style, 
    text, 
    onClick, 
    prev, 
    shadow, 
    onChange, 
    id, 
    accept, 
    multiple,
    disabled,
    value
}) => {
    return (
        <div  className={"PlUpload Pl" + (shadow ? ' shadow ' : '') + (prev ? ' nopadding ' : '') + (disabled ? ' disabled ' : '')} style={style}>
            {
                prev ? (
                    <img src={prev} alt="" />
                ) : (
                    text
                )
            }
            <input value={value} multiple={multiple} onChange={onChange} type="file" id={id} accept={accept}/>
            <label htmlFor={id}></label>
        </div>
    )
}

export default PlUpload;