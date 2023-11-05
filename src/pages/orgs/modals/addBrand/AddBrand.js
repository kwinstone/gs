import './AddBrand.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import orgService from '../../../../services/orgService';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import { FiDownload } from 'react-icons/fi';
import { MoonLoader } from 'react-spinners';

const os = new orgService()

const AddBrand  = ({visible, close, updateList}) => {
    const {token} = useSelector(state => state)
    const [prevImg, setPrevImg] = useState(null);
    const [image, setImage] = useState(null);
    const [markerID, setMarkerID] = useState('')
    const [load, setLoad] = useState(false)
    const fileInput = useRef()


    const closeModal = () => {
        setImage('')
        setMarkerID('')
        setPrevImg('')
        close();
    }

     

    const addBrand = () => {
        const body = new FormData()
        body.append('ItemOrder', 0)
        body.append('LogoUrl', image)
        body.append('MarkerID', markerID)

        setLoad(true)
        os.addBrand(token, body)
            .then(res => updateList(res))
            .finally(_ => {
                setLoad(false)
                closeModal()
            })
    }
    

    const imgHandle = (e) => {
       
        setImage(e.target.files[0])
        setPrevImg(URL.createObjectURL(e.target.files[0]))
        fileInput.current.value = ''
    }


    
    return (
        <Modal width={540} className='Modal' open={visible} onCancel={closeModal}>
            <h2 className="Modal__head">Добавить бренд</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    {/* <div className="Modal__form_upload">
                        {
                            prevImg ? (
                                <div className="Modal__form_upload_prev">
                                    <img src={prevImg} alt="" />
                                </div>
                            ) : (
                                <>
                                <input onChange={imgHandle} type="file" id='uploadBrandImg'/>
                                <label htmlFor='uploadBrandImg' className="Modal__form_upload_label">

                                    <span className="Modal__form_upload_label_text">
                                        Выбрать логотип
                                    </span>

                                </label>
                                </>
                            )
                        }
                    </div> */}
                    <div className="Modal__form_upload">
                        {
                            prevImg ? (
                                <div className="Modal__form_upload_prev">
                                    <img src={prevImg} alt="" />
                                    <div className="Modal__form_upload_prev_edit">
                                        <input ref={fileInput} onChange={imgHandle} type="file" id="uploadBrandImgEdit"/>
                                        <label htmlFor="uploadBrandImgEdit">
                                            <FiDownload/>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <>
                                <input ref={fileInput} onChange={imgHandle} type="file" id='uploadBrandImg'/>
                                <label htmlFor='uploadBrandImg' className="Modal__form_upload_label">

                                    <span className="Modal__form_upload_label_text">
                                        Выбрать логотип
                                    </span>

                                </label>
                                </>
                            )
                        }
                    </div>
                </div>
                
                <div className="Modal__form_row">
                    <Input 
                        maskType={Number}
                        shadow={true} 
                        value={markerID} 
                        onChange={e => setMarkerID(e.target.value)} 
                        placeholder={'ID бренда'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        onClick={addBrand} 
                        load={load} 
                        disabled={!markerID || !image} 
                        type={'button'} 
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                </div>
            </form>
        </Modal>
    )
}

export default AddBrand;