import React, {useState, useEffect} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import {Avatar, Button, Container, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Layout from "../core/Layout";
import {createProduct} from './apiAdmin'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

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
    back: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#ffffff'
    },
    container: {
        minHeight: '300px'
    }
}));

const AddProduct = () => {

    const classes = useStyles();

    const {user, token} = isAuthenticated()
    const [value, setValue] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: false,
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: '',
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = value

    const change = (e) => {

    }

    const onSubmit = (e) => {

    }

    const NewProductForm = () => (
        <>
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
                            label="name"
                            name="name"
                            fullWidth
                            autoFocus
                            value={name}
                            onChange={(e) => {
                                change(e);
                            }}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            fullWidth
                            autoFocus
                            name="description"
                            margin="normal"
                            label="Description"
                            value={description}
                            onChange={(e) => {
                                change(e);
                            }}
                        ></TextField>

                        <TextField
                            variant="outlined"
                            fullWidth
                            autoFocus
                            type="number"
                            name="price"
                            margin="normal"
                            label="Price"
                            value={price}
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
                </div>
            </Container>
        </>
    )

    return (
        <div className={classes.container}>
            <ToastContainer/>
            <Layout title={"Create New Product"}
                    description="Good Day, ready to create a new product?"/>
            <div className="row">
                <div className="col-md-8 offset-md-4">{NewProductForm()}</div>
                <div>
                    {/*{returnBack()}*/}
                </div>
            </div>
        </div>
    )
}

export default AddProduct
