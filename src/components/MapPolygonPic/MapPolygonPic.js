import './MapPolygonPic.scss';
import { useEffect, useState } from 'react';

const MapPolygonPic = ({polygonCoords, color, name }) => {
    
    const [polygon, setPolygon] = useState('')


    useEffect(() => {
        
        if(polygonCoords) {
            setPolygon(polygonCoords.map(item => {
                return [
                    item.lat,
                    item.lng
                ]
            }).join('|'))
        }
    }, [polygonCoords])

    useEffect(() => {
        console.log(color)
    }, [color])


    if(color && polygon) {
        return (
            <div className="MapPolygonPic">
                <div className="MapPolygonPic__name def-label">{name == '0' || !name ? 'Название' : name}</div>
                <div className="MapPolygonPic__img">
                <img src={'https://maps.googleapis.com/maps/api/staticmap?' + 
                `&size=400x400&path=fillcolor:${'0x' + color?.slice(1, color?.length).toUpperCase()}|color:${'0x' + color?.slice(1, color?.length).toUpperCase()}|weight:5
                |${polygon}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} alt="" />
                </div>
            </div>
        )
    }

    if(polygon && !color) {
        return (
            <div className="MapPolygonPic">
                <div className="MapPolygonPic__name def-label">{name == '0' || !name ? 'Название' : name}</div>
                <div className="MapPolygonPic__img">
                <img src={'https://maps.googleapis.com/maps/api/staticmap?' + 
                `&size=400x400&path=fillcolor:${'0x' + '7B99FF'}|color:${'0x' + '7B99FF'}|weight:5
                |${polygon}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} alt="" />
                </div>
            </div>
        )
    }
    
}

export default MapPolygonPic;