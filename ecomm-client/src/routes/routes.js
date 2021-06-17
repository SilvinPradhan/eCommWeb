import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import SignUp from "../user/signup";
import SignIn from "../user/signin";
import Home from "../core/Home";
import Header from "../core/Header";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRoute";
import UserDashboard from "../user/UserDashboard";
import AdminDashboard from "../user/AdminDashboard";

const Routes = () => {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
                <PrivateRoute path={"/user/dashboard"} exact component={UserDashboard}/>
                <AdminRoute path={"/admin/dashboard"} exact component={AdminDashboard}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
