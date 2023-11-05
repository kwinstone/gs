import { useState, useEffect, useRef } from "react";

const currentLocSuccess = (e, setCurrentLoc) => {
    setCurrentLoc({lat: e.coords.latitude, lng: e.coords.longitude})
}

const currentLocError = (e, setCurrentLoc) => {
    setCurrentLoc({lat: 53.12345678, lng: 43.12345678})
}


const Map = ({setSelected, coords, readOnly}) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    const [point, setPoint] = useState();
    const [currentLoc, setCurrentLoc] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => currentLocSuccess(pos, setCurrentLoc), (err) => currentLocError(err, setCurrentLoc))
    }, [])



    useEffect(() => {
        if (ref.current && !map && !point && !coords && currentLoc) {
            setMap(new window.google.maps.Map(
                ref.current, 
                {
                    center: {...currentLoc}, 
                    zoom: 13,
                    disableDefaultUI:true
                } 
            ));   
            setPoint(new window.google.maps.Marker())
        }
        if(ref.current && !map && !point && coords) {
            setMap(new window.google.maps.Map(
                ref.current, 
                {
                    center: {...coords}, 
                    zoom: 13,
                    disableDefaultUI:true
                } 
            ));   
            setPoint(new window.google.maps.Marker({position: {...coords}}))
        }

      }, [ref, map, point, coords, currentLoc]);
    
    useEffect(() => {
        if(map) {
            point.setOptions({position: {...coords},map})
            map.setOptions({center: {...coords}, zoom: 13})
            if(setSelected) {
                map.addListener('click', (e) => {
                    setSelected([e.latLng.lat(), e.latLng.lng()])
                    point.setOptions({position: e.latLng, map})
                    // map.setOptions({center: e.latLng, zoom: 8})
                })
            }
            
        }
    }, [map, coords])

    return (
        <div ref={ref} style={{height: '100%', width: '100%', pointerEvents: (readOnly ? 'none' : 'all')}}>
        </div>
    )
}

export default Map;