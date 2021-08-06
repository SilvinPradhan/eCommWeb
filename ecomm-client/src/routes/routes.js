import React from 'react'
import {
    BrowserRouter, Switch, Route,
} from "react-router-dom";
import SignUp from "../user/signup";
import SignIn from "../user/signin";
import Home from "../core/Home";
import Header from "../core/Header";
import Footer from "../core/footer/Footer"
import ContactUs from "../core/contactus/ContactUs"
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
import PageNotFound from "../404/PageNotFound";

// Google Analytics
import useGaTracker from "../google-analytics/ga";

const Routes = () => {

    useGaTracker()

    return (
        <BrowserRouter>
            <ToastContainer/>
            <Header/>
            <Route render={({location}) => (
                <>
                    <Switch location={location}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/shop" exact component={Shop}/>
                        <Route path="/signin" exact component={SignIn}/>
                        <Route path="/signup" exact component={SignUp}/>
                        <Route path='/getintouch' exact component={ContactUs}/>
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

                        {/*<Route path={"*"} render={() => <div>Not Found</div>}/>*/}
                        <Route path={"*"} component={PageNotFound}/>

                    </Switch>
                </>
            )}/>
            <Footer/>

        </BrowserRouter>
    )
}

export default Routes
