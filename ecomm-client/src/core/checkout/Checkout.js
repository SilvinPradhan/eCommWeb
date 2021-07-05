import React from 'react'
import {getProducts} from "../apiCore";
import Card from '../cards/Card'
import {isAuthenticated} from "../../auth/user";
import {Link} from "react-router-dom";

const Checkout = ({products}) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
            {
                isAuthenticated() ? (<button className={"btn btn-success"}>Checkout</button>) : (
                    <Link to={"/signin"}>
                        <button className={"btn btn-primary"}>Sign in to Checkout</button>
                    </Link>)
            }
        </div>
    )
}

export default Checkout
