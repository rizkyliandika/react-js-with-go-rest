class UserService {
    getAllUser = async() => {
        return fetch(process.env.REACT_APP_API_URL).then(async(resp) => await resp.json().then(val => val.data));
    }

    createUser = async(payload) => {
        return fetch(process.env.REACT_APP_API_URL, {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
                },
                'body': JSON.stringify(payload)
            })
            .then(async(resp) => await resp.json())
            .catch(e => console.error(e));
    }
}

export default UserService;