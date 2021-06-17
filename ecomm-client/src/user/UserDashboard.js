import React from 'react'
// import Layout from "../core/Layout";
import {isAuthenticated} from "../auth/user"
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom"
import {Paper} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserEdit, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import {faUserCheck} from "@fortawesome/free-solid-svg-icons/faUserCheck";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faUserLock} from "@fortawesome/free-solid-svg-icons/faUserLock";

const styles = theme => ({
    root: {},
    adminPaper: {
        padding: theme.spacing(2),
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.text.secondary,
    },
});

const UserDashboard = (props) => {

    const {classes} = props;

    const {user: {_id, username, email, role}} = isAuthenticated();
    const userLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className={"nav-link"} to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} aria-hidden={true}/>
                            Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className={"nav-link"} to="/profile/update">
                            <FontAwesomeIcon icon={faUserEdit} aria-hidden={true}/>
                            Update profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span
                            style={{fontSize: '16px', fontWeight: "bold"}}><FontAwesomeIcon icon={faUserCheck}
                                                                                            aria-hidden={true}/>
                            Name: </span> {username}
                    </li>
                    <li className="list-group-item">
                        <span style={{fontSize: '16px', fontWeight: "bold"}}><FontAwesomeIcon icon={faEnvelope}/> Email: </span>{email}
                    </li>
                    <li className="list-group-item">
                            <span style={{
                                fontSize: '16px',
                                fontWeight: "bold"
                            }}><FontAwesomeIcon
                                icon={faUserLock}/>Role : </span>{role === 1 ? 'Admin' : 'Registered user'}
                    </li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = () => {
        return (
            <div className="container mt-3">
                <div className="card mb-5">
                    <h3 className="card-header">Purchase History</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span style={{
                                fontSize: '16px',
                                fontWeight: "bold"
                            }}>History</span></li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-3">
            <Paper
                className={classes.adminPaper}
                style={{color: 'black', cursor: 'pointer', padding: 20}}
            >
                {' '}
                <FontAwesomeIcon icon={faUserEdit} aria-hidden={true}/>
                &nbsp; Welcome to your dashboard, &nbsp; <b>{username}</b>
            </Paper>
            <div className="row mt-4">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(UserDashboard);
