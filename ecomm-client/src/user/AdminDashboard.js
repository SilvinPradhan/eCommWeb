import React from 'react'
// import Layout from "../core/Layout";
import {isAuthenticated} from "../auth/user"
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom"
import {Paper} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserEdit, faUserTie} from "@fortawesome/free-solid-svg-icons";

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

const AdminDashboard = (props) => {

    const {classes} = props;

    const {user: {_id, username, email, role}} = isAuthenticated();
    const adminLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">Admin Links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className={"nav-link"} to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className={"nav-link"} to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span style={{fontSize: '16px', fontWeight: "bold"}}>Name: </span> {username}
                    </li>
                    <li className="list-group-item">
                        <span style={{fontSize: '16px', fontWeight: "bold"}}>Email: </span>{email}
                    </li>
                    <li className="list-group-item">
                            <span style={{
                                fontSize: '16px',
                                fontWeight: "bold"
                            }}>Role : </span>{role === 1 ? 'Admin' : 'Registered user'}
                    </li>
                </ul>
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
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(AdminDashboard);
