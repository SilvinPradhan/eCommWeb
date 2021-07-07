import React, {useEffect, useState} from 'react'
import {getBrainTreeClientToken} from "../apiCore";
import Card from '../cards/Card'
import {Link} from "react-router-dom";
import {isAuthenticated} from "../../auth/user";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({products}) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        return getBrainTreeClientToken(userId, token).then(data => {
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
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data)
                nonce = data.nonce
                console.log('Send nonce and total to process', nonce, getTotal(products))
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
                                authorization: data.clientToken
                            }} onInstance={instance => data.instance = instance}/>
                            <button onClick={purchase} className={"btn btn-success"}>Pay</button>
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

    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
            {
                showError(data.error)
            }
            {
                showCheckout()
            }
        </div>
    )
}

export default Checkout
