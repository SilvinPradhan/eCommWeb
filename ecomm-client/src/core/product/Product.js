import React, {useEffect, useState} from 'react'
import {Card, CardHeader, CardContent} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout";
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
            <Layout title={"Product Item"} description={"Product details below:"}/>
            <h3 className={"mb-4"} s>Single Product</h3>
            <div className={"row"}>
                {JSON.stringify(product)}
            </div>
        </>
    )
}

export default Product
