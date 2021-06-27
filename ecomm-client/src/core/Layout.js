import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../static/images/cards/homepage.png'
import Typography from '@material-ui/core/Typography';
import '../style.css'

const useStyles = makeStyles({
    root: {},
    media: {
        height: 360,
    },
});

export default function Layout({title = "Title", description = "Description", className, children}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={Logo}
                    title="Shopping Deals"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/*<Button size="small" color="primary">*/}
                {/*    Share*/}
                {/*</Button>*/}
                {/*<Button size="small" color="primary">*/}
                {/*    Learn More*/}
                {/*</Button>*/}
            </CardActions>
        </Card>
    );
}
