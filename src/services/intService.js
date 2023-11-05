import endpoints from "./endpoints";
import checkAuth from "./checkAuth";
const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
class intService {

    getIntSettings = async (token) => {
        try {
            let res = await fetch(endpoints.getIntSettings, {
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

    editIntSettings = async (token, body) => {
        try {
            let res = await fetch(endpoints.editIntSettings, {
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

    startInt = async (token) => {
        try {
            let res = await fetch(endpoints.startIntegr, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

}

export default intService;