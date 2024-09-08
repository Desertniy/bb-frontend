import React, {useEffect, useState} from 'react';
import CustomModal from "../modalLogin/CustomModal";
import LoginService from "../../routeService/LoginService";
import classes from "../modalsForBet/DeleteEventModal.module.css";
import Button from "../Modules/Button/Button";
import CustomInput from "../Modules/CustomInput/CustomInput";

const DeleteEventModal = ({visible, setVisible}) => {
    const [events, setEvents] = useState('')
    const [userEvent, setUserEvent] = useState('')
    const [line, setLine] = useState('')
    async function fetchAllEvents(){
        try {
            return await LoginService.getAllEvents();
        } catch (error) {
            console.error("Ошибка при получении событий: ", error);
        }
    }

    async function deleteEvent(){
        const event = {
            idEvent: userEvent.event.idEvent,
            nameLine: line
        }
        try {
            return await LoginService.deleteEvent(event);
        } catch (error) {
            console.error("Ошибка при получении событий: ", error);
        }
    }

    useEffect(() => {
        fetchAllEvents().then(data => {
            if (data !== null){
                setEvents(data)
                setUserEvent(data[0])
            }
        });
    }, []);


    return (
        <CustomModal visible={visible} setVisible={setVisible}>
            <select className={classes.selectStyle} onChange={e => {
                const selectedCountry = events.find(event => event.event.nameEvent === e.target.value);
                setUserEvent(selectedCountry)
            }}>
                {events
                    ? events.map((event) => (
                        <option key={event.event.idEvent} value={event.event.nameEvent}>{event.event.nameEvent}</option>))
                    : <option key={0} value='Fail'></option>
                }
            </select>
            <CustomInput value={line} onChange={e => setLine(e.target.value)} placeholder="Введите название линии"/>
            <Button onClick={() => deleteEvent()}>Удалить</Button>
        </CustomModal>
    );
};

export default DeleteEventModal;