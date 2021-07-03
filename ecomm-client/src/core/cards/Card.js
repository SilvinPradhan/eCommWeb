import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import ShowImage from "./ShowImage";

const Card = ({product, displayViewProductButton = true}) => {
    const showProductButton = (displayViewProductButton) => {
        return displayViewProductButton && (
            <Link to={`/product/${product._id}`} className={"mr-2"}>
                < Button variant="contained" color="secondary">View Product</Button>
            </Link>
        )
    }

    return (
        <div className="card">
            <div className="card-header">
                {product.name}
            </div>
            <div className="card-body">
                <ShowImage item={product} url="products"/>
                <p className={"lead mt-2"}>{product.description.substr(0, 100)}...</p>
                <p className={"black-9"}>$ {product.price}</p>
                <p className={"black-8"}>Category: <b>{product.category && product.category.name ? '' : 'None'}</b></p>
                {
                    showProductButton(displayViewProductButton)
                }
                <Link to={"/"}>
                    <Button variant="contained" color="secondary"><FontAwesomeIcon
                        icon={faCartPlus}></FontAwesomeIcon> Cart</Button>
                </Link>
            </div>
        </div>
    )
}

export default Card
