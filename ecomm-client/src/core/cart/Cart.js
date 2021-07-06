import React, {useEffect, useState} from 'react'
import {getCart} from "./cartHandler";
import Checkout from "../checkout/Checkout";
import Layout from "../Layout";
import Card from "../cards/Card";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)
    useEffect(() => {
        console.log('MAX DEPTH');
        setItems(getCart())
    }, [run])
    const showItems = items => {
        return (
            <>
                <Typography className={"mt-2"}>Your Cart has {`${items.length}`} products</Typography>
                <hr/>
                {items.map((product, index) => {
                    return (
                        <Card key={index} product={product} showAddToCart={false} cartUpdate={true}
                              showRemoveFromCart={true} setRun={setRun} run={run}></Card>
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
            <div className={"row container"}>
                <div className={"col-6"}>
                    {items.length > 0 ? showItems(items) : noItems()}
                </div>
                <div className={"col-6"}>
                    <Typography className={"mt-2 mb-4"}>Your cart summary:</Typography>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
        </>
    )
}

export default Cart
