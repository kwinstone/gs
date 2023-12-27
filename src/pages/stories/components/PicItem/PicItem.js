import './PicItem.scss';
import img from '../../../../assets/img/org.png';
import Button from '../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import urlToFile from '../../../../funcs/urlToFile';



const PicItem = ({
    style,
    BundleID,
    Disabled,
    ID,
    ItemOrder,
    Picture,
    PictureThumbnail,
    onDelete,
    index,
    isVideo
}) => {
    const [videoThumb, setVideoThumb] = useState(null)

    useEffect(() => {
        if (isVideo && PictureThumbnail) {

        }
    }, [isVideo, PictureThumbnail])

    return (
        <div className="PicItem" style={style}>
            <div className="PicItem__img">
                {
                    isVideo ? (
                        <video src={PictureThumbnail} muted></video>
                    ) : (
                        <img src={PictureThumbnail} alt="" />
                    )
                }

            </div>
            <div className="PicItem__action">
                <Button onClick={() => onDelete(ID, index)} styles={{ width: '100%', padding: 10 }} variant={'danger'} text={'Удалить'} before={<BsTrash />} justify={'center'} />
            </div>
        </div>
    )
}

export default PicItem;