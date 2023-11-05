import { Row, Col } from "antd";
import Pl from "../../components/Pl/Pl";
import StorieItem from "./components/StorieItem/StorieItem";
import Settings from "./components/Settings/Settings";
import AddStorie from "./modals/addStorie/AddStorie";
import { useState, useEffect, useRef, useCallback } from "react";
import Loader from "../../components/Loader/Loader";
import {motion} from 'framer-motion';
import stService from "../../services/stService";
import { useSelector } from "react-redux";
import GridToggle from "../../components/GridToggle/GridToggle";
import pageEnterAnimProps from "../../funcs/pageEnterAnimProps";
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";
import useGridType from "../../hooks/useGridType";
import authService from "../../services/dataService";
import MiniStorie from "../../components/MiniStorie/MiniStorie";
import orgService from "../../services/orgService";

const os = new orgService();
const st = new stService();
const as = new authService();


const StoriesPage = () => {
    const {token} = useSelector(state => state)
    const [addStorie, setAddStorie] = useState(false);
    const [selectedStorie, setSelectedStorie] = useState(null)
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false)
    const [startShow, setStartShow] = useState(false)
    const [startSelected, setStartSelected] = useState(null)

    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(5)
    const [rowHeight, setRowHeight] = useState(150)
    const itemBoxRef = useRef()
    const {gridType, setGridType} = useGridType()

    const [orgs, setOrgs] = useState([])

   

    const updateList = () => {
        setLoad(true)
        st.getStories(token).then(res => {
            setList(res.filter(item => item.Disabled == '0'))
        }).finally(_ => setLoad(false))
    }

    const getBoxWidth = useCallback(() => {
        if(itemBoxRef?.current) {
            if(gridType == 'small') {
                setBoxRows(Math.round((itemBoxRef.current.scrollWidth - 80) / 120))
            }
            if(gridType == 'big') {
                setBoxRows(Math.round((itemBoxRef.current.scrollWidth - 80) / 260))
            }
            
        }
    }, [gridType])

    useEffect(() => {
        if(list?.length > 0 && boxRow) {
            if(list.length % boxRow == 0) {
                setGridHeight(Math.round(list.length / boxRow) * rowHeight + rowHeight)
            } else {
                setGridHeight(Math.round(list.length / boxRow + 1) * rowHeight)
            }
        } else {
            setGridHeight(rowHeight)
        }
    }, [list, boxRow, gridType, rowHeight])

    useEffect(() => {
        if(gridType == 'big') {
            setRowHeight(280)
        } else {
            setRowHeight(110)
        }
        getBoxWidth()
        window.addEventListener('resize', getBoxWidth)
        return () => window.removeEventListener('resize', getBoxWidth)
    }, [gridType])

    useEffect(() => {
        if(token && list && list.length > 0) {
            as.orderSort(token, 'stories', list.map(item => item.ID).join(','))
        }
    }, [token, list])

    useEffect(() => { 
        if(token) {
            os.getOrgs(token).then(res => {
                setOrgs(res?.filter(item => item.Disabled == '0').map(item => {
                    return {
                        value: item.Name,
                        ID: item.ID
                    }
                }))
            })
            updateList();
        }
    }, [token])

    

    const openAddStorie = () => {
        setAddStorie(true)
    }

    const closeAddStorie = () => {
        setAddStorie(false)
        setSelectedStorie(null)
    }



    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if(sourceIndex == list.length) {
            return;
        } else {
            const nextState = swap(list, sourceIndex, targetIndex);
            setList(nextState)
        }
    }

    useEffect(() => {
        if(!startShow) setStartSelected(null)
    }, [startShow])

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="StoriesPage page">
           
            <AddStorie
                updateList={updateList} 
                orgs={orgs} 
                data={selectedStorie} 
                visible={addStorie} 
                close={closeAddStorie}/>
            <main className="Main">
                <div className="pageBody">
                    <div className="StoriesPage__body pageBody-content">
                        <GridToggle
                            selectBig={() => setGridType('big')}
                            selectSmall={() => setGridType('small')}
                            />
                        <Row gutter={[40, 0]}>
                            <Col span={14} ref={itemBoxRef}>
                                {
                                    load ? (
                                        <Loader/>
                                    ) : (
                                        <motion.div
                                            {...pageEnterAnimProps}
                                            >
                                            <GridContextProvider
                                                onChange={orderChange}
                                                >
                                                <GridDropZone
                                                    boxesPerRow={boxRow}
                                                    style={{height: gridHeight}}
                                                    rowHeight={rowHeight}
                                                    >
                                                    {
                                                        list?.filter(item => item.Disabled == '0').map((item, index) => (
                                                            <GridItem 
                                                                key={item.ID} 
                                                                className={"ddd__item"}>
                                                                {
                                                                    gridType == 'big' ? (
                                                                        <StorieItem
                                                                        selected={index == 2}
                                                                        startShow={startShow}
                                                                        openStorie={openAddStorie}
                                                                        selectStorie={setSelectedStorie}
                                                                        setStartSelected={setStartSelected}
                                                                        startSelected={startSelected}
                                                                        data={item}
                                                                        />
                                                                    ) : (
                                                                        <MiniStorie 
                                                                            openStorie={openAddStorie}
                                                                            selectStorie={setSelectedStorie}
                                                                            data={item}
                                                                            />
                                                                    )
                                                                }
                                                                
                                                            </GridItem>
                                                        ))
                                                    }
                                                    <GridItem
                                                        className="ddd__item ddd__item-ds"
                                                        >
                                                        <Pl onClick={openAddStorie} text={'Добавить сториз'} style={{backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px', height: '100%'}}/>
                                                    </GridItem>
                                                </GridDropZone>
                                            </GridContextProvider>
                                        </motion.div>
                                    )
                                }
                                
                            </Col>
                            <Col span={10}>
                                <Settings
                                    list={list}
                                    setStartSelected={setStartSelected}
                                    startSelected={startSelected}
                                    setStartShow={setStartShow}
                                    startShow={startShow}
                                    />
                            </Col>
                        </Row>
                        
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default StoriesPage;