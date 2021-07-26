import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth/user'
import {toast} from "react-toastify";

import validator from "validator/es";

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false
    });

    const [strongPassword, setStrongPassword] = useState('')

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setStrongPassword('Strong Password')
        } else {
            setStrongPassword('Weak Password')
        }
    }

    const {username, firstName, lastName, email, password, confirmPassword, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: '', [name]: event.target.value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: ''});

        signup({username, firstName, lastName, email, password}).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({
                    ...values,
                    username: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    error: '',
                    success: true
                });
                toast.info(`You have successfully signed up!, ${username}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" className="form-control" value={username}/>
            </div>

            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input onChange={handleChange('lastName')} type="text" className="form-control" value={lastName}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange('confirmPassword')} type="password" className="form-control"
                       value={confirmPassword}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </>
    );
};

export default Signup;
