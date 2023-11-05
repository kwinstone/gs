import './StorieItem.scss'
import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import getClassNames from '../../../../funcs/getClassNames';

const StorieItem = ({
  selectStorie,
  openStorie,
  startShow,
  startSelected,
  setStartSelected,
  selected,

  data
}) => {
  const {
    images,
    ID,
    PictureThumbnail,
    Picture
  } = data || {}


  const [tm, setTm] = useState(false)
  const [time, setTime] = useState()

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
    <div className={getClassNames(['StorieItem', startSelected?.ID == ID && 'selected'])}>
      <div className="StorieItem__main" onMouseUp={checkClick} onMouseDown={clickHandle}>
        <div className="StorieItem__img">
          <img src={PictureThumbnail || images[0]?.PictureThumbnail || Picture} alt="" />
        </div>
      </div>
      {
        startShow && startSelected?.ID != ID ? (
          <button onClick={() => {
            if (startSelected?.ID == ID) {
              setStartSelected(null)
            } else {
              setStartSelected(data)
            }
          }}
            className={"StorieItem__add" + (startSelected?.ID == ID ? ' StorieItem__add-danger ' : '')}>
            <BsPlusLg />
          </button>
        ) : null
      }
    </div>
  )
}

export default StorieItem;