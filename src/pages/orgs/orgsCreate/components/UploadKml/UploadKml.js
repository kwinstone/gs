import './UploadKml.scss';
import {BsDownload} from 'react-icons/bs';
import kmlParser from 'js-kml-parser';
import orgService from '../../../../../services/orgService';
import { useState } from 'react';
import SelectKmlPol from '../../modals/SelectKmlPol/SelectKmlPol';
import { useRef } from 'react';

const UploadKml = ({getKml, updatePolList}) => {
    const [selectKmlPolModal, setSelectKmlPolModal] = useState(false)
    const [ll, setLl] = useState(null)
    const file = useRef()

    const openSelectKmlPolModal = () => {
        setSelectKmlPolModal(true)
    }
    const closeSelectKmlPolModal = () => {
        setLl(null)
        setSelectKmlPolModal(false)
        resetFile()
    }

    const resetFile = () => {
        file.current.value = ''
    }

    const handleChange = (e) => {
        fetch(URL.createObjectURL(e.target.files[0]), {
            method: 'GET',
        }).then(res => res.text()).then(data => {
            const parsedData = kmlParser.toGeoJson(data) 
            const filteredData = parsedData.features.filter(item => item?.geometry?.coordinates?.length != 3)
            const mod = filteredData.map((item, index) => {
                return {
                    ...item,
                    geometry: {
                        type: item.geometry.type,
                        coordinates: item?.geometry?.coordinates?.length > 0 ? (
                            [item.geometry.coordinates[0].map(i => [i[0], i[1]])]
                        ) : []
                    },
                    id: index
                }
            })
            
            setLl(mod)
            openSelectKmlPolModal()
        })
    }

    return (
        <div className="UploadKml">
            <SelectKmlPol
                resetFile={resetFile}
                updatePolList={updatePolList}
                visible={selectKmlPolModal}
                close={closeSelectKmlPolModal}
                list={ll}
                />
            <input ref={file} onChange={handleChange} type="file" accept='.kml' id='UploadKml'/>
            <label htmlFor="UploadKml" className="UploadKml__label">
                <div className="UploadKml__label_text def-label">Загрузить KML-файл</div>
                <div className="UploadKml__label_icon">
                    <BsDownload/>
                </div>
            </label>
        </div>
    )
}

export default UploadKml;