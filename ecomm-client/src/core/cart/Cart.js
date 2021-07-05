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
    }, [items])
    const showItems = items => {
        return (
            <>
                <Typography className={"mt-2"}>Your Cart has {`${items.length}`} products</Typography>
                <hr/>
                {items.map((product, index) => {
                    return (
                        <Card key={index} product={product} showAddToCart={false} cartUpdate={true}
                              showRemoveFromCart={true}></Card>
                    )
                })}
            </>
        )
    }
    const noItems = () => {
        return (
            <>
                <h4>Your cart is empty.</h4>
                <br/>
                <div className={"row"}>
                    <img src={"https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?ssl=1"}
                         width={400} height={350}/>
                    <Link to={"/shop"}>Continue Shopping</Link>
                </div>
            </>
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
                    <Typography className={"mt-2"}>Show checkout options/shipping address/total/update
                        quantity</Typography>
                </div>
            </div>
        </>
    )
}

export default Cart
