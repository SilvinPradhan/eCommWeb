import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Button,
    TextField,
    Typography,
    Avatar,
    Container,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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
        marginTop: theme.spacing(4),
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
        color: '#fff'
    },
}));

const SignIn = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const {username, firstName, lastName, email, password, confirmPassword} = formData;
    const change = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    const onSubmit = async (e) => {
        window.scrollTo(0, 0);
        e.preventDefault();
        if (password !== confirmPassword) {
            // setAlert(
            //     'password does	return <Redirect to="/"></Redirect>;ot match',
            //     'error'
            // );
        } else {
            console.log({username, firstName, lastName, email, password});
            // register({username, firstName, lastName, email, password});

        }
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
                    <i className="fas fa-user"></i> Create Your Account
                </Typography>

                <form
                    className={classes.form}
                    onSubmit={(e) => onSubmit(e)}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Username"
                        name="username"
                        fullWidth
                        autoFocus
                        value={username}
                        onChange={(e) => {
                            change(e);
                        }}
                    ></TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="First Name"
                        name="firstName"
                        fullWidth
                        autoFocus
                        value={firstName}
                        onChange={(e) => {
                            change(e);
                        }}
                    ></TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Last Name"
                        name="lastName"
                        fullWidth
                        autoFocus
                        value={lastName}
                        onChange={(e) => {
                            change(e);
                        }}
                    ></TextField>
                    <TextField
                        variant="outlined"
                        fullWidth
                        autoFocus
                        name="email"
                        margin="normal"
                        label="email"
                        value={email}
                        onChange={(e) => {
                            change(e);
                        }}
                    ></TextField>

                    <TextField
                        variant="outlined"
                        fullWidth
                        autoFocus
                        name="password"
                        margin="normal"
                        label="password"
                        type={'password'}
                        value={password}
                        onChange={(e) => {
                            change(e);
                        }}
                    />

                    <TextField
                        variant="outlined"
                        fullWidth
                        autoFocus
                        name="confirmPassword"
                        margin="normal"
                        label="confirm password"
                        type={'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                            change(e);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
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
};

// SignIn.propTypes = {
//     setAlert: PropTypes.func.isRequired,
//     register: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool,
// };

export default SignIn;
