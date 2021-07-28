import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Button,
    FormControl,
    TextField,
    Typography,
    Avatar,
    Container,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {authenticate, signin, isAuthenticated} from "../auth/user";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
    root: {},
    heading: {
        color: theme.primary,
        align: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.primary,
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

const SignIn = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: 'silvinpradhan95@gmail.com',
        password: 'Invoker200695@@',
        showPassword: false,
        loading: false,
        error: '',
        redirectToReferrer: false
    });
    const {email, password, loading, error, showPassword, redirectToReferrer} = formData;
    const {user} = isAuthenticated()
    const change = (e) =>
        setFormData({
            ...formData, error: '',
            [e.target.name]: e.target.value,
        });
    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log({email, password});
        setFormData({...formData, error: '', loading: true})
        signin({email, password}).then(data => {
            if (data.error) {
                setFormData({
                    ...formData, error: data.error,
                    loading: false
                })
            } else {
                authenticate(data, () => {
                    setFormData({
                        ...formData,
                        redirectToReferrer: true, error: '', loading: false
                    })
                })
                toast.success(`Welcome to eCommWeb, ${email}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    };

    const handleClickShowPassword = () => {
        setFormData({...formData, showPassword: showPassword ? false : true})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const showError = () => (
        <div style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && <div>
            <h2> Loading...</h2>
        </div>
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/user/dashboard"/>
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography className={classes.heading}>
                    <i className="fas fa-user"></i> Sign into your account
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={(e) => onSubmit(e)}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="username"
                        fullWidth
                        autoFocus
                        name="email"
                        value={email}
                        onChange={(e) => {
                            change(e);
                        }}
                    ></TextField>

                    <InputLabel htmlFor="standard-adornment-password">
                        Password
                    </InputLabel>
                    <Input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => change(e)}
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

                    {/*<TextField*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    label="password"*/}
                    {/*    fullWidth*/}
                    {/*    autoFocus*/}
                    {/*    type="password"*/}
                    {/*    placeholder="Password"*/}
                    {/*    name="password"*/}
                    {/*    value={password}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        change(e);*/}
                    {/*    }}*/}
                    {/*></TextField>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </form>
                <Typography className={classes.heading}>
                    Don't have an account? <Link to="/signup">Register</Link>
                </Typography>
            </div>
            {showLoading()}
            {
                showError()
            }
            {redirectUser()}
        </Container>
    );
};
SignIn.propTypes = {
    // setAlert: PropTypes.func.isRequired,
    // login: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool,
};

export default SignIn;
