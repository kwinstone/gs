import {Button, Divider, Select, Switch} from "antd";


export const ReservationPage = () => {

    return (
        <div style={{
            background: 'white',
            margin: '42px auto',
            width: 500,
            padding: 24,
            borderRadius: 12
        }}>
            <h3>Выбранная организация:</h3>
            <Select
                defaultValue={1}
                style={{ width: '100%' }}
                size={'large'}
                options={[
                    { value: 1, label: 'Организация 1'},
                    { value: 2, label: 'Организация 2'},
                    { value: 3, label: 'Организация 3'},
                ]}
            />
            <Divider />
            <h3 style={{ marginTop: '12px'}}>Доступные для брони дни недели:</h3>
            <div style={{color: 'black', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: 12, margin: '24px 0'}}>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Понедельник
                </div>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Вторник
                </div>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Среда
                </div>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Четверг
                </div>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Пятница
                </div>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Суббота
                </div>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <Switch/>
                    Воскресенье
                </div>
            </div>
            <Button type={'primary'}>
                Сохранить изменения
            </Button>
        </div>
    )
}