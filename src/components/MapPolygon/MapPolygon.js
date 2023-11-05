import './MapPolygon.scss';
import { 
    GoogleMap, 
    Polygon ,
    DrawingManager,
    useLoadScript
} from "@react-google-maps/api";
import Loader from '../Loader/Loader';
import { useState, useRef, useEffect, useCallback } from "react";
import {BsTrash} from 'react-icons/bs';



let libs = ['drawing']
const MapPolygon = ({
    center,
    polygonCoords,
    setSelected,
    readOnly,
    id,
    color,
}) => {
    useEffect(() => {
        console.log(polygonCoords)
    }, [polygonCoords])
    const {isLoaded} = useLoadScript({
        id: id,
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libs,
    })
    const mapRef = useRef(null)
    const polyRef = useRef(null)
    const [map, setMap] = useState(null)
    const [initPoly, setInitPoly] = useState()
    const [lc, setLc] = useState(0)


  

    const onLoad = (map) => {
        if(polygonCoords) {
            window.google.maps.Polygon.prototype.getBoundingBox = function() {
                var bounds = new window.google.maps.LatLngBounds();
                this.getPath().forEach(function(element,index) {
                  bounds.extend(element)
                });
                
                return(bounds);
            };
         
            
            const pol = new window.google.maps.Polygon({paths: polygonCoords})
            map.setCenter(pol.getBoundingBox().getCenter())
            map.fitBounds(pol.getBoundingBox())
            
            setMap(map)
        } 
        if(!polygonCoords) {
            if(center) {
                map.setCenter(center)
                setMap(map)
            }
        }
    } 

    const onUnmount = useCallback((map) => {
        setMap(null)
    }, [])

    const clearDrawing = (e) => {
        e.overlay.setMap(null)
    }

    const getPolygon = (e) => {
        setInitPoly(e.getPath().getArray())
        setSelected(e.getPath().getArray())
    }

    const deleteDrawn = () => {
        setInitPoly(null)
        setSelected(null)
    }

    const polyUnmount = (poly) => {
        setInitPoly(null)
    }

    const polyLoad = (poly) => {
        window.google.maps.Polygon.prototype.getBoundingBox = function() {
            var bounds = new window.google.maps.LatLngBounds();
            this.getPath().forEach(function(element,index) {
              bounds.extend(element)
            });
          
            return(bounds);
        };
        map.setCenter(poly.getBoundingBox().getCenter())
            map.fitBounds(poly.getBoundingBox())
            setMap(map)
        
    }
    

    useEffect(() => {
        if(polygonCoords) {
            setInitPoly(polygonCoords)
        } else {
            setInitPoly(null)
        }
    }, [polygonCoords])


    const changePoly = (e) => {
        setSelected([...polyRef.current.state.polygon.getPath().getArray()])
    }



    return isLoaded ? (
        <div className="MapPolygon" style={{pointerEvents: readOnly ? 'none' : 'all'}}>
            {
                !readOnly ? (
                    <button disabled={!initPoly} type='button' onClick={deleteDrawn} className="MapPolygon__delete">
                        <BsTrash/>
                    </button>
                ) : null
            }
           
            <GoogleMap
                options={{
                    disableDefaultUI: true,
                    fullscreenControl: true
                }}
                ref={mapRef}
                mapContainerStyle={{width: '100%', height: '100%'}}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                >   
                {
                    initPoly ? (
                        <Polygon 
                            onUnmount={polyUnmount}
                            onLoad={polyLoad} 
                            ref={polyRef}
                            onMouseUp={changePoly}
                            editable={!readOnly ? true: false}
                            draggable={!readOnly ? true : false}
                            options={{
                                strokeColor : '#' + color?.slice(1, color.length),
                                fillColor: '#' + color?.slice(1, color.length)
                            }}
                            path={initPoly}/>
                    ) : (
                        
                        <DrawingManager
                        onPolygonComplete={getPolygon}
                        onOverlayComplete={clearDrawing}
                        drawingMode={'polygon'}
                        options={{    
                            polygonOptions: {
                                strokeColor: '#' + color?.slice(1, color.length),
                                fillColor: '#' + color?.slice(1, color.length)
                            },
                            drawingControlOptions: {
                                position: 10.0,
                                drawingModes: [
                                    'polygon'
                                ],
                            }
                        }}
                    /> 
                    )
                }
            </GoogleMap> 
        </div>
    ) : (
        <Loader/>
    )
}

export default MapPolygon;