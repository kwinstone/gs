const LOCAL_STORAGE = window.localStorage;

const checkAuth = async (response, isNeedStatus) => {
    if(response.status === 401) {
        LOCAL_STORAGE.removeItem('gs-token')
        window.location.replace(window.location.origin + '/auth')
    } 
    if(response?.status !== 401 && !isNeedStatus) {
        return response.json()
    }
    if(response?.status !== 401 && isNeedStatus) {
        return response?.status
    }
}

export default checkAuth;