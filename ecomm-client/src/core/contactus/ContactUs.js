import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {emailContactForm} from '../../actions/form'
import {Grid, TextareaAutosize, TextField, Paper, Container} from '@material-ui/core'
import {TextFieldsSharp} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '10px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ContactUs = () => {
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <h4 className="text-align-center justify-content-center mt-2 mb-2">Contact Information</h4>
                <hr/>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>
                                    <TextField style={{width: '40vw'}} variant="outlined"
                                               margin="normal"
                                               label="Name"
                                               name="name"
                                               fullwidth={"true"}
                                               autoFocus/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>
                                    <TextField style={{width: '40vw'}}
                                               variant="outlined"
                                               margin="normal"
                                               label="Email"
                                               name="email"
                                               fullwidth={"true"}
                                               autoFocus/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <TextareaAutosize style={{width: '60vw', height: '70px'}} variant="outlined"
                                                      margin="auto"
                                                      label="Message"
                                                      placeholder={"Leave a Message"}
                                                      name="message"
                                                      fullwidth={"true"}
                                                      autoFocus/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </form>
                </Container>

            </div>
        </React.Fragment>
    )
}

export default ContactUs
