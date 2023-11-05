import styles from './AddText.module.scss';
import {PiTextT, PiPlusBold} from 'react-icons/pi'

const AddText = ({
  onClick
}) => {

  return (
    <button onClick={onClick} className={styles.wrapper}>
      <div className={styles.main}>
        <PiTextT/>
      </div>
      <div className={styles.icon}>
        <PiPlusBold/>
      </div>
    </button>
  )
}

export default AddText;