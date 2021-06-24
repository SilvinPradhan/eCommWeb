import React, {useState, useEffect} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import {Button, Container, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Layout from "../core/Layout";
import BG from '../static/images/categoryBG/bg.jpg'
import {createProduct} from './apiAdmin'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    form: {
        width: '50%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#264653',
    },
    title: {
        fontSize: 14,
    },
    container: {},
    button: {
        margin: theme.spacing(1),
    },
    back: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#ffffff'
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

    const NewProductForm = () => (
        <>
            <form className={"mb-3"}>
                <h1>Product Form</h1>
            </form>
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
