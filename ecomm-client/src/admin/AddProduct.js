import React, {useState, useEffect} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import {Button, Container, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Layout from "../core/Layout";
import BG from '../static/images/categoryBG/bg.jpg'
import {createCategory} from './apiAdmin'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

const AddProduct = () => {
    return (
        <div>

        </div>
    )
}

export default AddProduct
