import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
//'Authorization': `Bearer ${token}`,

class statService {

    getStat = async (token, body) => {
        try {
            let res = await fetch(endpoints.getStat, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,   
                }
            }) 
            return await checkAuth(res);
        } catch(err) {
            console.log(err)
        }
    }
}

export default statService;