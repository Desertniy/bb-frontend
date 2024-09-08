import React from 'react';
import classes from "../Button/Button.module.css";

const Button = ({onClick, children, ...props}) => {
    return (
        <input type="button" onClick={onClick} value={children} className={classes.MyButton}/>
    );
};

export default Button;