import React from 'react';
import classes from "../category/Category.module.css";

const Category = () => {
    return (
        <div className={classes.Category}>
            <div className={classes.Wrap}>
                <h3 className={classes.H3Name}>Категории</h3>
                <div className={classes.AList}>
                    <a href="">Футбол</a>
                    <a href="">Баскетбол</a>
                    <a href="">Волейбол</a>
                </div>
            </div>
        </div>
    );
};

export default Category;