import React, {useEffect, useState} from 'react'
import {getBrainTreeClientToken, processPayment} from "../apiCore";
import Card from '../cards/Card'
import {emptyCart} from "../cart/cartHandler";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../../auth/user";
import DropIn from "braintree-web-drop-in-react";
import {toast, ToastContainer} from "react-toastify";

const Checkout = ({products}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBrainTreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({...data, error: data.error});
            } else {
                console.log(data);
                setData({clientToken: data.clientToken});
            }
        });
    };

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (<div className={"mt-2"}>{showDropIn()}</div>) : (
                <Link to={"/signin"}>
                    <button className={"btn btn-primary"}>Sign in to Checkout</button>
                </Link>)
        )
    }

    const purchase = () => {
        setData({loading: true})
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data)
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response)
                        setData({...data, success: response.success})
                        //    empty cart
                        emptyCart(() => {
                            console.log('payment successful and empty cart')
                            setData({loading: false, success: true})
                        })
                        //    create order
                    })
                    .catch(error => {
                        console.log(error)
                        setData({loading: false})
                    })
                toast.success(`Click 'Pay' to process to checkout! `, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.log('DropIn Error', error)
                setData({...data, error: error.message})
            })
    }

    const showDropIn = () => {
        return (
            <div onBlur={() => setData({...data, error: ""})}>
                {
                    data.clientToken !== null && products.length > 0 ?
                        (<div>
                            <DropIn options={{
                                authorization: data.clientToken,
                                paypal: {
                                    flow: "vault"
                                }
                            }} onInstance={instance => data.instance = instance}/>
                            <button onClick={purchase} className={"btn btn-success btn-block"}>Pay</button>
                        </div>) : null
                }
            </div>
        )
    }

    const showError = (error) => {
        return (
            <div className={"alert alert-warning"} style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        )
    }

    const showLoading = (loading) => (
        loading && <h2>Loading...</h2>
    )

    return (
        <div>
            <ToastContainer/>
            <h4>Total: ${getTotal()}</h4>
            {
                showError(data.error)
            }
            {
                showCheckout()
            }
            {showLoading(data.loading)}
        </div>
    )
}

export default Checkout
