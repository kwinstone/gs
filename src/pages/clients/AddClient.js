import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {Checkbox, notification} from "antd";
import {useSelector} from "react-redux";
import {IMaskInput} from "react-imask";


const AddClientPage = () => {
    const {token} = useSelector(state => state)
    const [fio, setFio] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isBulk, setIsBulk] = useState(true)

    const onSubmit = async () => {
        let birthdayDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
        const d = new FormData()
        if (phone.length !== 16) {
            return alert('Неверный формат номера телефона')
        }
        d.append('Name', fio)
        d.append('Email', email)
        d.append('Phone', `+${phone.replace(/\D/g, '')}`)
        d.append('Bulkprices', isBulk)
        d.append('Birthday', birthdayDate.toISOString().split('T')[0]);

        console.log(fio, email, phone, isBulk)

        const r = await fetch('https://macarons.gscore.ru/NewApi/Auth/CreateAccount.php', {
            method: 'POST',
            body: d,
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer ${token}`,
            }
        })
        const rj = await r.json()

        if (rj.token) {
            notification.success({message: 'Клиент успешно добавлен'})
            setFio('')
            setEmail('')
            setPhone('')
            setIsBulk(true)
        } else {
            notification.error({message: 'Ошибка при добавлении клиента'})
        }
        console.log(rj)
    }

    return (
        <div style={{ paddingTop: '110px', paddingLeft: '20px', width: '100%'}}>
            <Button text={'Вернуться'} onClick={() => window.history.back()} />
            <div style={{
                background: 'white',
                padding: '24px 16px',
                borderRadius: '12px',
                width: '500px',
                margin: '0 auto',
                display: 'block'
            }}>
                <h2 style={{ fontSize: '20px', textAlign: 'center'}}>Добавление клиента</h2>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                    width: '100%',
                    marginTop: '20px'
                }}>
                    <Input placeholder={'ФИО'} maskType={String} value={fio} onChange={e => setFio(e.target.value)} />
                    <Input placeholder={'Эл. почта'} maskType={String} value={email} onChange={e => setEmail(e.target.value)} />
                    <IMaskInput
                        mask={'+{7}(000)000-00-00'}
                        placeholder={'+7(000)000-00-00'}
                        style={{
                            height: '50px',
                            borderRadius: 8,
                            paddingLeft: 12,
                            color: 'black',
                            borderColor: '#B0C2FF',
                            fontWeight: 600
                        }}
                        value={phone} onChange={e => setPhone(e.target.value)}
                    />
                    {/*<Input placeholder={'Номер телефона'} maskType={String} value={phone} onChange={e => setPhone(e.target.value)} />*/}
                    {/*<Input placeholder={'Дата рождения'} />*/}
                    {/*<Checkbox text={'Оптовый заказчик'} checked={true} value={true} />*/}
                    <Checkbox checked={isBulk} onChange={(e) => setIsBulk(e.target.checked)}>
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>Это оптовый заказчик</p>
                    </Checkbox>
                    <div style={{ margin: '0 auto'}}>
                        <Button text={'Создать'} onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClientPage;