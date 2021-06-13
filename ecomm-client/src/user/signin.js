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
        username: 'icuDummies',
        password: 'Invoker200695@@',
    });
    const {username, password} = formData;
    const change = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log({username, password});
        // login({ email, password });
    };
    //redirect if logged in
    // if (isAuthenticated) {
    //     return <Redirect to="/"></Redirect>;
    // }

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
                        name="username"
                        value={username}
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
        </Container>
    );
};
SignIn.propTypes = {
    // setAlert: PropTypes.func.isRequired,
    // login: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool,
};

export default SignIn;
