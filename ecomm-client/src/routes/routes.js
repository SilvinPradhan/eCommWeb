import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import SignUp from "../user/signup";
import SignIn from "../user/signin";
import Home from "../core/Home";
import Header from "../core/Header";
import Cart from "../core/cart/Cart";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRoute";
import UserDashboard from "../user/UserDashboard";
import AdminDashboard from "../user/AdminDashboard";
import AddCategory from "../admin/AddCategory";
import AddProduct from "../admin/AddProduct";
import Shop from '../core/shop/Shop'
import Product from '../core/product/Product'

const Routes = () => {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
                <PrivateRoute path={"/user/dashboard"} exact component={UserDashboard}/>
                <AdminRoute path={"/admin/dashboard"} exact component={AdminDashboard}/>
                <AdminRoute path={"/create/category"} exact component={AddCategory}/>
                <AdminRoute path={"/create/product"} exact component={AddProduct}/>
                <Route path={"/product/:productId"} exact component={Product}/>
                <Route path={"/cart"} exact component={Cart}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
