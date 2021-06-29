import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import ShowImage from "./ShowImage";

const Card = ({product}) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">
                    {product.name}
                </div>
                <div className="card-body">
                    <ShowImage item={product} url="products"/>
                    <p>{product.description.substring(0, 100)}...</p>
                    <p>$ {product.price}</p>
                    <Link to={"/"}>
                        <Button variant="contained" color="secondary">View Product</Button>
                    </Link>
                    <Link to={"/"}>
                        <Button variant="contained" color="secondary"><FontAwesomeIcon
                            icon={faCartPlus}></FontAwesomeIcon> Cart</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card
