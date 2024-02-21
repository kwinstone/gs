import { Route, Routes } from "react-router-dom";
import {Helmet} from "react-helmet";
//pages
import AuthPage from "../pages/auth/AuthPage";
import OrgsPage from "../pages/orgs/orgs/OrgsPage";
import OrgsCreatePage from "../pages/orgs/orgsCreate/OrgsCreatePage";
import Notfound from "../pages/notfound/Notfound";
import CatalogPage from "../pages/catalog/catalog/CatalogPage";
import CatalogCategoryPage from "../pages/catalog/catalogCategory/CatalogCategoryPage";
import CreatePlatePage from "../pages/catalog/createPlate/CreatePlatePage";
import StoriesPage from "../pages/stories/StoriesPage";
import ClientsPage from "../pages/clients/ClientsPage";
import OrdersPage from "../pages/orders/OrdersPage";
import StatPage from "../pages/stat/StatPage";
import BasketPage from "../pages/basket/BasketPage";
import IntegrPage from "../pages/integr/IntegrPage";
import SettingsPage from "../pages/settings/SettingsPage";
import CheckAuth from "../hoc/ChekAuth";
import EditPlatePage from "../pages/catalog/createPlate/EditPlatePage";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderProfile from "../components/HeaderProfile/HeaderProfile";
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";
import OrgsNewPage from "../pages/orgs/orgsCreate/OrgsNewPage";
import { useEffect } from "react";
import EditPlateNew from "../pages/catalog/createPlate/EditPlateNew";
import RatesetPage from "../pages/rateset/RatesetPage";
import RevsPage from "../pages/revs/RevsPage";
import ReservPage from "../pages/reserv/ReservPage";
import TrashPage from "../pages/trash/TrashPage";
import checkDomain from "../funcs/checkDomain";
import CheckRole from "../hoc/CheckRole";
import StoriesPageYm from "../pages/stories-yam/StoriesPage";
import AddClientPage from "../pages/clients/AddClient";
import {RootPage as SitesModule} from "../modules/Sites/containers/RootPage";


const App = () => {
    const loc = useLocation()

    useEffect(() => {
        checkDomain()
    }, [])

    return (
        <>
            <Helmet>
                {/* <link rel="icon" href={window.location.origin === 'https://bao.gscore.ru' ? "%PUBLIC_URL%/logo-bao.png" : "%PUBLIC_URL%/logo.png"} /> */}
                {window?.location?.origin === 'https://bao.gscore.ru' && (
                    <link rel="icon" href={window?.location.origin + `/logo-bao.png`} />
                )}
                {window?.location?.origin !== 'https://bao.gscore.ru' && (
                    <link rel="icon" href={window.location.origin + '/logo.png'}/>
                )}
            </Helmet>
            {
                loc.pathname == '/auth' ? (
                    <Header/>
                ) : (
                    <HeaderProfile/>
                )
            }
            {
                loc.pathname != '/auth' ? (
                    <Sidebar updateCat/>
                ) : null
            }
            <Routes>
                <Route path="/" element={<CheckAuth><CheckRole><OrgsPage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations" element={<CheckAuth><CheckRole><OrgsPage/></CheckRole></CheckAuth>}/>
                <Route path="/reservations" element={<CheckAuth><CheckRole><ReservPage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog" element={<CheckAuth><CheckRole><CatalogPage/></CheckRole></CheckAuth>}/>

                <Route path="/site/*" element={<SitesModule />} />

                
                <Route path="/statistic" element={<CheckAuth><CheckRole><StatPage/></CheckRole></CheckAuth>}/>
                <Route path="/basket" element={<CheckAuth><CheckRole><BasketPage/></CheckRole></CheckAuth>}/>
                <Route path="/integr" element={<CheckAuth><CheckRole><IntegrPage/></CheckRole></CheckAuth>}/>
                <Route path="/allsettings" element={<CheckAuth><CheckRole><SettingsPage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/createPlate" element={<CheckAuth><CheckRole><CreatePlatePage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId/createPlate" element={<CheckAuth><CheckRole><CreatePlatePage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/editPlate/:plateId" element={<CheckAuth><CheckRole><EditPlatePage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/editPlate/:plateId/now" element={<CheckAuth><CheckRole><EditPlateNew/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId/editPlate/:plateId" element={<CheckAuth><CheckRole><EditPlatePage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId/editPlate/:plateId/now" element={<CheckAuth><CheckRole><EditPlateNew/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId" element={<CheckAuth><CheckRole><CatalogCategoryPage/></CheckRole></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId" element={<CheckAuth><CheckRole><CatalogCategoryPage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations/:brandId" element={<CheckAuth><CheckRole><OrgsPage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations/:brandId/create" element={<CheckAuth><CheckRole><OrgsCreatePage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations/:brandId/:orgId" element={<CheckAuth><CheckRole><OrgsCreatePage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations/:brandId/:orgId/now" element={<CheckAuth><CheckRole><OrgsNewPage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations/create" element={<CheckAuth><CheckRole><OrgsCreatePage/></CheckRole></CheckAuth>}/>
                <Route path="/organizations/edit" element={<CheckAuth><CheckRole><OrgsCreatePage/></CheckRole></CheckAuth>}/>
                <Route path="/ratingSettings" element={<CheckAuth><CheckRole><RatesetPage/></CheckRole></CheckAuth>}/>
                
                <Route path="/trash" element={<CheckAuth><CheckRole><TrashPage/></CheckRole></CheckAuth>}/>

                <Route path="/revs" element={<CheckAuth><RevsPage/></CheckAuth>}/>
                <Route path="/clients" element={<CheckAuth><ClientsPage/></CheckAuth>}/>
                <Route path="/clients/create" element={<CheckAuth><AddClientPage /></CheckAuth>}/>
                <Route path="/orders" element={<CheckAuth><OrdersPage/></CheckAuth>}/>
                <Route path="*" element={<CheckAuth><Notfound/></CheckAuth>}/>
                <Route path="/auth" element={<AuthPage/>}/>


                <Route path="/stories" element={<CheckAuth><CheckRole><StoriesPage/></CheckRole></CheckAuth>}/>
                <Route path="/stories-ym" element={<CheckAuth><StoriesPageYm/></CheckAuth>}/>
            </Routes>
        </>
        
    )
}

export default App;