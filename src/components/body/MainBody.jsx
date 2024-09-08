import React from 'react';
import Category from "../category/Category";
import Events from "../events/Events";
import classes from "./MainBody.module.css";

const MainBody = ({events}) => {
    return (
        <div className={classes.MainBody}>
            <Category/>
            <Events events={events}/>
        </div>
    );
};

export default MainBody;