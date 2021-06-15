import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Link, withRouter, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faUserPlus, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const drawerWidth = 170;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    hide: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    linkstyle: {
        textDecoration: 'none',
        color: '#edf2fb',
    },
    menuText: {
        marginRight: 18,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#006BA6',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

const Header = ({history}) => {
    const classes = useStyles();
    const theme = useTheme();
    // let history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        console.log(open);
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    }

    function isActive(history, path) {
        if (history.location.pathname === path) {
            return {color: '#ffd391'}
        } else {
            return {color: '#fff'}
        }
    }

    const guestLink = (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <div className={classes.sectionMobile}>
                        {/* <div className={classes.root} /> */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={open}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? (
                                        <ChevronLeftIcon/>
                                    ) : (
                                        <ChevronRightIcon/>
                                    )}
                                </IconButton>
                            </div>
                            <Divider/>
                            <List>
                                <ListItem button>
                                    <Typography className={classes.menuText}>
                                        <Link to="/questions" className={classes.linkstyle}>
                                            <FontAwesomeIcon icon={faShoppingBag} aria-hidden={true}/>  &nbsp;
                                            <span>Ecomm</span>{' '}
                                        </Link>
                                    </Typography>
                                </ListItem>
                                <ListItem button>
                                    <Typography className={classes.menuText}>
                                        <Link to="/signup" className={classes.linkstyle}>
                                            {' '}
                                            <FontAwesomeIcon icon={faUserPlus} aria-hidden={true}/>  &nbsp;
                                            <span>Sign Up</span>{' '}
                                        </Link>
                                    </Typography>
                                </ListItem>
                                <ListItem button>
                                    <Typography className={classes.menuText}>
                                        <Link to="/signin" className={classes.linkstyle}
                                        >
                                            {' '}
                                            <FontAwesomeIcon icon={faSignInAlt} aria-hidden={true}/> &nbsp;
                                            <span>Sign In</span>{' '}
                                        </Link>
                                    </Typography>
                                </ListItem>
                            </List>
                            <Divider/>
                        </Drawer>
                    </div>
                    <Typography variant="h5" className={classes.title}>
                        <Link to="/" className={classes.linkstyle}>
                            {/*<FontAwesomeIcon icon={faShoppingBag} aria-hidden={true}/>{' '}*/}
                            eComm
                        </Link>
                    </Typography>
                    <div className={classes.sectionDesktop}>
                        <Typography className={classes.menuText}>
                            <Link to="/questions" className={classes.linkstyle}>
                                <i className="fa fa-book" aria-hidden="true"></i>
                                <span>Explore</span>{' '}
                            </Link>
                        </Typography>

                        <Typography className={classes.menuText}>
                            <Link to="/signup" className={classes.linkstyle}
                                  style={isActive(history, '/signup')}>
                                {' '}
                                <FontAwesomeIcon icon={faUserPlus} aria-hidden={true}/>  &nbsp;
                                <span>Sign Up</span>{' '}
                            </Link>
                        </Typography>

                        <Typography className={classes.menuText}>
                            <Link to="/signin" className={classes.linkstyle} style={isActive(history, '/signin')}>
                                {' '}
                                <FontAwesomeIcon icon={faSignInAlt} aria-hidden={true}/>  &nbsp;
                                <span>Sign In</span>{' '}
                            </Link>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
    const authlink = (
        <AppBar position="static" style={{background: 'primary'}}>
            <Toolbar>
                <div className={classes.sectionMobile}>
                    {/* <div className={classes.root} /> */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? (
                                    <ChevronLeftIcon/>
                                ) : (
                                    <ChevronRightIcon/>
                                )}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <Typography className={classes.menuText}>
                                    <Link to="/questions" className={classes.linkstyle}>
                                        <i className="fa fa-book" aria-hidden="true"></i>
                                        <span>Explore</span>{' '}
                                    </Link>
                                </Typography>
                            </ListItem>
                            <ListItem button>
                                <Typography className={classes.menuText}>
                                    <Typography className={classes.menuText}>
                                        {/*    Profile goes here*/}
                                    </Typography>
                                </Typography>
                            </ListItem>
                            <ListItem button>
                                <Typography className={classes.menuText}>
                                    <a href="/" className={classes.linkstyle}>
                                        <i className="fa fa-sign-out-alt"> </i>
                                        {'  '} <span>Sign Out</span>
                                    </a>
                                </Typography>
                            </ListItem>
                        </List>
                        <Divider/>
                    </Drawer>
                </div>
                <Typography className={classes.title} variant="h5" noWrap>
                    <Link to="/" className={classes.linkstyle}>
                        <i className="fas fa-users"></i> Collab
                    </Link>
                </Typography>
                <div className={classes.sectionDesktop}>
                    <Typography className={classes.menuText}>
                        <Link to="/questions" className={classes.linkstyle}>
                            <i className="fa fa-book" aria-hidden="true"></i>
                            <span>Explore</span>{' '}
                        </Link>
                    </Typography>
                    <Typography className={classes.menuText}>
                        {/*<Profile></Profile>*/}
                    </Typography>

                    <Typography className={classes.menuText}>
                        <a href="/" className={classes.linkstyle}>
                            <i className="fa fa-sign-out-alt"> </i>
                            {'  '} <span>Sign Out</span>
                        </a>
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );

    // if (isAuthenticated && !loading) {
    //     return <Fragment>{authlink}</Fragment>;
    // } else {
    //     return <Fragment> {guestLink}</Fragment>;
    // }
    return <>
        {guestLink}
    </>
};
Header.propTypes = {
    // logout: PropTypes.func.isRequired,
    // loadUser: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool,
};


export default withRouter(Header);
