import {Modal, Col, Row, message} from "antd";
import { useEffect, useState } from "react";
import Text from "../../../../components/Text/Text";
import Button from "../../../../components/Button/Button";
import SaveIcon from "../../../../icons/SaveIcon/SaveIcon";
import { useCallback } from "react";
import './SettingsEditArticle.scss';
import {useSelector} from "react-redux";
import setService from "../../../../services/setService";


const ss = new setService();

const SettingsEditArticle = ({
    visible,
    close,
    data,
    setData,
    articles,
    contacts
}) => {
    const {token} = useSelector(state => state)

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

    const onSave = (index) => {
        const main = {
            Articles: {
                ...articles,
                Bonuses: index === 0 ? text : articles.Bonuses,
                DeliveryAndPayment: index === 1 ? text : articles.DeliveryAndPayment,
                PrivacyPolicy: index === 2 ? text : articles.PrivacyPolicy,

            },
            Contacts: contacts.map(i => {
                delete i.index;
                return i;
            })
        }

        if (index === 0) {
            setData(state => {
                return {
                    ...state,
                    Bonuses: text
                }
            })
        }
        if (index === 1) {
            setData(state => {
                return {
                    ...state,
                    DeliveryAndPayment: text
                }
            })
        }
        if (index === 2) {
            setData(state => {
                return {
                    ...state,
                    PrivacyPolicy: text
                }
            })
        }

        Promise.all([ss.editMainSettings(token, main)]).then(res => {

            if(res) {
                message.success('Настройки сохранены')
            }
            handleClose();
        }).finally(_ => {
            // message.error('Возникла ошибка при сохранении настроек')
        })
    }

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