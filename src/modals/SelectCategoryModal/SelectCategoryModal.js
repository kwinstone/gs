import styles from './styles.module.scss';
import { FC, useEffect, useState } from 'react'
import {Modal, Row, Col} from 'antd'
import getClassNames from '../../funcs/getClassNames';
import Button from '../../components/Button/Button';
import catService from '../../services/catService';
import { useSelector } from 'react-redux';
import InputSelect from '../../components/InputSelect/InputSelect';

const ct = new catService()

const SelectCategoryModal = ({
  initData,
  open,
  onCancel,
  onSave
}) => {
  const {token} = useSelector(s => s)
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)

  const onClose = () => {
    setSelected(null)
    onCancel && onCancel()
  }

  useEffect(() => {
    if(initData) {
      setSelected(initData)
    }
  }, [initData])

  useEffect(() => {
    if(token) {
      ct.getCats(token).then(res => {
        
        setList(res?.map(i => ({...i, label: i?.Name, value: i?.ID})))
      }) 
    }
  }, [token])

  

  const saveHandle = () => {
    onSave(selected)
    onClose()
  }

  return (
    <Modal  
      open={open}
      onCancel={onClose}
      className={getClassNames(['Modal', styles.wrapper])}
      >
      <Row gutter={[20,20]}>
        <Col span={24}>
          <div style={{margin: 0}} className='Modal__head'>Добавить/редактировать категорию</div>
        </Col>
        <Col span={24}>
          <InputSelect
            list={list}
            onSelect={setSelected}
            placeholder={'Выбрать категорию'}
            />
        </Col>
        <Col span={24}>
          <Button
            styles={{width: '100%'}}
            text={'Сохранить'}
            disabled={!selected}
            onClick={saveHandle}
            />
        </Col>
      </Row>
    </Modal>
  )
}

export default SelectCategoryModal;