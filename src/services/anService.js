import endpoints from "./endpoints";
import checkAuth from "./checkAuth";
import { useParams } from 'react-router-dom';

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}


class anService {


    getOrders = async (token, body) => {
        try {
            let res = await fetch(endpoints.getOrders, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    portOrder = async (token, OrderID) => {
        try {
            let res = await fetch(`${process.env.REACT_APP_HOST}/NewIntegrations/send_order.php?${new URLSearchParams({
                OrderID
            })}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
            })

            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    editOrderStatus = async (token, body) => {
        try {
            let res = await fetch(endpoints.editOrderStatus, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    editOrderPaidStatus = async (token, body) => {
        try {
            let res = await fetch(endpoints.editOrderPaidStatus, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    getStatuses = async (token) => {
        try {
            let res = await fetch(endpoints.getStatuses, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    getUsers = async (token, body) => {
        try {
            let res = await fetch(endpoints.getUsers, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                }
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    editUserData = async (token, body) => {
        try {
            let res = await fetch(endpoints.editUserData, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch (err) {
            console.log(err)
        }
    }

    sendMailToUsers = async (token, body) => {
        try {
            let res = await fetch(endpoints.sendMailToUsers, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            const result = await checkAuth(res);
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    sendMailToAllUsers = async (token, body) => {
        try {
            let res = await fetch(endpoints.sendMailToAllUsers, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    sendPushToUsers = async (token, body) => {
        try {
            let res = await fetch(endpoints.sendPushToUsers, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    sendPushToAllUsers = async (token, body) => {
        try {
            let res = await fetch(endpoints.sendPushToAllUsers, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    setPersonalSale = async (token, body) => {
        try {
            let res = await fetch(endpoints.setPersonalSale, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })

            const result = await checkAuth(res);
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    removePersonalSale = async (token, id) => {
        try {
            let res = await fetch(endpoints.deletePersonalSale, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    UserID: id
                })
            })
            const result = await checkAuth(res);
            return result;
        } catch (err) {
            console.log(err)
        }
    }

    getCities = async (token) => {
        try {
            let res = await fetch(endpoints.getCities, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await checkAuth(res)
            return result;
        } catch (err) {
            console.log(err)
        }
    }


}

export default anService;