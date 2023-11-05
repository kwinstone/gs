import Input from "../../../../components/Input/Input";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import Button from "../../../../components/Button/Button";

const IntegrIlko = () => {
    return (
        <div className="IntegrIlko part">
            <h3 className="def-label">iIko Cloud API token</h3>
            <div className="IntegrIlko__body">
                
                <Input placeholder={'API key'} style={{marginBottom: 20}}/>
                <Checkbox style={{marginBottom: 10}} id={'ilko1'} text={'Автоматически загружать из iIko блюда'}/>
                <Checkbox style={{marginBottom: 10}} id={'ilko2'} text={'Автоматически загружать из iIko организации'}/>
                <Checkbox style={{marginBottom: 10}} id={'ilko3'} text={'Разрешить iIko создание новых организации'}/>
                <Checkbox style={{marginBottom: 10}} id={'ilko4'} text={'Разрешить iIko создание новых блюд'}/>

                <Button styles={{width: '100%', marginTop: 30}} text={'Синхронизировать все данные с iIko'}/>
            </div>  
        </div>
    )
}

export default IntegrIlko;