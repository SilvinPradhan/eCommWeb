import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({product, displayViewProductButton = true}) => {
    product.createdAt = undefined;
    const showProductButton = (displayViewProductButton) => {
        return displayViewProductButton && (
            <Link to={`/product/${product._id}`} className={"mr-2 list-unstyled"}>
                < Button variant="contained" color="secondary">View Product</Button>
            </Link>
        )
    }

    const showCartButton = () => {
        return <Link to={"/"} className="list-unstyled">
            <Button variant="contained" color="secondary"><FontAwesomeIcon
                icon={faCartPlus}></FontAwesomeIcon>{' '} Cart</Button>
        </Link>
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
                    showCartButton()
                }
            </div>
        </div>
    )
}

export default Card
