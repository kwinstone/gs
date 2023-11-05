import styles from './TextPart.module.scss';
import {Row, Col} from 'antd';
import { BsTrash } from 'react-icons/bs';
import Text from '../../../../../../components/Text/Text';
import getClassNames from '../../../../../../funcs/getClassNames';


const colors = [
  {
    value: '#fff',
  },
  {
    value: '#EEEEEE',
  },
  {
    value: '#2A2A2A'
  },
  {
    value: '#777777'
  },
  {
    value: '#FF4566'
  }
]


const fontSizes = [
  {
    value: 21,
    label: '21 - крупный текст'
  },
  {
    value: 16,
    label: '16 - обычный'
  },
  {
    value: 14,
    label: '14 - мелкий'
  }
]


const TextPart = ({
  data,
  editor,
  itemIndex
}) => {
  const {
    value,
    title,
    fontSize,
    color,
    coords,
  } = data || {}


  const onDelete = () => {
    editor?.deleteText(itemIndex)
  }

  const onFontSizeSelect = (fontSize) => {
    editor?.editText({
      data: {
        fontSize
      },
      itemIndex,
    })
  }

  const onColorSelect = (color) => {
    editor?.editText({
      data: {
        color
      },
      itemIndex
    })
  }

  return (
    <div className={styles.wrapper}>
      <Row gutter={[15,15]}>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={12}>
              <div className={styles.title}>{title}</div>
            </Col>
            <Col span={12}>
              <button onClick={onDelete} className={styles.delete}>
                <BsTrash/>
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className={styles.main}>
            <Row gutter={[15,15]}>
              <Col span={24}>
                <div className={styles.text}>
                  <Text
                    placeholder="Текст..."
                    value={editor?.textList[itemIndex]?.value}
                    onChange={(e) => {
                      editor?.editText({ 
                        data:{
                          value: e.target.value
                        },
                        itemIndex
                      })
                    }}
                    style={{borderColor: 'var(--vioelt)'}}
                    height={70}
                    />
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.size}>
                  {
                    fontSizes?.map((i,index) => (
                      <div
                        onClick={() => onFontSizeSelect(i.value)}
                        className={getClassNames([styles.size_item, i.value === editor?.textList[itemIndex]?.fontSize && styles.active])}>
                        <div className={styles.size_icon}></div>
                        <div className={styles.size_text}>
                          {i.label}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.colors}>
                  {
                    colors?.map((i,index) => (
                      <div 
                        onClick={() => onColorSelect(i.value)}
                        style={{backgroundColor: i?.value}}
                        className={getClassNames([styles.color, editor?.textList[itemIndex]?.color === i?.value && styles.active])}/>
                    ))
                  }
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TextPart;