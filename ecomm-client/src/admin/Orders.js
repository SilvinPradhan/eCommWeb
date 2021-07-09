import React, {useState, useEffect} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import {listOrders} from './apiAdmin'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Typography} from "@material-ui/core";
import Layout from "../core/Layout";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }
    useEffect(() => {
        loadOrders()
    }, [])

    //If there are no orders
    const showOrdersLength = (orders) => {
        if (orders.length > 0) {
            return <span className={"text-danger display-5"}>Total Orders: {orders.length}</span>
        } else {
            return <span className={"text-danger display-5"}>No Orders</span>
        }
    }

    return (
        <>
            <Layout title={"Orders"} description={`Hi ${user.username}, you can manage your orders here!`}/>
            <div className={'row'}>
                <div className={"col-md-8 offset-md-2"}>
                    {showOrdersLength(orders)}
                    {JSON.stringify(orders)}
                </div>
            </div>
        </>
    )
}

export default Orders
