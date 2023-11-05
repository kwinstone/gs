import { useState, useEffect, useRef } from "react";


const currentLocSuccess = (e, setCurrentLoc) => {
    setCurrentLoc({lat: e.coords.latitude, lng: e.coords.longitude})
}

const currentLocError = (e, setCurrentLoc) => {
    setCurrentLoc({lat: 53.12345678, lng: 43.12345678})
}


const getAvLat = (array) => {
    const tr = array.map(item => item.lat)
    const sum = tr.reduce((acc, number) => acc + number, 0)
    const length = tr.length;
    return sum / length;
} 

const getAvLng = (array) => {
    const tr = array.map(item => item.lng)
    const sum = tr.reduce((acc, number) => acc + number, 0)
    const length = tr.length;
    return sum / length;
} 



const PolyMap = ({setSelected, readOnly, polyCoords}) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    const [currentLoc, setCurrentLoc] = useState(null)
    const [poly, setPoly] = useState()
    const [draw, setDraw] = useState();


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => currentLocSuccess(pos, setCurrentLoc), (err) => currentLocError(err, setCurrentLoc))
    }, [])

    useEffect(() => {
        console.log(polyCoords)
    }, [polyCoords])

    useEffect(() => {
        if (!draw && ref.current && !map && !poly && !polyCoords && window?.google?.maps) {
            setMap(new window.google.maps.Map(
                ref.current, 
                {
                    center: {lat: 24.886, lng: -70.268 }, 
                    zoom: 13, 
                    disableDefaultUI:true,
                } 
            ));   
            const triangleCoords = [
                { lat: 25.774, lng: -80.19 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.321, lng: -64.757 },
              ];
            setPoly(new window.google.maps.Polygon({
                path: triangleCoords,
                editable: true,
                draggable: true,
                strokeColor : '#FD3F3E',
                fillColor: '#F09797'
            }))


            // setDraw(new window.google.maps.drawing.DrawingManager({
            //     drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
            //     drawingControl: true,
            // }))
            
        }
        if(!draw && ref.current && !map && !poly && polyCoords && window?.google?.maps) {
            setMap(new window.google.maps.Map(
                ref.current, 
                {
                    center: {
                        lat: polyCoords[0].lat, 
                        lng: polyCoords[0].lng
                    }, 
                    zoom: 13, 
                    disableDefaultUI:true
                } 
            ));   
            setPoly(new window.google.maps.Polygon({
                path: polyCoords,
                editable: true,
                draggable: true,
                strokeColor : '#FD3F3E',
                fillColor: '#F09797'
            }))
            // setDraw(new window.google.maps.drawing.DrawingManager({
            //     drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
            //     drawingControl: true,
            // }))
        }
      }, [ref, map, polyCoords, poly, window?.google?.maps]);
    
    useEffect(() => {
        if(map && poly && polyCoords) {
            poly.setPath(polyCoords)
            map.setOptions({center: { 
                lat: poly.getPath().getArray()[0].lat(), 
                lng: poly.getPath().getArray()[0].lng()
            }, zoom: 13})
            poly.setMap(map)
            // draw.setMap(map)
            if(setSelected) {
                poly.addListener('mouseup', (e) => {
                    const arr = poly.getPath()
                    setSelected(arr.getArray())
                })
            }
            
        }
    }, [map, poly, polyCoords, draw])

    return (
        <div ref={ref} style={{height: '100%', width: '100%', pointerEvents: (readOnly ? 'none' : 'all')}}>
        </div>
    )
}

export default PolyMap;