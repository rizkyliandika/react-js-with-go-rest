import UserService from "../services/UserServices";
import React from "react";

const FormUserComponent = () => {
    const userService = new UserService();

    const initialPayload = {
        'name': '',
        'email': '',
        'gender': '',
        'status': ''
    }
    const [payload, setPayload] = React.useState(initialPayload)

    const addUser = () => {
        userService.createUser(payload).then(res => {
            console.log('res: ', res);
            if (res.data.id === '' || res.data == null) {
                alert('create user is success');
            } else {
                alert('gagal');
            }
        })
    }

    const handleChangeTextInput = (name, input) => {
        setPayload({ ...payload, [name]: input });
    }

    return (
        <>
            <div className="container">
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" onChange={((event) => handleChangeTextInput('name', event.target.value))} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail" onChange={((event) => handleChangeTextInput('email', event.target.value))} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputGender" className="col-sm-2 col-form-label">Gender</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputGender" onChange={((event) => handleChangeTextInput('gender', event.target.value))} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputStatus" onChange={((event) => handleChangeTextInput('status', event.target.value))} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-warning" style={{ marginRight: 15 }}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={addUser}>Save</button>
                </form>
            </div>
        </>
    )
}

export default FormUserComponent;