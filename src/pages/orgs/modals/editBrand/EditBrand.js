import './EditBrand.scss';

import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState, useRef } from 'react';
import brandImg from '../../../../assets/img/org-brand.png';
import { useSelector } from 'react-redux';
import orgService from '../../../../services/orgService';
import {FiDownload} from 'react-icons/fi';
import { MoonLoader } from 'react-spinners';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';

const os = new orgService()

const EditBrand  = ({visible, close, selected, updateList}) => {
    const {ID,ItemOrder,LogoUrl,MarkerID} = selected;
    const {token} = useSelector(state => state)
    const [prevImg, setPrevImg] = useState(brandImg);
    const [image, setImage] = useState(null)
    const [markerId, setMarkerId] = useState('')
    const [load, setLoad] = useState(false)
    const [deleteLoad, setDeleteLoad] = useState(false)
    const [imgLoad, setImgLoad] = useState(false)
    const fileInput = useRef();


    useEffect(() => {
        if(LogoUrl && MarkerID) {
            setPrevImg(LogoUrl)
            setMarkerId(MarkerID)
        }
    }, [LogoUrl, MarkerID])

    const closeModal = () => {
        // setPrevImg('')
        // setImage(null)
        // setMarkerId('')
        close();
    }
    const handleMarker = (e) => {
        setMarkerId(e.target.value)
    } 

    const imgHandle = (e) => {
     
        setImgLoad(true)
        setImage(e.target.files[0])
        //setPrevImg(URL.createObjectURL(e.target.files[0]))
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            setPrevImg(reader.result)
            setImgLoad(false)
        }
        reader.onabort = () => setImgLoad(false)
        reader.onerror = () => setImgLoad(false)
        setImgLoad(false)
        fileInput.current.value = ''
    }



    const updateBrand = () => {
        setLoad(true)
        const body = new FormData()
        body.append('ID', ID)
        // body.append('ItemOrder', ItemOrder)
        if(image) {
            body.append('LogoUrl', image)
        }
        body.append('MarkerID', markerId)

        os.updateBrand(token, body).then(res => {
            updateList(res)
        }).finally(_ => {
            setLoad(false)
            closeModal()
        })
    }

    const deleteBrand = () => {
        setDeleteLoad(true)
        os.deleteBrand(token, {ID}).then(res => {
            updateList(res)
        }).finally(_ => {
            setDeleteLoad(false)
            closeModal()
        })
    }


    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const openDeleteConfirm = () => {
        setDeleteConfirm(true)
    }
    const closeDeleteConfirm = () => {
        setDeleteConfirm(false)
    }

    const deleteConfirmAccept = () => {
        deleteBrand()
        closeDeleteConfirm()
    }
    
    return (
        <Modal width={540} className='Modal' open={visible} onCancel={closeModal}>
            <ConfirmModal
                text={'Удалить бренд'}
                visible={deleteConfirm}
                close={closeDeleteConfirm}
                cancel={deleteConfirmAccept}
                />
            <h2 className="Modal__head">Изменить бренд</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <div className="Modal__form_upload">
                        {
                            imgLoad ? (
                                <div className="Modal__form_upload_load">
                                    <MoonLoader color='#fff'/>
                                </div>
                            ) : null
                        }
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
                        shadow={true}
                        maskType={Number}
                        value={markerId} 
                        onChange={handleMarker} 
                        placeholder={'ID бренда'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{marginBottom: 20}} 
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}
                        onClick={updateBrand}
                        load={load}
                        disabled={!markerId}/>

                    <Button 
                        onClick={openDeleteConfirm}
                        type={'button'} 
                        before={<BsTrash size={20}/>} 
                        justify={'flex-start'} 
                        text={'Удалить бренд'}
                        variant={'danger'}
                        load={deleteLoad}/>
                </div>
            </form>
        </Modal>
    )
}

export default EditBrand;