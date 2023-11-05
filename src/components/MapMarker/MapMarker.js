import './MapMarker.scss';
import { 
    GoogleMap, 
    Marker,
    useLoadScript
} from "@react-google-maps/api";
import Loader from '../Loader/Loader';
import { useState, useRef, useEffect } from "react";

const MapMarker = ({coords, setSelected, readOnly, id}) => {

    const {isLoaded} = useLoadScript({
        id: id,
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const mapRef = useRef()
    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState(null)


    useEffect(() => {
        if(coords) {
            setMarker(coords)
        }
    }, [coords])

    const onLoad = (map) => {
        if(coords) {
            map.setCenter({lat: Number(coords.lat), lng: Number(coords.lng)})
        }
    }

    const onUnmount = (map) => {
        setMap(null)
    }

    const markerOnLoad = (marker) => {
        if(marker) {
            marker.setPosition(marker.position)
        }
    }

    const markerUnmount = () => {
        setMarker(null)
    }

    const onSelect = (e) => {
        const selectedPos = {lat: e.latLng.lat(), lng: e.latLng.lng()}
        console.log(selectedPos)
        setSelected(selectedPos)
        setMarker(selectedPos)
    }


    useEffect(() => {
        console.log(coords)
    }, [coords])

    return isLoaded ? (
        <div className="MapMarker" style={{pointerEvents: readOnly ? 'none' : 'all'}}>
            <GoogleMap
                center={{lat: Number(marker?.lat), lng: Number(marker?.lng)}}
                options={{
                    disableDefaultUI: true
                }}
                ref={mapRef}
                mapContainerStyle={{width: '100%', height: '100%'}}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onSelect}
                >
                    {
                        marker ? (
                            <Marker 
                                onLoad={markerOnLoad}
                                onUnmount={markerUnmount}
                                position={{lat: Number(marker?.lat), lng: Number(marker?.lng)}}
                                
                                />
                        ) : null
                    }
            </GoogleMap>
        </div>
    ) : <Loader/>
}

export default MapMarker;