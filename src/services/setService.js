import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

class setService {

    getMainSettings = async (token) => {
        try {
            let res = await fetch(endpoints.getMainSettings, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editMainSettings = async (token, body) => {
        try {
            let res = await fetch(endpoints.editMainSettings, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res);
        } catch(err) {
            console.log(err)
        }
    }

    getPanelSettings = async (token) => {
        try {
            let res = await fetch(endpoints.getPanelSettings, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editPanelSettings = async (token, body) => {
        try {
            let res = await fetch(endpoints.editPanelSettings, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            }) 
            return await checkAuth(res);
        } catch(err) {
            console.log(err)
        }
    }
    
}

export default setService;