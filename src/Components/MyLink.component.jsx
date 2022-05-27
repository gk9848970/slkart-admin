import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    link:{
        textDecoration:"none",
        color: "#999999",
        "&:hover":{
            color: "#404040",
        },
        padding:"1em",
        marginTop:"auto"
    }
});
const MyLink = (props) =>{
    const classes = useStyles();
    return(
    <Link to={props.to} className={classes.link}>{props.children}</Link>
)}
export default MyLink