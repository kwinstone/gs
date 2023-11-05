import getClassNames from '../../../../../../funcs/getClassNames';
import styles from './Grad.module.scss';

const gradList = [
  {
    label: '30%',
    value: 30
  },
  {
    label: '20%',
    value: 20
  },
  {
    label: '10%',
    value: 10
  },
  {
    label: '0%',
    value: 0
  }
]



const Grad = ({
  editor
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
      Выберете затемнение фона
      </div>
      <div className={styles.list}>
      {
            gradList?.map(i => (
              <div 
                onClick={() => editor?.onGradSelect(i)}
                style={{backgroundColor: `rgba(0,0,0, .${i.value}`}}
                className={getClassNames([styles.item, editor.grad?.value === i?.value && styles.active])}>
                {i.label}
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default Grad;