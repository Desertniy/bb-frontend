import React, {useContext, useEffect, useState} from 'react';
import classes from "./Event.module.css"
import Button from "../Button/Button";
import CardBet from "../../cardBet/CardBet";
import {AuthContext} from "../../../context/AuthContext";
import CustomModal from "../../modalLogin/CustomModal";

const Event = ({event}) => {
    const {isAuth} = useContext(AuthContext)
    const [stateOfVisible, setStateOfVisible] = useState(false)
    const [coef1, setCoef1] = useState({})
    const [coef2, setCoef2] = useState({})
    const [draw, setDraw] = useState({})
    const [bet, setBet] = useState({})
    let teams = event.event.nameEvent.split(" ");

    useEffect(() => {
        if (event.lines) {
            event.lines.forEach((line) => {
                if (line.struct.nameLine === "П1") {
                    setCoef1(line)
                } else if (line.struct.nameLine === "П2") {
                    setCoef2(line)
                } else if (line.struct.nameLine === "Ничья") {
                    setDraw(line)
                }
            })
        }
    });


    const ClickEvent = (line, team) => {
        setBet({
            nameEvent: event.event.nameEvent,
            line: line,
            team: team
        })
        setStateOfVisible(true)
    }

    return (
        <div className={classes.EventCard}>
            <h3 className={classes.TypeSportName}>{event.type.nameType}</h3>
            <div className={classes.Event}>
                <div className={classes.EventName}>
                    <h3>{teams[0]}</h3>
                    <h3>{teams[1]}</h3>
                </div>
                <div className={classes.EventButtons}>
                    <div className={classes.EventButton}>
                        <Button onClick={() => ClickEvent(coef1, teams[0])}>{coef1.coef}</Button>
                    </div>
                    <div className={classes.EventButton}>
                        <Button onClick={() => ClickEvent(draw, "Ничья")}>{draw.coef}</Button>
                    </div>
                    <div className={classes.EventButton}>
                        <Button onClick={() => ClickEvent(coef2, teams[1])}>{coef2.coef}</Button>
                    </div>
                </div>
            </div>
            <div>
                <h3 className={classes.TypeSportName}>Время начала: {event.event.dateStartEvent}</h3>
            </div>
            {isAuth
                ? <CardBet visible={stateOfVisible} setVisible={setStateOfVisible} eventBet={bet} />
                : <CustomModal visible={stateOfVisible} setVisible={setStateOfVisible}>
                    <h1 style={{textAlign: "center"}}>Для ставки необходимо авторизоваться</h1>
                </CustomModal>
            }
        </div>
    );
};

export default Event;