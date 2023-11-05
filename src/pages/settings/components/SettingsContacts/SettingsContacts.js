import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';

import SettingsAddContact from '../../modals/SettingsAddContact/SettingsAddContact';


const SettingsContacts = ({
    data,
    setData,
}) => {
    const [addContact, setAddContact] = useState(false)
    const [localList, setLocalList] = useState([])
    const [selected, setSelected] = useState(null)

    const openAddContact = () => setAddContact(true)
    const closeAddContact = () => {
        setSelected(null)
        setAddContact(false)
    }

    useEffect(() => {
        setLocalList(data)
    }, [data])



    return (
        <div className="SettingsContacts part">
            <SettingsAddContact
                visible={addContact}
                close={closeAddContact}
                data={selected}
                list={data}
                setList={setData}
                />
            <h3 className="def-label">Контакты</h3>
            <div className="SettingsContacts__body">
                {
                    localList?.map((item,index) => (
                        <Input 
                            maskType={String}
                            readOnly
                            onClick={() => {
                                setSelected({...item, index})
                                openAddContact()
                            }}
                            style={{marginBottom: 10}} 
                            value={item?.Data}/> 
                    ))
                }
                <Pl 
                    onClick={() => {
                        setSelected(null)
                        openAddContact()
                    }}
                    text={'Добавить контакт'} 
                    style={{backgroundColor: '#fff'}}/>
            </div>
        </div>
    )
}

export default SettingsContacts;