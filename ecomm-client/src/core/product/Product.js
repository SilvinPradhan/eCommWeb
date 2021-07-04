import React, {useEffect, useState} from 'react'
import Layout from "../Layout";
import Card from '../cards/Card'
import {read, listRelated} from "../apiCore";

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState('')

    const singleProduct = (productId) => {
        read(productId).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                //    then fetch related product and display the products related to the single product item
                listRelated(productId).then((data) => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        singleProduct(productId)
    }, [props])

    return (
        <>
            <Layout title={`Product: '${product && product.name}'`}
                    description={`Description: ${product && product.description && product.description.substr(0, 100)}`}/>
            <div className={"row"}>
                <div className={"col-8"}>
                    {
                        product && product.description && (
                            <Card product={product} displayViewProductButton={false}
                                  className={"container container-fluid mt-2 mb-4"}/>
                        )
                    }
                </div>
                <div className={"col-4 mt-2"}>
                    <h5>Recommendations</h5>
                    <span>People who searched for this product also looked at these items below.</span>
                    {
                        relatedProduct.map((p, i) => (
                            <div className={"mb-4"}>
                                <Card key={i} product={p}/>
                            </div>
                        ))
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
