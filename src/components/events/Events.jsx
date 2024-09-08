import React, {useContext} from 'react';
import classes from "./Events.module.css";
import Event from "../Modules/Event/Event";
import {AuthContext} from "../../context/AuthContext";

const Events = ({events}) => {
    return (
        <div className={classes.Events}>
            {events.length === 0
                ? <h1>Событий нет</h1>
                : events.map((event) =>
                    event && event.event ? <Event key = {event.event.idEvent} event={event}/> : null
                )
            }
        </div>
    );
};

export default Events;