import React, {useEffect, useState} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";
import {getProducts, deleteProduct} from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    const {user, token} = isAuthenticated()
    const LoadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const remover = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                LoadProducts()
            }
        })
    }
    useEffect(() => {
        LoadProducts()
    }, [])
    return (
        <>
            <Layout title={"Manage Products"} description={"Edit/Delete Products"} className={"container-fluid"}/>
            <div className={"row"}>
                <div className={"col-12"}>
                    <ul className={"list-group"}>
                        {
                            products.map((p, i) => {
                                return (
                                    <li key={i}
                                        className={"list-group d-flex justify-content-between align-items-center"}>
                                        <strong>{p.name}</strong>
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <span className={"badge alert-warning"}>
                                                Update
                                            </span>
                                        </Link>
                                        <span onClick={() => remover(p._id)} className={"badge alert-danger"}>
                                            Delete
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ManageProducts
