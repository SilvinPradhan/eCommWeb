import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import SignUp from "../user/signup";
import SignIn from "../user/signin";
import Home from "../core/Home";
import Header from "../core/Header";

const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
