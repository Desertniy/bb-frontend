
import React, {useContext, useEffect, useState} from "react";

import async from "async";
import Header from "../components/header/Header";
import MainBody from "../components/body/MainBody";
import CustomModal from "../components/modalLogin/CustomModal";
import CustomInput from "../components/Modules/CustomInput/CustomInput";
import Button from "../components/Modules/Button/Button";
import LoginService from "../routeService/LoginService";
import {AuthContext} from "../context/AuthContext";
import Registration from "../components/auth/registration/Registration";
import Login from "../components/auth/login/Login";
import CardBet from "../components/cardBet/CardBet";

function MainPage() {
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegistration, setModalRegistration] = useState(false)
    const [eventsNew, setEventsNew] = useState([{}])

    async function fetchAllEvents(){
        try {
            const response = await LoginService.getAllEvents();
            return response;
        } catch (error) {
            console.error("Ошибка при получении событий: ", error);
        }
    }

    useEffect(() => {
        fetchAllEvents().then(data => {
            if (data !== null){
                setEventsNew(data)
            }
        });
    }, []);

    return (
        <div>
            <Header setModalLogin={setModalLogin} setModalRegistration={setModalRegistration}/>
            <MainBody events={eventsNew}/>
            <Login modalLogin={modalLogin} setModalLogin={setModalLogin}/>
            <Registration modalRegistration={modalRegistration} setModalRegistration={setModalRegistration}/>
        </div>
    );
}

export default MainPage;
