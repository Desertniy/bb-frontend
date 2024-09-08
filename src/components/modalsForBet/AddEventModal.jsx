import React, {useState} from 'react';
import CustomModal from "../modalLogin/CustomModal";
import CustomInput from "../Modules/CustomInput/CustomInput";
import Button from "../Modules/Button/Button";
import LoginService from "../../routeService/LoginService";



const AddEventModal = ({visible, setVisible}) => {

    const [eventName, setEventName] = useState("");
    const [eventTime, setEventTime] = useState(null);
    const [eventType, setEventType] = useState(null);
    const [coefP1, setCoefP1] = useState(null);
    const [coefP2, setCoefP2] = useState(null);
    const [coefX, setCoefX] = useState(null);
    const [eventStatus, setEventStatus] = useState(null);

    const addEvent = async () => {
        const event = {
            nameEvent: eventName,
            dateStartEvent: eventTime,
            Type: eventType,
            coefP1: coefP1,
            coefP2: coefP2,
            coefDraw: coefX,
            status: eventStatus
        };
        try {
            const userResult = await LoginService.addEvent(event);
            setEventName('')
            setEventType('')
            setEventTime('')
            setCoefP1('')
            setCoefP2('')
            setCoefX('')
            setEventStatus('')

        } catch (error) {
            console.error('Error registration user:', error);
        }
    }

    return (
        <CustomModal visible={visible} setVisible={setVisible}>
            <CustomInput value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Введите название события"/>
            <CustomInput value={eventTime} onChange={e => setEventTime(e.target.value)} placeholder="Введите время начала"/>
            <CustomInput value={eventType} onChange={e => setEventType(e.target.value)} placeholder="Введите тип события"/>
            <CustomInput value={coefP1} onChange={e => setCoefP1(e.target.value)} placeholder="Введите коэффициент П1"/>
            <CustomInput value={coefP2} onChange={e => setCoefP2(e.target.value)} placeholder="Введите коэффициент П2"/>
            <CustomInput value={coefX} onChange={e => setCoefX(e.target.value)} placeholder="Введите коэффициент X"/>
            <CustomInput value={eventStatus} onChange={e => setEventStatus(e.target.value)} placeholder="Введите статус события"/>
            <Button onClick={() => addEvent()}>Добавить событие</Button>
        </CustomModal>
    );
};

export default AddEventModal;