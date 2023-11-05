import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}


class rsService {

    getReserv = async (token, body) => {
        try {
            let res = await fetch(endpoints.getReserv, {
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

export default rsService;