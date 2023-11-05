import './CatalogCategoryPage.scss';
import CatCard from './components/CatCard/CatCard';
import Pl from '../../../components/Pl/Pl';
import { useState, useEffect } from 'react';
import CreateSubcategory from '../modals/createSubcategory/CreateSubcategory';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import catService from '../../../services/catService';
import Loader from '../../../components/Loader/Loader';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../../funcs/pageEnterAnimProps';
import authService from '../../../services/dataService';
import SubCard from './components/SubCard/SubCard';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";
import MiniPlate from './components/MiniPlate/MiniPlate';
import { useRef } from 'react';
import GridToggle from '../../../components/GridToggle/GridToggle';
import useGridType from '../../../hooks/useGridType';
import { useCallback } from 'react';
import MiniSub from '../../../components/MiniSub/MiniSub';

const as = new authService();
const cs = new catService();

const CatalogCategoryPage = () => {
    const {token} = useSelector(state => state)
    const {categoryId, subcategoryId} = useParams()
    const nav = useNavigate();
    const [createSubcategory, setCreateSubcategory] = useState(false);
    const [selectedSubcat, setSelectedSubcat] = useState(null)
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false)
    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(10)
    const [rowHeight, setRowHeight] = useState(150)
    const itemBoxRef = useRef()

    const {gridType, setGridType} = useGridType()

  

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
        if(gridType == 'big') {
            setRowHeight(280)
        } else {
            setRowHeight(170)
        }
        getBoxWidth()
        window.addEventListener('resize', getBoxWidth)
        return () => window.removeEventListener('resize', getBoxWidth)
    }, [gridType])

    const url = new URLSearchParams(window.location.search)
    
    const toCreatePlate = () => {
        let data = new FormData()
        data.append('ParentID', subcategoryId ? subcategoryId : 0)
        data.append('CategoryID', categoryId)

        cs.addProd(token, data).then(res => {
            
            if(subcategoryId) {
                nav(`/catalog/${categoryId}/${subcategoryId}/editPlate/${res}/now?p=Создать блюдо`)
            } else {
                nav(`/catalog/${categoryId}/editPlate/${res}/now?p=Создать блюдо`)
            }
        })
    }

    const toEditPlate = (id, name) => {
        nav(`/catalog/${categoryId}/editPlate/${id}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${name}`)
    }


    useEffect(() => {
        if(token && categoryId && !subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == '0'))
                
            }).finally(_ => setLoad(false))
        }
        if(token && categoryId && subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == subcategoryId))
            }).finally(_ => {
                setLoad(false)
            })
        }
    }, [token, categoryId, subcategoryId])

    const updateList = () => {
        if(!subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == '0'))
            }).finally(_ => setLoad(false))
        }
        if(subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == subcategoryId))
            }).finally(_ => {
                setLoad(false)
            })
        }
    }

    const editSubcat = ({...item}) => {
        setSelectedSubcat(item)
        setCreateSubcategory(true)
    }

    const closeSubcategoryModal = () => {
        setCreateSubcategory(false)
        setSelectedSubcat(null)
    }

    useEffect(() => {
        if(token && list && list.length > 0) {
            as.orderSort(token, 'products', list.map(item => item.ID).join(',')).then(res => {
            })
        }
    }, [list, token])

    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if(sourceIndex == list.length) {
            return;
        } else {
            const nextState = swap(list, sourceIndex, targetIndex);
            setList(nextState)
        }
    }

    useEffect(() => {
        if(list?.length > 0) {
            if(list.length % boxRow == 0) {
                setGridHeight(Math.round(list.length / boxRow) * rowHeight + rowHeight)
            } else {
                setGridHeight(Math.round(list.length / boxRow + 1) * rowHeight)
            }
            
        } else {
            setGridHeight(280)
        }
    }, [list, boxRow, gridType, rowHeight])

    useEffect(() => {
        console.log(list?.filter(i => i.IsSubCategory))
    }, [list])

    return (
        <motion.div
            {...pageEnterAnimProps}
            
            className="CatalogCategoryPage page">

                <CreateSubcategory
                data={selectedSubcat} 
                visible={createSubcategory} 
                close={closeSubcategoryModal} 
                update={updateList}/>
                <main className="Main">
                <div className="pageBody">
                    <div className="CatalogCategoryPage__body pageBody-content" ref={itemBoxRef}>
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
                                           
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={rowHeight}
                                            >
                                            {
                                                list?.filter(item => item.Disabled == '0').map((item, index) => {
                                                    if(item.IsSubCategory == '1')  {
                                                        return (
                                                            <GridItem
                                                                key={item.ID}
                                                                className={'ddd__item'}
                                                                >
                                                                {
                                                                    gridType == 'small' ? (
                                                                        <MiniSub
                                                                            Link={`/catalog/${categoryId}/${item.ID}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${item.Name}`}
                                                                            data={item}
                                                                            selectEdit={editSubcat}
                                                                            />
                                                                    ) : (
                                                                        <SubCard
                                                                            Link={`/catalog/${categoryId}/${item.ID}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${item.Name}`}
                                                                            data={item}
                                                                            selectEdit={editSubcat}
                                                                            />
                                                                    )
                                                                }
                                                                
                                                            </GridItem>
                                                        )
                                                    } else {
                                                        return (
                                                            
                                                            <GridItem
                                                                key={item.ID}
                                                                className={'ddd__item'}
                                                                >
                                                                
                                                                {
                                                                    gridType == 'small' ? (
                                                                        <MiniPlate editPlate={toEditPlate} {...item}/>
                                                                    ) : (
                                                                        <CatCard editPlate={toEditPlate} {...item}/>
                                                                    )
                                                                }
                                                            </GridItem>
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                            <GridItem 
                                                className='ddd__item ddd__item-ds CatalogCategoryPage__body_list_add'>
                                                <Pl 
                                                    onClick={toCreatePlate} 
                                                    style={{height: '49%', backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px'}} text={'Добавить блюдо'}/>
                                                <Pl 
                                                    onClick={() => setCreateSubcategory(true)} 
                                                    style={{height: '49%', backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px'}} text={'Добавить подкатегорию'}/>
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

export default CatalogCategoryPage;