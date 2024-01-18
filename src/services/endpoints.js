export const BASE_DOMAIN = `${process.env.REACT_APP_HOST}/NewAdminPanel`;


const endpoints = {
    // banners
    getBanners: `${BASE_DOMAIN}/settings/getBanners`,
    addBanners: `${BASE_DOMAIN}/settings/addBanner`,
    removeBanners: `${BASE_DOMAIN}/settings/deleteBanner`,

    //порядок

    // авторизация
    auth: `${BASE_DOMAIN}/auth/authorization`,

    //организации
    getBrands: `${BASE_DOMAIN}/organisation/getBrands`,
    addBrand: `${BASE_DOMAIN}/organisation/addBrand`,
    updateBrand: `${BASE_DOMAIN}/organisation/updateBrand`,
    deleteBrand: `${BASE_DOMAIN}/organisation/deleteBrand`,
    getOrgs: `${BASE_DOMAIN}/organisation/getOrganisations`,
    addOrg: `${BASE_DOMAIN}/organisation/addOrganisation`,
    updateOrg: `${BASE_DOMAIN}/organisation/updateOrganisation`,
    deleteOrg: `${BASE_DOMAIN}/organisation/deleteOrganisation`,
    getPols: `${BASE_DOMAIN}/organisation/polygons`,
    addPol: `${BASE_DOMAIN}/organisation/addPolygon`,
    editPol: `${BASE_DOMAIN}/organisation/editPolygon`,
    deletePol: `${BASE_DOMAIN}/organisation/deletePolygon`,
    getPay: `${BASE_DOMAIN}/organisation/payments`,
    addPay: `${BASE_DOMAIN}/organisation/addPayments`,
    editPay: `${BASE_DOMAIN}/organisation/editPayment`,
    deletePay: `${BASE_DOMAIN}/organisation/deletePayment`,
    getPayList: `${BASE_DOMAIN}/organisation/getPaymentTypeIIKO`,

    //каталог
    addPlateImg: `${BASE_DOMAIN}/catalog/addPlateImage`,
    deletePlateImg: `${BASE_DOMAIN}/catalog/deleteImage`,

    getCats: `${BASE_DOMAIN}/catalog/categoryes`,
    addCat: `${BASE_DOMAIN}/catalog/addCategory`,
    editCat: `${BASE_DOMAIN}/catalog/editCategory`,
    delCat: `${BASE_DOMAIN}/catalog/deleteCategory`,
    getProds: `${BASE_DOMAIN}/catalog/products`,
    addProd: `${BASE_DOMAIN}/catalog/addProduct`,
    editProd: `${BASE_DOMAIN}/catalog/editProduct`,
    delProd: `${BASE_DOMAIN}/catalog/deleteProduct`,

    getMods: `${BASE_DOMAIN}/catalog/modificators`,
    addMod: `${BASE_DOMAIN}/catalog/addModificators`,
    editMod: `${BASE_DOMAIN}/catalog/editModificators`,
    deleteMod: `${BASE_DOMAIN}/catalog/deleteModificators`,

    getAg: `${BASE_DOMAIN}/catalog/allergens`,
    addAg: `${BASE_DOMAIN}/catalog/addAllergen`,
    editAg: `${BASE_DOMAIN}/catalog/editAllergen`,
    deleteAg: `${BASE_DOMAIN}/catalog/deleteAllergen`,

    getRec: `${BASE_DOMAIN}/catalog/recommendations`,
    addRec: `${BASE_DOMAIN}/catalog/addRecommendation`,
    editRec: `${BASE_DOMAIN}/catalog/editRecommendation`,
    deleteRec: `${BASE_DOMAIN}/catalog/deleteRecommendation`,

    getPriceMass: `${BASE_DOMAIN}/catalog/prices`,
    addPriceMass: `${BASE_DOMAIN}/catalog/addPrice`,
    editPriceMass: `${BASE_DOMAIN}/catalog/editPrice`,
    deletePriceMass: `${BASE_DOMAIN}/catalog/deletePrice`,

    getSizes: `${BASE_DOMAIN}/catalog/sizes`,
    addSize: `${BASE_DOMAIN}/catalog/addSize`,
    deleteSize: `${BASE_DOMAIN}/catalog/deleteSize`,
    editSize: `${BASE_DOMAIN}/catalog/editSize`,

    changeTimeItems: `${BASE_DOMAIN}/catalog/changeTimeItems`,


    //integration settings
    getIntSettings: `${BASE_DOMAIN}/catalog/integrationSettings`,
    editIntSettings: `${BASE_DOMAIN}/catalog/editIntegrationSettings`,
    startIntegr: `${BASE_DOMAIN}/integration/startIntegration`,



    //analytics
    getOrders: `${BASE_DOMAIN}/analytics/getOrders`,
    getStatuses: `${BASE_DOMAIN}/analytics/getStatuses`,
    getUsers: `${BASE_DOMAIN}/analytics/getUsers`,
    sendMailToUsers: `${BASE_DOMAIN}/analytics/sendMailToUsers`,
    sendMailToAllUsers: `${BASE_DOMAIN}/analytics/sendMailToAllUsers`,
    sendPushToUsers: `${BASE_DOMAIN}/analytics/sendPushToUsers`,
    sendPushToAllUsers: `${BASE_DOMAIN}/analytics/sendPushToAllUsers`,
    editOrderStatus: `${BASE_DOMAIN}/analytics/editOrderStatus`,
    editOrderPaidStatus: `${BASE_DOMAIN}/analytics/editOrderPaidStatus`,
    setPersonalSale: `${BASE_DOMAIN}/analytics/setPersonalSale`,
    deletePersonalSale: `${BASE_DOMAIN}/analytics/removePersonalSale`,
    editUserData: `${BASE_DOMAIN}/analytics/editUser`,
    getCities: `${BASE_DOMAIN}/analytics/getCityList`,
    //stories
    getStories: `${BASE_DOMAIN}/stories/stories`,
    addStories: `${BASE_DOMAIN}/stories/addStory`,
    editStories: `${BASE_DOMAIN}/stories/editStory`,
    deleteStories: `${BASE_DOMAIN}/stories/deleteStory`,
    addStoryImage: `${BASE_DOMAIN}/stories/addStoryImage`,
    deleteStoryImage: `${BASE_DOMAIN}/stories/deleteStoryImage`,
    getStorieSettings: `${BASE_DOMAIN}/stories/storiesSettings`,
    editStorieSettings: `${BASE_DOMAIN}/stories/editStoriesSettings`,

    storiesCreateAndEdit: `${BASE_DOMAIN}/stories/saveStory`,


    //basket settings
    getBasketSettings: `${BASE_DOMAIN}/settings/cartSettings`,
    editBasketSettings: `${BASE_DOMAIN}/settings/editCartSettings`,
    // getProdsNames: `${BASE_DOMAIN}/`
    

    //all settings
    getMainSettings: `${BASE_DOMAIN}/settings/mainSettings`,
    editMainSettings: `${BASE_DOMAIN}/settings/editMainSettings`,
    getPanelSettings: `${BASE_DOMAIN}/settings/panelSettings`,
    editPanelSettings: `${BASE_DOMAIN}/settings/editPanelSettings`,
    

    //stat
    getStat: `${BASE_DOMAIN}/statistic/statistics`,
    

    //rating
    getOptions: `${BASE_DOMAIN}/rating/rating`,
    editOption: `${BASE_DOMAIN}/rating/editRating`,
    getRevs: `${BASE_DOMAIN}/rating/getOrdersRating`,

    //reserv
    getReserv: `${BASE_DOMAIN}/order/reservation`,


    //edit hierarchy
    editParent: `${BASE_DOMAIN}/catalog/editParent`,
    editParentList: `${BASE_DOMAIN}/catalog/editParentList`,
    editParentSubList: `${BASE_DOMAIN}/catalog/editParentSubList`,
    getCatsNames: `${BASE_DOMAIN}/catalog/getCategoriesName`,

    editPlateImageParam: `${BASE_DOMAIN}/catalog/editPlateImageParam`,

    getPlateGifts: `${BASE_DOMAIN}/catalog/plateGifts`,
    addPlateGift: `${BASE_DOMAIN}/catalog/addPlateGifts`,
    editPlateGift: `${BASE_DOMAIN}/catalog/editPlateGifts`,
    deletePlateGift: `${BASE_DOMAIN}/catalog/deletePlateGifts`,


    getSearchProd: `${BASE_DOMAIN}/catalog/searchProduct`,

    cloneItem: `${BASE_DOMAIN}/catalog/cloneItem`,

    getRemovedEls: `${BASE_DOMAIN}/catalog/getRemovedElements`,
    deleteTrashItem: `${BASE_DOMAIN}/catalog/removeElements`,
    restoreTrashItem: `${BASE_DOMAIN}/catalog/restoreElements`
}



export default endpoints;