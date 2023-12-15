import {Modal, Col, Row, message, Tabs} from "antd";
import { useEffect, useState } from "react";
import Text from "../../../../components/Text/Text";
import Button from "../../../../components/Button/Button";
import SaveIcon from "../../../../icons/SaveIcon/SaveIcon";
import { useCallback } from "react";
import './SettingsEditArticle.scss';
import {useSelector} from "react-redux";
import setService from "../../../../services/setService";
import Input from "../../../../components/Input/Input";
import {checkIsBao} from "../../../../utils/checkIsBao";


const ss = new setService();

const SettingsEditArticle = ({
                                 visible,
                                 close,
                                 data,
                                 setData,
                                 articles,
                                 contacts,
                             }) => {
    const {token} = useSelector(state => state)

    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [textKz, setTextKz] = useState('')
    const [textEn, setTextEn] = useState('')


    useEffect(() => {
        if(data) {
            console.log(data)
            setText(data.text)
            setTextKz(data.textKz)
            setTextEn(data.textEn)
            setName(data.name)
        }
    }, [data])

    const handleClose = () => {
        setText('')
        setTextKz('')
        setTextEn('')
        setName('')
        close()
    }

    const onSave = (index) => {
        const main = {
            Articles: {
                ...articles,
                Bonuses: index === 0 ? text : articles.Bonuses,
                Bonuses_en: index === 0 ? textEn : articles.Bonuses_en,
                Bonuses_kz: index === 0 ? textKz : articles.Bonuses_kz,

                DeliveryAndPayment: index === 1 ? text : articles.DeliveryAndPayment,
                DeliveryAndPayment_en: index === 1 ? textEn : articles.DeliveryAndPayment_en,
                DeliveryAndPayment_kz: index === 1 ? textKz : articles.DeliveryAndPayment_kz,

                PrivacyPolicy: index === 2 ? text : articles.PrivacyPolicy,
                PrivacyPolicy_en: index === 2 ? textEn : articles.PrivacyPolicy_en,
                PrivacyPolicy_kz: index === 2 ? textKz : articles.PrivacyPolicy_kz,
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
                    Bonuses: text,
                    Bonuses_en: textEn,
                    Bonuses_kz: textKz
                }
            })
        }
        if (index === 1) {
            setData(state => {
                return {
                    ...state,
                    DeliveryAndPayment: text,
                    DeliveryAndPayment_en: textEn,
                    DeliveryAndPayment_kz: textKz
                }
            })
        }
        if (index === 2) {
            setData(state => {
                return {
                    ...state,
                    PrivacyPolicy: text,
                    PrivacyPolicy_en: textEn,
                    PrivacyPolicy_kz: textKz
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

    const textTabs = [
        {
            key: '1',
            label: 'Русский язык',
            children: <Text
                value={text}
                onChange={e => setText(e.target.value)}
                shadow
                height={350}
            />,
        },
        {
            key: '2',
            label: 'Казахский язык',
            children: <Text
                value={textKz}
                onChange={e => setTextKz(e.target.value)}
                shadow
                height={350}
            />,
        },
        {
            key: '3',
            label: 'Английский язык',
            children: <Text
                value={textEn}
                onChange={e => setTextEn(e.target.value)}
                shadow
                height={350}
            />,
        },
    ];

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
                        {
                            checkIsBao() ? (
                                <Tabs defaultActiveKey="1" items={textTabs} onChange={() => {}} style={{ width: '100%'}} />
                            ) : textTabs[0].children
                        }
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