import React, {useState, useEffect} from 'react'
import Layout from "../Layout";
import Card from "../cards/Card";

const Shop = () => {
    return (
        <>
            <Layout title="Shop Deals" description={"All of the new arrivals and products!"}
                    className={"container-fluid"}/>
            <div className="row">
                <div className="col-4">
                    Left SideBar
                </div>
                <div className="col-8">
                    Right SideBar
                </div>
            </div>
        </>
    )
}

export default Shop
