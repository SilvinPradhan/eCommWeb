import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth/user'

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

import {toast} from "react-toastify";
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
        marginTop: theme.spacing(5),
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
    // textContainer: {
    //     display: 'flex',
    //     flexDirection: 'inline',
    //     alignItems: 'center',
    //     justifyContent: 'space-between'
    // }
}));

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
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

    const {username, firstName, lastName, email, password, confirmPassword, showPassword, success, error} = values;

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: showPassword ? false : true})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    // const handlePasswordChange = (prop) => (event) => {
    //     setValues({...values, [prop]: event.target.value});
    // };

    const handleChange = name => event => {
        setValues({...values, error: '', [name]: event.target.value});
    };

    const clickSubmit = event => {
        window.scrollTo(0, 0);
        event.preventDefault();
        setValues({...values, error: ''});

        signup({username, firstName, lastName, email, password}).then(data => {
            // if (password !== confirmPassword) {
            //     alert('Password Mismatch')
            // }
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
                        value={lastName}
                        onChange={handleChange('lastName')
                        }
                    ></TextField>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="email"
                        margin="normal"
                        label="Email"
                        value={email}
                        type="email"
                        onChange={handleChange('email')}
                    ></TextField>

                    {/*<TextField*/}
                    {/*    variant="outlined"*/}
                    {/*    fullWidth*/}
                    {/*    autoFocus*/}
                    {/*    name="password"*/}
                    {/*    margin="normal"*/}
                    {/*    label="Password"*/}
                    {/*    type={"password"}*/}
                    {/*    value={password}*/}
                    {/*    onChange={handleChange('password')}*/}
                    {/*/>*/}
                    <InputLabel htmlFor="standard-adornment-password">
                        Password
                    </InputLabel>
                    <Input
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange('password')}
                        value={password}
                        name="password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        fullWidth
                    />

                    <TextField
                        variant="outlined"
                        fullWidth
                        name="confirmPassword"
                        margin="normal"
                        type={"password"}
                        label="Confirm password"
                        value={confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={clickSubmit}
                        disabled={!email || !password}
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
