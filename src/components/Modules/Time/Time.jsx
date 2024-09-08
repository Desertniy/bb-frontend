import React, {useEffect, useState} from 'react';
import classes from "../Time/Time.module.css";

const Time = () => {
    const [timeNow, setTimeNow] = useState(new Date())
    useEffect(() => {
        setTimeNow(new Date())
    }, [timeNow]);
    return (
        <span className={classes.Time}>{timeNow.toLocaleTimeString()}</span>
    );
};

export default Time;