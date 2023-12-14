import './MiniStorie.scss';
import { useState } from 'react';

const MiniStorie = ({
  selectStorie,
  openStorie,

  data
}) => {
  const {
    images,
    PictureThumbnail,
    Picture
  } = data || {}

  const [tm, setTm] = useState(false)
  const [time, setTime] = useState();


  const clickHandle = () => {
    setTime(setTimeout(() => {
      setTm(true)
    }, 200))

  }

  const checkClick = () => {
    if (tm) {
      setTm(false)
      return;
    } else {
      clearTimeout(time)
      selectStorie(data)
      openStorie()
    }
  }
  return (
    <div className="MiniStorie" onMouseUp={checkClick} onMouseDown={clickHandle}>
      <div className="MiniStorie__img">
        <img src={PictureThumbnail || images?.[0]?.PictureThumbnail || Picture} alt="" />
      </div>
    </div>
  )
}

export default MiniStorie;