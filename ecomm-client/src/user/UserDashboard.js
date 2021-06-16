import React from 'react'
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth/user"
import {withStyles} from '@material-ui/core/styles';

import {Paper, TableHead, TableRow, TableCell, TableBody, Table} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const UserDashboard = (props) => {
    const {classes} = props;
    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <div className="card mb-5">
                        <h3 className="card-header">User Information</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Name
                            </li>
                            <li className="list-group-item">
                                Email
                            </li>
                            <li className="list-group-item">
                                Role
                            </li>
                        </ul>
                    </div>

                    <div className="card">
                        <h3 className="card-header">Purchase History</h3>
                        <ul className="list-group">
                            <li className="list-group-item">History</li>
                        </ul>
                    </div>
                </Table>
            </Paper>
        </>
    )
}

export default withStyles(styles)(UserDashboard);
