import styles from './StorieCard.module.scss';
import { Row, Col } from 'antd';
import {RiPencilLine} from 'react-icons/ri';
import {BiTrash} from 'react-icons/bi';
import getClassNames from '../../../../../../funcs/getClassNames';
import Draggable from 'react-free-draggable';
import { useEffect } from 'react';

const StorieCard = ({
  onEditStorie,
  onDeleteStorie,
  data,
  index
}) => {
  const {
    PictureThumbnail,
    // BundleID,
    // Disabled,
    // ID,
    // ItemOrder,
    // Picture,
    grad,
    media,
    textList,
  } = data || {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.action}>
        <Row gutter={[8,8]}>
          <Col span={24}>
            <button 
              onClick={() => onEditStorie({
                ...data,
                index})}
              className={getClassNames([styles.btn, styles.btn_edit])}>
              <RiPencilLine/>
            </button>
          </Col>
          <Col span={24}>
            <button 
              onClick={() => onDeleteStorie(index)}
              className={getClassNames([styles.btn, styles.btn_delete])}>
              <BiTrash/>
            </button>
          </Col>
        </Row>
      </div>
      <div className={styles.main}>
        <div className={styles.timeline}></div>
        <div className={getClassNames([styles.prev, 'prev-drag-bounds'])}>
          <div className={styles.prev_mask} style={{backgroundColor: `rgba(0,0,0, .${grad?.value}`}}></div>
          {
            textList?.map(i => (
              <Draggable
                bounds={'.prev-drag-bounds'}
                style={{pointerEvents: 'none', touchAction: 'none'}}
                scale={1.5}
                className={'nekst-font'}
                positionOffset={{
                  x: i?.coords[0],
                  y: i?.coords[1] 
                }}
                >
                <div 
                  style={{
                    color: i?.color,
                    fontSize: i?.fontSize,
                    fontWeight: i?.fontWeight,
                    position: 'absolute',
                  }}
                  className={styles.prev_text}>
                  {i?.value}
                </div>
              </Draggable>
            ))
          }
          {
            media?.type?.includes('image') && (
              <img src={PictureThumbnail || media?.source} alt="" />
            )
          }
          {
            media?.type?.includes('video') && (
              // <video autoPlay loop src={PictureThumbnail || URL.createObjectURL(media?.source)}></video>
              <video autoPlay loop src={PictureThumbnail || media?.source} muted></video>
            )
          }
          
        </div>
      </div>
    </div>
  )
}

export default StorieCard;