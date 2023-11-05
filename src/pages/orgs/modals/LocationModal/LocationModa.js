import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Wrapper, Status} from "@googlemaps/react-wrapper";
import Map from '../../../../components/Map/Map';
import MapMarker from '../../../../components/MapMarker/MapMarker';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';

const LocationModal = ({visible, close, coords, setLocation}) => {
    const [selected, setSelected] = useState(null)


    const hideModal = () => {
        setSelected(null)
        close();
    }

    const onSave = () => {
        setLocation(selected)
        hideModal()
    }

    return (
        <Modal width={1220} className='Modal' open={visible} onCancel={hideModal}>
            <div className="Modal__head">Выбрать местоположение</div>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <div className="Modal__form_map">
                        <MapMarker
                            id={'select-map'}
                            coords={coords}
                            setSelected={setSelected}
                            />
                    </div>
                    
                </div>
                {
                    selected ? (
                       <div className="Modal__form_action" style={{marginTop: 30}}>
                            <Button 
                                onClick={onSave} 
                                type={'button'} 
                                text={'Сохранить'} 
                                before={<SaveIcon color={'#fff'} size={'20'}/>} 
                                justify={'flex-start'}/>
                       </div> 
                    ) : null
                }
            </form>
        </Modal>
    )
}

export default LocationModal;