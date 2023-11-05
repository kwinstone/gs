import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

class trService {

    getRemovedElements = async (token, body) => {
        try {
            let res = await fetch(endpoints.getRemovedEls, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    deleteTrashItem = async (token, body) => {
        try {
            let res = await fetch(endpoints.deleteTrashItem, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            }) 
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    restoreTrashItem = async (token, body) => {
        try {
            let res = await fetch(endpoints.restoreTrashItem, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
}

export default trService;