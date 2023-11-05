import Input from "../../../../components/Input/Input";

const IntegrTgBot = () => {
    return (
        <div className="IntegrTgBot part">
            <h3 className="def-label">Токен бота телеграм для авторизации</h3>
            <div className="IntegrTgBot__body">
                <Input placeholder={'Token'}/>
            </div>
        </div>
    )
}

export default IntegrTgBot;