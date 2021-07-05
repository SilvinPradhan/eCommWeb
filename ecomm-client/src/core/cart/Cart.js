import React, {useEffect, useState} from 'react'
import {getCart} from "./cartHandler";
import Layout from "../Layout";
import Card from "../cards/Card";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Cart = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        setItems(getCart())
    }, [])
    const showItems = items => {
        return (
            <>
                <h4>Your Cart has {`${items.length}`} products</h4>
                <hr/>
                {items.map((product, index) => {
                    return (
                        <Card key={index} product={product}></Card>
                    )
                })}
            </>
        )
    }
    const noItems = () => {
        return (
            <h3>
                Your cart is empty. <br/>
                <Link to={"/shop"}>Continue Shopping</Link>
            </h3>
        )
    }
    return (
        <>
            <Layout title={"Shopping Cart"}
                    description={"Manage your cart items. Add remove checkout or continue shopping."}/>
            <div className={"row"}>
                <div className={"col-6"}>
                    {items.length > 0 ? showItems(items) : noItems()}
                </div>
                <div className={"col-6"}>
                    <Typography>SHow checkout options/shipping address/total/update quantity</Typography>
                </div>
            </div>
        </>
    )
}

export default Cart
