import React from 'react'
import {getProducts} from "../apiCore";
import Card from '../cards/Card'

const Checkout = ({products}) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
        </div>
    )
}

export default Checkout
