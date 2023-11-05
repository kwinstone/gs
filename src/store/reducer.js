const LOCAL_STORAGE = window.localStorage;

const gState = {
    token: LOCAL_STORAGE.getItem('gs-token') ? LOCAL_STORAGE.getItem('gs-token') : '',
    settings: LOCAL_STORAGE.getItem('gs-user-settings') ? 
            JSON.parse(LOCAL_STORAGE.getItem('gs-user-settings')) : null,
    user: LOCAL_STORAGE.getItem('gs-user-data') ? 
            JSON.parse(LOCAL_STORAGE.getItem('gs-user-data')) : null,
    catalog: null,
    sidebarOpen: true,
    backFunc: null
}


const reducer = (state = gState, action) => {
    switch(action.type) {
        case 'TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SETTINGS':
            return {
                ...state,
                settings: action.settings
            }
        case 'USER':
            return {
                ...state,
                user: action.user
            }
        case 'CATALOG':
            return {
                ...state,
                catalog: action.catalog
            }
        case 'SIDEBAR':
            return {
                ...state,
                sidebarOpen: action.sidebarOpen
            }
        case 'BRAND':
            return {
                ...state,
                brands: action.brands
            }
        case 'BACK_FUNC':
            return {
                ...state,
                backFunc: action.backFunc
            }
        default: 
            return state
    }
}

export default reducer;