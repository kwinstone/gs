import './OrgsPage.scss';
import BrandItem from './components/BrandItem/BrandItem';
import OrgItem from './components/OrgItem/OrgItem';
import Pl from '../../../components/Pl/Pl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import AddBrand from '../modals/addBrand/AddBrand';
import orgService from '../../../services/orgService';
import { useSelector } from 'react-redux';
import EditBrand from '../modals/editBrand/EditBrand';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { Row,Col } from 'antd';
import authService from '../../../services/dataService';
import { handleDragStart, handleDragOver, handleDrop, sortItems, handleDragEnd, handleDragLeave } from '../../../funcs/dragSort';
import {motion} from 'framer-motion';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";
import useGridType from '../../../hooks/useGridType';
import pageEnterAnimProps from '../../../funcs/pageEnterAnimProps';
import GridToggle from '../../../components/GridToggle/GridToggle';
import MiniBrand from '../../../components/MiniBrand/MiniBrand';
import MiniOrg from '../../../components/MiniOrg/MiniOrg';




const as = new authService();
const os = new orgService();

const OrgsPage = () => {
    const {brandId} = useParams()
    const {token, settings, user} = useSelector(state => state)
    const nav = useNavigate();
    const location = useLocation();
    const [list, setList] = useState([])
    const [loadList, setLoadList] = useState(false)
    const [selected, setSelected] = useState({})
    const [addBrandModal, setAddBrandModal] = useState(false)
    const [editBrandModal, setEditBrandModal] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(4)
    const [rowHeight, setRowHeight] = useState(120)
    const {gridType, setGridType} = useGridType()
    const itemBoxRef = useRef()

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
        if(list?.length > 0) {
            if(list.length % boxRow == 0) {
                setGridHeight(Math.round(list.length / boxRow) * rowHeight + rowHeight)
            } else {
                setGridHeight(Math.round(list.length / boxRow + 1) * rowHeight)
            }
            
        } else {
            setGridHeight(rowHeight)
        }
    }, [list, boxRow, rowHeight, gridType])


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

    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
      
        if(sourceIndex == list.length) {
            return;
        } else {
            const nextState = swap(list, sourceIndex, targetIndex);
            setList(nextState)
        }
    }
    

    useEffect(() => {
        
        if(token && brandId && settings?.IsHaveBrands == '1') {
            setLoadList(true)
            os.getOrgs(token, {BrandID: brandId})
                .then(res => {
                    setList(res)
                    
                })
                .finally(_ => setLoadList(false))
        }
        if(token && !brandId && settings?.IsHaveBrands == '1') {
            setLoadList(true)
            os.getBrands(token)
                .then(res => {
                    setList(res)
                    
                })
                .finally(_ => setLoadList(false))
        }
        if(token && !brandId && settings.IsHaveBrands == '0') {
            setLoadList(true)
            os.getOrgs(token)
            .then(res => {
                setList(res)
           
            })
            .finally(_ => setLoadList(false))

        }
    }, [location, token, brandId, settings])

    

    const openAddBrand = () => setAddBrandModal(true)
    const closeAddBrand = () => setAddBrandModal(false)
    const openEditBrand = (ID, ItemOrder, LogoUrl, MarkerID) => {
        const data = {
            ID,
            ItemOrder,
            LogoUrl,
            MarkerID
        }
        setSelected(data)
        setEditBrandModal(true)
    }
    const closeEditBrand = () => setEditBrandModal(false)


    useEffect(() => {
        if(brandId && token && list && list.length > 0) {
            as.orderSort(token, 'organisations', list.map(item => item.ID).join(',')).then(res => {
                
            })
        }
        if(!brandId && token && list && list.length > 0 && settings?.IsHaveBrands == '1') {
            as.orderSort(token, 'brands', list.map(item => item.ID).join(',')).then(res => {
               
            })
        }
        if(!brandId && token && list && list.length > 0 && settings?.IsHaveBrands == '0') {
            as.orderSort(token, 'organisations', list.map(item => item.ID).join(',')).then(res => {
               
            })
        }
    }, [list, brandId, token])


    const createOrg = () => {
        if(brandId) {
            const data = new FormData()
            data.append('OrganisationBrand', brandId)
            os.addOrg(token, data).then(res => {
                nav(`/organizations/${brandId}/${res}/now?p=Добавить организацию`)
            })
        } else {
            const data = new FormData()
            data.append('OrganisationBrand', 0)
            os.addOrg(token).then(res => {
               
                nav(`/organizations/nobrand/${res}/now?p=Добавить организацию`)
                
            })
        }
    }

   

    // location.pathname != '/organizations' && 
    if(location.pathname.includes('/organizations/') && settings?.IsHaveBrands == '1') {
        return (
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                exit={{opacity: 0}}

                className="OrgsPage page">
                    
            {/* <AddBrand visible={visible} close={hideModal}/> */}
            {/* Header */}
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">

                    {/* <div className="spc"></div> */}
                    <div className="OrgsPage__body pageBody-content" ref={itemBoxRef}>
                        <GridToggle
                            selectBig={() => setGridType('big')}
                            selectSmall={() => setGridType('small')}
                            />
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <motion.div
                                    {...pageEnterAnimProps}
                                    >
                                    <GridContextProvider
                                        onChange={orderChange}>
                                        <GridDropZone
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={rowHeight}
                                            >
                                            {
                                                list?.filter(item => item.Disabled == '0').map((item, index) => (
                                                    <GridItem
                                                        key={item.ID}
                                                        className={"ddd__item"}
                                                        >
                                                        {
                                                            gridType == 'big' ? (
                                                                <OrgItem {...item}/>
                                                            ) : (
                                                                <MiniOrg {...item}/> 
                                                            )
                                                        }
                                                        
                                                    </GridItem>
                                                ))
                                            }
                                            <GridItem
                                                
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl onClick={createOrg} 
                                                style={{backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px'}} 
                                                text={'Добавить ресторан'}/>
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

    

    if(settings?.IsHaveBrands == '0' && (location.pathname == '/' || location.pathname.includes('/organizations'))) {
        return (
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                exit={{opacity: 0}}

                className="OrgsPage page">
                
                {/* Header */}
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    
                    <div className="OrgsPage__body pageBody-content" ref={itemBoxRef}>
                        <GridToggle
                            selectBig={() => setGridType('big')}
                            selectSmall={() => setGridType('small')}
                            />
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                    exit={{opacity: 0}}
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
                                                        className='ddd__item'
                                                        key={item.ID}
                                                        >
                                                        {
                                                            gridType == 'big' ? (
                                                                <OrgItem {...item}/>
                                                            ) : (
                                                                <MiniOrg {...item}/>
                                                            )
                                                        }
                                                    </GridItem>
                                                ))
                                            }
                                            <GridItem
                                                
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl 
                                                onClick={createOrg}
                                                style={{backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px'}} 
                                                text={'Добавить ресторан'}
                                                />
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

    if(location.pathname == '/organizations' || (location.pathname == '/' && settings?.IsHaveBrands == '1')) {
        return (
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="OrgsPage page">
                
            <EditBrand updateList={setList} visible={editBrandModal} close={closeEditBrand} selected={selected}/>
            <AddBrand updateList={setList} visible={addBrandModal} close={closeAddBrand}/>


            {/* Header */}
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    {/* <div className="spc"></div> */}
                    <div className="OrgsPage__body pageBody-content" ref={itemBoxRef}>
                        <GridToggle
                            selectBig={() => setGridType('big')}
                            selectSmall={() => setGridType('small')}
                            />
                        {
                            loadList ? (
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
                                                        className='ddd__item'
                                                        key={item.ID}
                                                        >
                                                        {
                                                            gridType == 'big' ? (
                                                                <BrandItem 
                                                                    Disabled={item.Disabled}
                                                                    ID={item.ID}
                                                                    ItemOrder={item.ItemOrder}
                                                                    LogoUrl={item.LogoUrl}
                                                                    MarkerID={item.MarkerID}
                                                                    editModal={openEditBrand}
                                                                    />
                                                            ) : (
                                                                <MiniBrand
                                                                    Disabled={item.Disabled}
                                                                    ID={item.ID}
                                                                    ItemOrder={item.ItemOrder}
                                                                    LogoUrl={item.LogoUrl}
                                                                    MarkerID={item.MarkerID}
                                                                    editModal={openEditBrand}
                                                                    />
                                                            )
                                                        }
                                                    </GridItem>
                                                ))
                                            }
                                             <GridItem
                                                
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl 
                                                    onClick={openAddBrand} 
                                                    style={{backgroundColor: '#fff', fontSize: gridType == 'small' ? 12 : 16, lineHeight: gridType == 'small' ? '15px' : '19px'}} 
                                                    text={'Добавить бренд'}/>
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
        
}

export default OrgsPage;