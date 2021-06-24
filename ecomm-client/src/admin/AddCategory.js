import React, {useState} from 'react'
import {isAuthenticated} from "../auth/user"
import {Link} from 'react-router-dom'
import {Button, Container, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Layout from "../core/Layout";
import BG from '../static/images/categoryBG/bg.jpg'
import {createCategory} from './apiAdmin'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
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
    },
    button: {
        margin: theme.spacing(1),
    },
    back: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#ffffff'
    }
}));

const AddCategory = () => {

    const classes = useStyles();
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // Destructure User and Token from LocalStorage
    const {user, token} = isAuthenticated()
    const onSubmit = (e) => {
        e.preventDefault()
        setError('');
        setSuccess(true)
        //    request api to create category
        createCategory(user._id, token, {name}).then(data => {
            if (data.error) {
                setError(data.error)
                toast.error(`${data.error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setError('');
                setSuccess(true)
                setName('')
                toast.success(`New category, ${name} has been created!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })

    }
    const change = (e) => {
        setError('');
        setName(e.target.value)
    }

    const returnBack = () => (
        <>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={< FontAwesomeIcon icon={faArrowLeft} aria-hidden={true}/>}
            >
                <Link to="/admin/dashboard" className={classes.back}>Back</Link>
            </Button>
        </>
    )

    const NewCategoryForm = () => (
        <Container maxWidth="xl">
            <form
                className={classes.form}
                onSubmit={(e) => onSubmit(e)}
            >
                {/*<Card className={classes.root} variant="outlined">*/}
                {/*    <CardContent>*/}
                {/*        <Typography variant="h5" component="h2">*/}
                {/*            <i className="fas fa-user"></i> Add a Category.*/}
                {/*        </Typography>*/}
                {/*        <Typography className={classes.title} color="textSecondary" gutterBottom>*/}
                {/*            <span>Good Day, <b>{user.username}</b>, ready to create a new category?</span>*/}
                {/*        </Typography>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}

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
            <ToastContainer/>
            <Layout title={"Create New Category"}
                    description="Good Day, ready to create a new category?"/>
            <div className="row">
                <div className="col-md-8 offset-md-4">{NewCategoryForm()}</div>
                <div>
                    {returnBack()}
                </div>
            </div>
        </div>
    )
}

export default AddCategory
