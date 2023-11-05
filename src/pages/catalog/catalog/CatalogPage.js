import './CatalogPage.scss';
import CatItem from './components/CatItem/CatItem';
import Pl from '../../../components/Pl/Pl';
import CreateCategory from '../modals/createCategory/CreateCategory';
import { useSelector } from 'react-redux';
import { useEffect, useCallback, useState, useMemo } from 'react';
import catService from '../../../services/catService';
import Loader from '../../../components/Loader/Loader';
import {motion} from 'framer-motion';
import GridToggle from '../../../components/GridToggle/GridToggle';
import authService from '../../../services/dataService';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";
import useGridType from '../../../hooks/useGridType';
import { useRef } from 'react';
import pageEnterAnimProps from '../../../funcs/pageEnterAnimProps';
import MiniCat from '../../../components/MiniCat/MiniCat';


const as = new authService()
const cs = new catService()





const CatalogPage = () => {
    const {token} = useSelector(state => state)
    const [createCategory, setCreateCategory] = useState(false);
    const [cats, setCats] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCat, setSelectedCat] = useState(null)
    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(5)
    const [rowHeight, setRowHeight] = useState(150)
    const itemBoxRef = useRef()
    const {gridType, setGridType} = useGridType()

    const url = useMemo(() => {
        return new URLSearchParams(window.location.search)
    }, [window.location.search])


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
        if(cats?.length > 0 && boxRow) {
            if(cats.length % boxRow == 0) {
                setGridHeight(Math.round(cats.length / boxRow) * rowHeight + rowHeight)
            } else {
                setGridHeight(Math.round(cats.length / boxRow + 1) * rowHeight)
            }
        } else {
            setGridHeight(rowHeight)
        }

    }, [cats, boxRow, gridType, rowHeight])

    
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
        if(token) {
            setLoad(true)
            if(url.get('org')) {
                cs.getCats(token, {OrganisationID: url.get('org')}).then(res => {
                    setCats(res);
                 
                }).finally(_ => setLoad(false))
            } else {
                cs.getCats(token, {OrganisationID: 0}).then(res => {
                    setCats(res);
             
                }).finally(_ => setLoad(false))
            }
            
        }
    }, [token, url])

    const editCategory = (obj) => {
        setSelectedCat(obj)
        setCreateCategory(true)
    }



    useEffect(() => {
        if(token && cats && cats.length > 0) {
            as.orderSort(token, 'categories', cats.map(item => item.ID).join(','))
        }
    }, [token, cats])


    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if(sourceIndex == cats.length) {
            return;
        } else {
            const nextState = swap(cats, sourceIndex, targetIndex);
            setCats(nextState)
        }
    }




    

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="CatalogPage page">
            <CreateCategory 
                setSelectedCat={setSelectedCat} 
                editItem={selectedCat} 
                updateList={setCats} 
                visible={createCategory} 
                close={() => setCreateCategory(false)}/>
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    <div className="CatalogPage__body pageBody-content" ref={itemBoxRef}>
                        <GridToggle
                            selectBig={() => setGridType('big')}
                            selectSmall={() => setGridType('small')}
                            />
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
                                            
                                            // className='ddd'
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={rowHeight}
                                            >
                                            {
                                                cats?.filter(item => item.Disabled == '0').map((item, index)=> (
                                                    <GridItem 
                                                        key={item.ID} 
                                                        className={"ddd__item"}>
                                                        {
                                                            gridType == 'big' ? (
                                                                <CatItem
                                                                {...item}
                                                                Link={`/catalog/${item.ID}?p=${url.get('p')}&p=${item.Name}`}
                                                                selectEdit={editCategory}/>
                                                            ) : (
                                                                <MiniCat
                                                                    {...item}
                                                                    Link={`/catalog/${item.ID}?p=${url.get('p')}&p=${item.Name}`}
                                                                    selectEdit={editCategory}
                                                                    />
                                                            )
                                                        }
                                                        
                                                    </GridItem>
                                                ))
                                            }
                                            <GridItem
                                                
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl onClick={() => setCreateCategory(true)} text={'Добавить категорию'} style={{backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px'}}/>
                                            </GridItem>
                                            
                                        </GridDropZone>
                                    </GridContextProvider>
                                </motion.div>
                                
                                
                                    

                            )
                        }
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default CatalogPage;