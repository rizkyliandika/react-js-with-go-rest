class UserService {
    getAllUser = async () => {
        return await fetch(process.env.REACT_APP_API_URL).then(async (resp) =>  await resp.json().then(val => val.data));
    }

    createUser = async(payload) => {
        const data = await fetch(process.env.REACT_APP_API_URL, {
            'method' : process.env.REACT_APP_METHOD_POST,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
            },
            'body': JSON.stringify(payload)
        });
        return await data.json();
    }
}

export default UserService;