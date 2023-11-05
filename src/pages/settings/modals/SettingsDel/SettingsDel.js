import { Modal } from "antd";
import Text from '../../../../components/Text/Text';
import Button from "../../../../components/Button/Button";



const SettingsDel = ({visible, close}) => {
    const closeHandle = () => {
        close()
    }


    return (
        <Modal width={600} className="Modal" onCancel={closeHandle} open={visible}>
            <h2 className="Modal__head">Доставка и оплата</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Text height={400}/>
                </div>
                <div className="Modal__form_action">
                    <Button text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default SettingsDel;