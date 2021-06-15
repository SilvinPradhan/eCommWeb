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
import {authenticate, signin} from "../auth/user";

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
        loading: false,
        error: '',
        redirectToReferrer: false
    });
    const {email, password, loading, error, redirectToReferrer} = formData;
    const change = (e) =>
        setFormData({
            ...formData, error: '',
            [e.target.name]: e.target.value,
        });
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log({email, password});
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
            }
        })
    };
    //redirect if logged in
    // if (isAuthenticated) {
    //     return <Redirect to="/"></Redirect>;
    // }

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
            return <Redirect to={'/'}/>
        }
    }

    return (
        <Container component="main" maxWidth="xs">
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

                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="password"
                        fullWidth
                        autoFocus
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            change(e);
                        }}
                    ></TextField>
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
