import {Alert, Button, Checkbox, Divider, Input} from "antd";


export const StatusPage = () => {
    const data = {
        status: 1
    }

    return (
        <div style={{ padding: '42px', width: '100%' }}>
            <div style={{
                background: 'white',
                margin: '0 auto',
                padding: 24,
                borderRadius: 12,
                width: 500
            }}>
                <h3>Статус вебсайта:</h3>
                <div>
                    <Alert message={'Сайт запущен и доступен всем клиентам'} type={'success'} showIcon/>
                </div>

                <Divider />

                <h3 style={{ marginTop: 24, marginBottom: 12}}>Изменить</h3>

                <h5 style={{ color: 'gray', marginBottom: 0 }}>Текст при отключении сайта</h5>
                <Input.TextArea rows={4} />
                <div style={{ marginTop: 12}}>
                    <Checkbox>
                        Отключить сайт
                    </Checkbox>
                </div>
                <Button type={'primary'} style={{ marginTop: 18 }}>
                    Обновить настройки
                </Button>
            </div>
        </div>
    )
}