import React, {useEffect, useState} from 'react'
import Layout from "./Layout";
import {getProducts} from "./apiCore";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState()
    const [productsByArrival, setProductsByArrival] = useState()
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

            {
                JSON.stringify(productsByArrival)
            }
            <hr/>
            {
                JSON.stringify(productsBySell)
            }

        </>

    )
}

export default Home
