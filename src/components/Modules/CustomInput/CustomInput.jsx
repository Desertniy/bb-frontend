import React from 'react';
import classes from "./CustomInput.module.css";

const CustomInput = ({value, onChange, placeholder, requiredStatus}) => {
    return (
        <div className={classes.InputContainer}>
            <input className={classes.CustomInput} type="text" value={value} onChange={e=>onChange(e)} placeholder={placeholder} required/>
        </div>
    );
};

export default CustomInput;