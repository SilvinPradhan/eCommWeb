import React, {useState} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";

const ManageProducts = () => {
    return (
        <>
            <Layout title={"Manage Products"} description={"Edit/Delete Products"} className={"container-fluid"}/>
            <div className={"row"}>
                ...
            </div>
        </>
    )
}

export default ManageProducts
