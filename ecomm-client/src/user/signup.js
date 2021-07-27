import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth/user'
import {toast} from "react-toastify";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Button,
    TextField,
    Typography,
    Avatar,
    Container,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import validator from "validator/es";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

const useStyles = makeStyles((theme) => ({
    root: {},
    heading: {
        color: '#264653',
        align: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#264653',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#264653',
    },
}));

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
    const classes = useStyles();

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
        window.scrollTo(0, 0);
        event.preventDefault();
        setValues({...values, error: ''});

        signup({username, firstName, lastName, email, password}).then(data => {
            if (password !== confirmPassword) {
                alert('Password Mismatch')
            }
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

    const showHide = () => {

    }

    const signUpForm = () => (

        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography className={classes.heading}>
                    <i className="fas fa-user"></i> Create Your Account
                </Typography>

                <form
                    className={classes.form}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Username"
                        name="username"
                        fullWidth
                        autoFocus
                        value={username}
                        onChange={handleChange('username')
                        }
                    ></TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="First Name"
                        name="firstName"
                        fullWidth
                        autoFocus
                        value={firstName}
                        onChange={handleChange('firstName')
                        }
                    ></TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Last Name"
                        name="lastName"
                        fullWidth
                        autoFocus
                        value={lastName}
                        onChange={handleChange('lastName')
                        }
                    ></TextField>
                    <TextField
                        variant="outlined"
                        fullWidth
                        autoFocus
                        name="email"
                        margin="normal"
                        label="Email"
                        value={email}
                        type="email"
                        onChange={handleChange('email')}
                    ></TextField>

                    <TextField
                        variant="outlined"
                        fullWidth
                        autoFocus
                        name="password"
                        margin="normal"
                        label="password"
                        type={"password"}
                        value={password}
                        onChange={handleChange('password')}
                    />

                    <TextField
                        variant="outlined"
                        fullWidth
                        autoFocus
                        name="confirmPassword"
                        margin="normal"
                        type={"password"}
                        label="confirm password"
                        value={confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Register
                    </Button>
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </Container>
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
