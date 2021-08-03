import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {emailContactForm} from '../../actions/form'
import {Container, Grid, Input, TextareaAutosize, TextField} from '@material-ui/core'
import {TextFieldsSharp} from "@material-ui/icons";

const ContactUs = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <div className={'contact'}>
                <h4>Contact Information</h4>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <Container>
                        <Grid xs={"12"} md={"6"}>
                            <TextField variant="outlined"
                                       margin="normal"
                                       label="Name"
                                       name="name"
                                       fullWidth
                                       autoFocus/>
                        </Grid>
                    </Container>
                    <Container>
                        <Grid xs={"12"} md={"6"}>
                            <TextField variant="outlined"
                                       margin="normal"
                                       label="Email"
                                       name="email"
                                       fullWidth
                                       autoFocus/>
                        </Grid>
                    </Container>
                    <Container>
                        <Grid xs={"12"} md={"12"}>
                            <TextareaAutosize style={{width: '60vw', height: '50px'}} variant="outlined"
                                              margin="normal"
                                              label="Message"
                                              placeholder={"Leave a Message"}
                                              name="message"
                                              fullWidth
                                              autoFocus/>
                        </Grid>
                    </Container>

                </form>
            </div>
        </React.Fragment>
    )
}

export default ContactUs
