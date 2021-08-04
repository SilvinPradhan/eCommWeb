import React, {useState} from 'react'
import {emailContactForm} from '../../actions/form'
import {Grid, TextareaAutosize, TextField, Paper, Container, Typography, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '50px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ContactUs = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        message: '',
        firstName: '',
        email: '',
        sent: false,
        buttonText: 'Send Message',
        success: false,
        error: ''
    });
    const {message, firstName, email, sent, buttonText, success, error} = values;

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values, buttonText: 'Sending...'});
        emailContactForm({firstName, email, message}).then(data => {
            if (data.error) {
                return setValues({...values, error: data.error});
            } else {
                return setValues({
                    ...values,
                    sent: true,
                    firstName: '',
                    email: '',
                    message: '',
                    buttonText: 'Sent',
                    success: data.success
                });
            }
        });
    }
    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message'});
    };

    const showSuccessMessage = () => success && <div className="alert alert-info">Thank you for contacting us.</div>;

    const showErrorMessage = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
                     className="mb-2 mt-2">
                    <h4>Contact Information</h4>
                    <h6> You must not be a ROBOT</h6>
                </div>
                <hr/>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>
                                    <TextField style={{width: '40vw'}} variant="outlined"
                                               margin="normal"
                                               label="Name"
                                               name="firstName"
                                               onChange={handleChange('firstName')}
                                               value={firstName}
                                               fullwidth={"true"}
                                               autoFocus
                                               required
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>
                                    <TextField style={{width: '40vw'}}
                                               variant="outlined"
                                               margin="normal"
                                               label="Email"
                                               name="email"
                                               onChange={handleChange('email')}
                                               value={email}
                                               fullwidth={"true"}
                                               autoFocus required/>
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
                                                      autoFocus
                                                      value={message}
                                                      onChange={handleChange('message')}
                                                      required/>
                                </Paper>
                            </Grid>
                            <Button variant="contained"
                                    color="primary"
                                    size={"large"}
                                    className={classes.button} type='submit'>{buttonText}
                            </Button>
                        </Grid>
                    </form>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ContactUs
