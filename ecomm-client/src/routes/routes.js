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
import Orders from "../admin/Orders";
import Shop from '../core/shop/Shop'
import Product from '../core/product/Product'
import Profile from '../user/Profile'
import ManageProducts from "../admin/ManageProducts";
import UpdateProduct from "../admin/UpdateProduct";

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
                <AdminRoute path={"/admin/product/update/:productId"} exact component={UpdateProduct}/>
                <Route path={"/product/:productId"} exact component={Product}/>
                <Route path={"/cart"} exact component={Cart}/>
                <AdminRoute path={"/admin/orders"} exact component={Orders}/>
                <AdminRoute path={"/admin/manage"} exact component={ManageProducts}/>
                <PrivateRoute path={"/profile/:userId"} exact component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
