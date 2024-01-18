import { Col, Modal, Row } from "antd";
import InputSelect from "../../../../components/InputSelect/InputSelect";
import Button from "../../../../components/Button/Button";
import { useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import PlUpload from "../../../../components/PlUpload/PlUpload";
import getBase64 from "../../../../funcs/getBase64";


export const AddLastFrameModal = ({ isOpen, close, url, changeUrl }) => {
    const [lastFrameURL, setLastFrameURL] = useState(url);
    const [cropper, setCropper] = useState();

    const getNewAvatarUrl = (e) => {
        if (e.target.files) {
            setLastFrameURL(URL.createObjectURL(e.target.files[0]));
        }
    };

    const getCropData = async () => {
        if (cropper) {
            const file = await fetch(cropper.getCroppedCanvas().toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    return new File([blob], "last_frame.png", { type: "image/png" });
                });
            if (file) {
                getBase64(file).then(res => changeUrl(res)).then(() => close())

            }
        }
    };

    const onFullSave = () => {
        if (lastFrameURL) {
            changeUrl(lastFrameURL)
        } else {
            changeUrl('')
        }
        close()
    };

    useEffect(() => {
        setLastFrameURL(isOpen ? url : undefined)
    }, [isOpen, url])

    return (
        <Modal open={isOpen} onCancel={close} footer={<></>}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <div style={{ margin: 0 }} className='Modal__head'>Добавить финальную заставку</div>
                </Col>
                <Col span={24}>
                    {
                        !lastFrameURL && (
                            <PlUpload
                                text={'Добавить финальный кадр'}
                                shadow
                                id={'final_frame'}
                                accept={'image/png, image/jpeg, image/jpg'}
                                onChange={getNewAvatarUrl}
                                style={{ marginBottom: 24, width: '100%', height: 280 }}
                            />
                        )
                    }
                    {
                        lastFrameURL && (
                            <>
                                <Cropper
                                    src={lastFrameURL}
                                    style={{ height: 400, width: 400 }}
                                    initialAspectRatio={4 / 3}
                                    minCropBoxHeight={100}
                                    minCropBoxWidth={100}
                                    guides={false}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                        setCropper(instance);
                                    }}
                                />
                                <Button
                                    styles={{ width: '100%', marginTop: 24 }}
                                    text={'Сохранить обрезанную версию'}
                                    onClick={getCropData}
                                // onClick={saveHandle}
                                />
                                <Button
                                    styles={{ width: '100%', marginTop: 24 }}
                                    text={'Убрать картинку'}
                                    onClick={() => {
                                        setLastFrameURL()
                                        setCropper()
                                    }}
                                    variant={'danger'}
                                // onClick={saveHandle}
                                />
                            </>
                        )
                    }
                </Col>
                <Col span={24}>
                    <Button
                        styles={{ width: '100%' }}
                        text={'Сохранить всю картинку'}
                        onClick={onFullSave}
                    />
                </Col>
            </Row>
        </Modal>
    )
}