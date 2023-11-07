import styles from './TextPart.module.scss';
import {Row, Col, Input, InputNumber, Divider, Checkbox} from 'antd';
import { BsTrash } from 'react-icons/bs';
import Text from '../../../../../../components/Text/Text';
import getClassNames from '../../../../../../funcs/getClassNames';
import {useState} from "react";
import {CgColorPicker} from "react-icons/cg";


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
  const [initial, setInitial] = useState('#5e72e4');
  const [customColor, setCustomColor] = useState({});

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

  const onFontWeightSelect = (e) => {
    const value = e.target.checked;
    editor?.editText({
      data: {
        fontWeight: value ? 600 : 500
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

  const [customSize, setCustomSize] = useState(6);
  console.log('Editor', editor.textList)

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
            <Row>
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
                <div style={{ fontWeight: 600, marginBottom: 8, marginTop: 12}}>
                  Выбор размера:
                </div>
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
                  {
                    <div
                        onClick={() => onFontSizeSelect(customSize)}
                        className={getClassNames([styles.size_item, customSize === editor?.textList[itemIndex]?.fontSize && styles.active])}>
                      <div className={styles.size_icon}></div>
                      <div className={styles.size_text}>
                        <InputNumber value={customSize} onChange={(value) => {
                          setCustomSize(value)
                          onFontSizeSelect(value)
                        }} min={6} max={28} type={'number'} /> - свой размер
                      </div>
                    </div>
                  }
                </div>
                <div style={{ marginTop: 12}}>
                  <Checkbox value={editor?.textList[itemIndex]?.fontWeight === 600} onChange={onFontWeightSelect}>Сделать текст жирным</Checkbox>
                </div>
              </Col>
              <Col span={24}>
                <Divider />
                <div style={{ fontWeight: 600, marginBottom: 8}}>
                  Выбор цвета:
                </div>
                <div className={styles.colors}>
                  {
                    colors?.map((i,index) => (
                      <div 
                        onClick={() => onColorSelect(i.value)}
                        style={{backgroundColor: i?.value}}
                        className={getClassNames([styles.color, editor?.textList[itemIndex]?.color === i?.value && styles.active])}/>
                    ))
                  }
                  <div className={styles.colorPicker}><input type={'color'} onChange={e => onColorSelect(e.target.value)} className={styles.colorPicker__input} />
                    <CgColorPicker className={styles.colorPicker__icon} color={'white'} size={20} />
                  </div>
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