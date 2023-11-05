import { Modal, Col, Row } from "antd";
import { useEffect, useState } from "react";
import Text from "../../../../components/Text/Text";
import Button from "../../../../components/Button/Button";
import SaveIcon from "../../../../icons/SaveIcon/SaveIcon";
import { useCallback } from "react";
import './SettingsEditArticle.scss';


const SettingsEditArticle = ({
    visible,
    close,
    data,
    setData
}) => {
    const [text, setText] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        if(data) {
            console.log(data)
            setText(data.text)
            setName(data.name)
        }
    }, [data])

    const handleClose = () => {
        close()
    }

    const onSave = useCallback((index) => {

        if(index === 0) {
            setData(state => {
                return {
                    ...state,
                    Bonuses: text
                }
            })
        }
        if(index === 1) {
            setData(state => {
                return {
                    ...state,
                    DeliveryAndPayment: text
                }
            })
        }
        if(index === 2) {
            setData(state => {
                return {
                    ...state,
                    PrivacyPolicy: text
                }
            })
        }
        handleClose();
        
    }, [text])

    return (
        <Modal
            open={visible}
            onCancel={handleClose}
            width={700}
            className={"Modal SettingsEditArticle"}        
            >
            <div className="Modal__head">
                {name}
            </div>
            <div className="Modal__form">
                <Row gutter={[15,40]}>
                    <Col span={24}>
                        <Text
                            
                            value={text}
                            onChange={e => setText(e.target.value)}
                            shadow
                            height={350}
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            disabled={!text}
                            text={'Сохранить'}
                            styles={{width: '100%'}}
                            before={<SaveIcon color={'#fff'} size={16}/>}
                            onClick={() => onSave(data.index)}
                            />
                    </Col>
                </Row>
                
            </div>
        </Modal>
    )
}

export default SettingsEditArticle;