import React, {useState} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from "react-router-dom";
import {Button, Card, CardHeader, Container, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Layout from "../core/Layout";
import BG from '../static/images/categoryBG/bg.jpg'
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    // root: {
    //     minWidth: 275,
    // },
    form: {
        width: '50%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#264653',
    },
    title: {
        fontSize: 14,
    },
    container: {
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: "100%"
    }
}));

const AddCategory = () => {

    const classes = useStyles();
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Destructure User and Token from LocalStorage
    const {user, token} = isAuthenticated()
    const onSubmit = (e) => {
        e.preventDefault()
        setError(false);
        setSuccess(true)
        //    request api to create category
    }
    const change = (e) => {
        setError(false);
        setName(e.target.value)
    }
    const NewCategoryForm = () => (
        <Container maxWidth="xl">
            <form
                className={classes.form}
                onSubmit={(e) => onSubmit(e)}
            >
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <i className="fas fa-user"></i> Add a Category.
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <span>Good Day, <b>{user.username}</b>, ready to create a new category?</span>
                        </Typography>
                    </CardContent>
                </Card>

                <TextField
                    variant="outlined"
                    margin="normal"
                    label="category"
                    fullWidth
                    autoFocus
                    name="New"
                    value={name}
                    onChange={(e) => {
                        change(e);
                    }}
                ></TextField>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create
                </Button>
            </form>
        </Container>
    )
    return (
        <div className={classes.container}>
            <div className="row">
                <div className="col-md-8 offset-md-4">{NewCategoryForm()}</div>
            </div>
        </div>
    )
}

export default AddCategory
