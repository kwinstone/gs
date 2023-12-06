import {Modal} from "antd";
import {Cropper} from "react-cropper";
import {useState} from "react";
import Button from "../../../../components/Button/Button";
import getBase64 from "../../../../funcs/getBase64";


export const CropPreview = ({isOpen, onClose, src, onChange}) => {
    const [cropper, setCropper] = useState();

    const onCrop = async () => {
        if (cropper) {
            const file = await fetch(cropper.getCroppedCanvas().toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    return new File([blob], "newAvatar.png", { type: "image/png" });
                });
            if (file) {
                getBase64(file).then(res => onChange(res)).then(() => {
                    onClose()
                })
            }
        }
    }

    const onFullSave = () => {
        onChange(src)
        onClose()
    }


    return (
        <Modal open={isOpen} footer={<></>} closeIcon={<></>}>
            <Cropper
                src={src}
                style={{ height: 400, width: 400, margin: '0 auto' }}
                initialAspectRatio={4 / 3}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                guides={false}
                checkOrientation={false}
                onInitialized={(instance) => {
                    setCropper(instance);
                }}
            />
            <Button text={'Сохранить обрезанную версию'} onClick={onCrop} styles={{width: '100%', marginTop: 24}} />
            <Button text={'Сохранить без обрезания'} styles={{width: '100%', marginTop: 24}} onClick={onFullSave} />
            <Button variant={'danger'} text={'Отменить выбор'} styles={{width: '100%', marginTop: 24}} onClick={() => {
                onClose()
            }} />
        </Modal>
    )
}