import React, {useEffect, useState} from 'react'
import Layout from "./Layout";
import {getProducts} from "./apiCore";
import Card from './cards/Card'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState()

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
                console.log(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
                console.log(data)
            }
        })
    }

    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, [])

    return (
        <>
            <Layout title="eComm Web" description="E-commerce web platform developed using MERN stack"/>
            <div className="container-fluid mt-2">
                <h2 className="mb-4"> Popular Now</h2>
                <div className="row">
                    {
                        productsBySell.map((product, i) => (
                            <Card key={i} product={product}></Card>
                        ))
                    }
                </div>
                <hr/>
                <h2 className="mb-4">New Arrival</h2>
                <div className="row">
                    {
                        productsByArrival.map((product, i) => (
                            <Card key={i} product={product}></Card>
                        ))
                    }
                </div>
            </div>
        </>

    )
}

export default Home
