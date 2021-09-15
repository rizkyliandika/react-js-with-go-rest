import React from "react";
import { useHistory } from "react-router";
import UserService from "../services/UserServices";
import ListUserComponent from "./ListUserComponent";

const UserContainer = () => {
    const history = useHistory();

    const userService = new UserService();
    const [data, setData] = React.useState([]);

    const getData = async () => {
        await userService.getAllUser().then(resp => {
            setData(resp);
        })
    }

    const handleNewUser = () => {
        history.push('/form-user');
    }

    React.useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className={"container"}>
            <hr />
            <button type="button" className="btn btn-primary" onClick={handleNewUser}>New User</button>
            <ListUserComponent users={data}/>
        </div>
    )
}

export default UserContainer