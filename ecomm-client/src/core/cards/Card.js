import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import ShowImage from "./ShowImage";
import moment from "moment";
import {addProduct} from '../cart/cartHandler'

const Card = ({product, displayViewProductButton = true, showAddToCart = true}) => {
    const [redirect, setRedirect] = useState(false)
    product.createdAt = undefined;
    const showProductButton = (displayViewProductButton) => {
        return displayViewProductButton && (
            <Link to={`/product/${product._id}`} className={"mr-2 list-unstyled"}>
                < Button variant="contained" color="secondary">View Product</Button>
            </Link>
        )
    }

    const addToCart = () => {
        addProduct(product, () => {
            setRedirect(true)
        })
    }

    const needRedirect = () => {
        if (redirect) {
            return <Redirect to={"/cart"}/>
        }
    }

    const showCartButton = (showAddToCart) => {
        return (showAddToCart && (<>
            <Button onClick={addToCart} variant="contained" color="secondary"><FontAwesomeIcon
                icon={faCartPlus}></FontAwesomeIcon>{' '} Cart</Button>
        </>))
    }

    const showInStock = (quantity) => {
        return quantity > 0 ? <span className={"badge alert-success"}>In Stock</span> :
            <span className={"badge alert-warning"}>Out of Stock</span>
    }
    return (
        <div className="card">
            <div className="card-header name">
                {product.name}
            </div>
            <div className="card-body">
                {
                    needRedirect(redirect)
                }
                <ShowImage item={product} url="products"/>
                <p className={"lead mt-2"}>{product.description.substr(0, 100)}...</p>
                <p className={"black-10"}>$ {product.price}</p>
                <p className={"black-9"}>Category: <b>{product.category && product.category.name ? product.category.name :
                    <p>None</p>}</b>
                </p>
                <p className={"black-8"}>Listed on: {moment(product.createdAt).fromNow()}</p>
                {
                    showInStock(product.quantity)
                }
                <br/>
                {
                    showProductButton(displayViewProductButton)
                }
                {
                    showCartButton(showAddToCart)
                }
            </div>
        </div>
    )
}

export default Card
