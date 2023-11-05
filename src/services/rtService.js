import endpoints from "./endpoints";
import checkAuth from "./checkAuth";
const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

//'Authorization': `Bearer ${token}`,

class rtService {

    getOptions = async (token) => {
        try {
            let res = await fetch(endpoints.getOptions, {
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

    editOption = async (token, body) => {
        try {
            let res = await fetch(endpoints.editOption, {
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

    getRevs = async (token, body) => {
        try {
            let res = await fetch(endpoints.getRevs, {
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

export default rtService;