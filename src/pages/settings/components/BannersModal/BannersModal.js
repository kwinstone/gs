import {Button, Modal, Upload} from "antd";
import {useEffect, useState} from "react";
import endpoints from "../../../../services/endpoints";
import checkAuth from "../../../../services/checkAuth";
import {useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {TiPlusOutline} from "react-icons/ti";
import {BiPlus} from "react-icons/bi";

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const asyncRequest=async({file,onSuccess})=>{
    setTimeout(()=>{
        onSuccess("ok");
    },0);
}

export const BannersModal = (props) => {
    const {token, settings} = useSelector(state => state)
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            let res = await fetch(endpoints.getBanners, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            const d = await checkAuth(res)
            setData(d)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addBanner = async (b64) => {
        try {
            const formData  = new FormData();

            formData.append('width', 250)
            formData.append('height', 150)
            formData.append('image', b64)

            let res = await fetch(endpoints.addBanners, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })

            const d = await checkAuth(res)
            fetchData()
        } catch(err) {
            console.log(err)
        }
    }

    const handleUpload = async (info) => {
        console.log(info.file.status)
        if (info.file.status === 'uploading') {
            // setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            const base64 = await toBase64(info.file.originFileObj);
            console.log(base64)
            addBanner(base64);
        }
    }

    const handleDelete = async (id) => {
        try {
            const formData  = new FormData();
            formData.append('ID', id)

            let res = await fetch(endpoints.removeBanners, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })

            const d = await checkAuth(res)
            fetchData()
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Modal open={props.open} onCancel={props.onClose} footer={<></>} width={1200}>
            <h2>Редактировать баннеры</h2>
            <div style={{ margin: '30px 0', display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                {
                    data?.map((c,i) => (
                        <div key={i}>
                            <div style={{
                                border: '2px solid gray',
                                width: c.width,
                                height: c.height,
                                padding: 12,
                                borderRadius: '12px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: -12,
                                    cursor: 'pointer',
                                    right: -12,
                                    background: '#DC143C',
                                    height: 26,
                                    width: 26,
                                    borderRadius: '50%',
                                    color: 'white',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    lineHeight: '24px'
                                }}
                                    onClick={() => handleDelete(c.ID)}
                                >
                                    x
                                </div>
                                <img src={`${c.image}`} width={c.width}/>
                            </div>
                        </div>
                    ))
                }
                <div style={{ width: 250, height: '250px' }}>
                    <Upload
                        showUploadList={false}
                        customRequest={asyncRequest}
                        listType="picture-card"
                        onChange={handleUpload}
                    >
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <BiPlus size={'24px'} color={'#7B99FF'} />
                            <div style={{ color: '#7B99FF', fontWeight: 600}}>Загрузить баннер</div>
                        </button>
                        {/*{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}*/}
                    </Upload>
                </div>
                {/*<input type={'file'} onChange={handleUpload} />*/}
            </div>
            <Button onClick={props.onClose} danger type={'primary'} style={{ marginLeft: 'auto', display: 'block'}}>
                Закрыть
            </Button>
        </Modal>
    )
}