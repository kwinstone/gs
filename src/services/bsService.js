import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
//'Authorization': `Bearer ${token}`,

class bsService {

    getBasketSettings = async (token) => {
        try {
            let res = await fetch(endpoints.getBasketSettings, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                }
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editBasketSettings = async (token, body) => {
        try {
            let res = await fetch(endpoints.editBasketSettings, {
                method: 'POST',
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

export default bsService;