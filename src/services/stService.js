import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
//'Authorization': `Bearer ${token}`,


class stService {

    storiesCreateAndEdit = async (token, body) => {
        try {
            let res = await fetch(endpoints.storiesCreateAndEdit, {
                method: "POST",
                headers: {
                    // ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: body
            })
            return await checkAuth(res)
        } catch(err) {return}
    }

    getStories = async (token) => {
        try {
            let res = await fetch(endpoints.getStories, {
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

    addStories = async (token, body) => {
        try {
            let res = await fetch(endpoints.addStories, {
                method: 'POST',
                headers: {
                    // ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: body
            }) 
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editStories = async (token, body) => {
        try {
            let res = await fetch(endpoints.editStories, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: body
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    deleteStories = async (token, id) => {
        try {
            let res = await fetch(endpoints.deleteStories, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify({
                    ID: id
                })
            }) 
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addStorieImage = async (token, body) => {
        try {
            let res = await fetch(endpoints.addStoryImage, {
                method: 'POST',
                body: body,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    deleteStorieImage = async (token, id) => {
        try {
            let res = await fetch(endpoints.deleteStoryImage, {
                method: 'POST',
                body: JSON.stringify({ID: id}),
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
    getStorieSettings = async (token) => {
        try {
            let res = await fetch(endpoints.getStorieSettings, {
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

    editStorieSettings = async (token, body) => {
        try {
            let res = await fetch(endpoints.editStorieSettings, {
                method: 'POST',
                body: JSON.stringify(body),
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

    
}

export default stService;