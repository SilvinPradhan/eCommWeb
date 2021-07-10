import React, {useState, useEffect} from 'react'
import {isAuthenticated} from "../auth/user";
import {Link, Redirect} from 'react-router-dom'
import {read, update, updateUser} from '../user/apiUser'

const Profile = ({match}) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const {token} = isAuthenticated()

    const {
        firstName,
        lastName,
        username,
        email,
        password,
        error,
        success
    } = values

    const init = (userId) => {
        console.log(userId)
        read(userId, token).then(data => {
            if (data.error) {
                setValues({...data, error: true})
            } else {
                setValues({
                    ...values,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    email: data.email
                })
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    }, [])

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const updateChanges = (e) => {
        e.preventDefault()
        return update(match.params.userId, token, {firstName, lastName, username, email, password}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        email: data.email,
                        success: true
                    })
                })
            }
        })
    }

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to={"/cart"}/>
        }
    }

    const profileUpdate = (firstName, lastName, username, email, password) => {
        return (<form>
            <div className={"form-group"}>
                <label className={"text-muted"}>firstName</label>
                <input type={"text"} onChange={handleChange('firstName')} className={"form-control"} value={firstName}/>
            </div>
            <div className={"form-group"}>
                <label className={"text-muted"}>lastName</label>
                <input type={"text"} onChange={handleChange('lastName')} className={"form-control"} value={lastName}/>
            </div>
            <div className={"form-group"}>
                <label className={"text-muted"}>username</label>
                <input type={"text"} onChange={handleChange('username')} className={"form-control"} value={username}/>
            </div>
            <div className={"form-group"}>
                <label className={"text-muted"}>email</label>
                <input type={"email"} onChange={handleChange('email')} className={"form-control"} value={email}/>
            </div>
            <div className={"form-group"}>
                <label className={"text-muted"}>password</label>
                <input type={"password"} onChange={handleChange('password')} className={"form-control"}
                       value={password}/>
            </div>
            <button onClick={updateChanges} className={"btn btn-info"}>Save Changes</button>
        </form>)
    }

    return (
        <>
            <h2>Profile Settings</h2>
            {
                profileUpdate(firstName, lastName, username, email, password)
            }
            {
                redirectUser(success)
            }
        </>
    )
}

export default Profile

