import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout";
import Card from '../cards/Card'
import {read} from "../apiCore";

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')

    const singleProduct = (productId) => {
        read(productId).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        singleProduct(productId)
    }, [])

    return (
        <>
            <Layout title={`Product: '${product && product.name}'`}
                    description={`Description: ${product && product.description && product.description.substr(0, 100)}`}/>
            <div className={"row mr-2"}>
                <div className={"col-8"}>
                    {
                        product && product.description && (
                            <Card product={product} displayViewProductButton={false}
                                  className={"container container-fluid mt-2 mb-4"}/>
                        )
                    }
                </div>
                {/*{*/}
                {/*    JSON.stringify(product)*/}
                {/*}*/}
            </div>
        </>
    )
}

export default Product
