import endpoints from "./endpoints";
import checkAuth from "./checkAuth";
import { BASE_DOMAIN } from "./endpoints";
const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

class authService {
    
    auth = async (data) => {
        try {
            let res = await fetch(endpoints.auth, {
                method: 'POST',
                // mode: 'no-cors',
                headers,
                body: JSON.stringify(data)
            })

            return await res.json();
        } catch(err) {
            console.log(err)
        }
    }

    orderSort = async (token, type, IDs) => {
        try {
            let res = await fetch(`${BASE_DOMAIN}/catalog/sorting`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    IDs,
                    list: type
                })
            })

            return await checkAuth(res)

        } catch(err) {
            console.log(err)
        }
    }


}

export default authService;