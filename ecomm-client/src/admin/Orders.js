import React, {useState, useEffect} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Typography} from "@material-ui/core";
import Layout from "../core/Layout";
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
                // console.log(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, [])

    //If there are no orders
    const showOrdersLength = (orders) => {
        if (orders.length > 0) {
            return <span className={"text-danger display-6"}>Total Orders: {orders.length}</span>
        } else {
            return <span className={"text-danger display-6"}>No Orders</span>
        }
    }

    const showInput = (key, value) => {
        return (<div className={"input-group mb-2 mr-sm-2"}>
            <div className={"input-group-prepend"}>
                <div className={"input-group-text"}>{key}</div>
            </div>
            <input type={"text"} value={value} className={"form-control"} readOnly={true}/>
        </div>)
    }

    const handleStatusChange = (e, orderId) => {
        //update order status
        return updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
            if (data.error) {
                console.log('Update status failed. There is a problem in the server.')
            } else {
            //    load orders again => mount orders
                loadOrders()
            }
        })
    }

    const showStatus = (order) => {
        return (<div className={"form-group"}>
            <h3 className={"mark mb-4"}>Status: {order.status}</h3>
            <select className={"form-control"} onChange={(e) => handleStatusChange(e, order._id)}>
                <option>Update Status</option>
                {
                    statusValues.map((status, index) => {
                        return (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        )
                    })
                }
            </select>
        </div>)
    }

    return (
        <>
            <Layout title={"Orders"} description={`Hi ${user.username}, you can manage your orders here!`}/>
            <div className={'row'}>
                <div className={"col-md-8 offset-md-2"}>
                    {showOrdersLength(orders)}
                    {
                        orders.map((order, index) => {
                            return (<div className={"mt-5"} key={index} style={{borderBottom: "2px solid indigo"}}>
                                <h4 className={"mb-5"}>
                                  <span className={""}>
                                      Order ID: {order._id}
                                  </span>
                                </h4>
                                <ul className={"list-group mb-2"}>
                                    <li className={"list-group-item"}>
                                        {showStatus(order)}
                                    </li>
                                    <li className={"list-group-item"}>
                                        Ordered By: {order.user.username}
                                    </li>
                                    <li className={"list-group-item"}>
                                        Transaction ID: {order.transaction_id}
                                    </li>
                                    <li className={"list-group-item"}>
                                        Amount: {order.amount}
                                    </li>
                                    <li className={"list-group-item"}>
                                        Ordered Date: {moment(order.createdAt).fromNow()}
                                    </li>
                                    <li className={"list-group-item"}>
                                        Delivery Address: {order.address}
                                    </li>
                                </ul>
                                <h5 className={"mt-4 mb-4 font-italic"}>
                                    Total Products in the Order: {order.products.length}
                                </h5>

                                {
                                    order.products.map((p, pIndex) => (
                                        <div className={"mb-4"} key={pIndex}
                                             style={{padding: '20px', border: '1px solid whitesmoke'}}>
                                            {showInput('Product Name: ', p.name)}
                                            {showInput('Product Price: ', p.price)}
                                            {showInput('Product Total: ', p.count)}
                                            {showInput('Product Id: ', p._id)}
                                        </div>
                                    ))
                                }

                            </div>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Orders
