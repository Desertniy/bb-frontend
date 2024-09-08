import React, {useContext, useEffect, useState} from 'react';
import classes from "../header/Header.module.css";
import Time from "../Modules/Time/Time";
import Button from "../Modules/Button/Button";
import {AuthContext} from "../../context/AuthContext";
import AddEventModal from "../modalsForBet/AddEventModal";
import DeleteEventModal from "../modalsForBet/DeleteEventModal";

const Header = ({setModalLogin, setModalRegistration}) => {
    const {isAuth, setIsAuth } = useContext(AuthContext)
    const {username, setUsername} = useContext(AuthContext)
    const {balance, setBalance} = useContext(AuthContext)
    const {userRole, setUserRole} = useContext(AuthContext)
    const [modalAddEvent, setModalAddEvent] = useState(false)
    const [modalDeleteEvent, setModalDeleteEvent] = useState(false)


    return (
        <div>
            <header className={classes.MainHeader}>
                <h2><span>Bet</span>Boom</h2>
                {isAuth
                    ? (<div className={classes.buttonsAndLogo}>
                        <div className={classes.nickAndBalance}>
                            <h3>{username} - {balance} ₽</h3>
                        </div>
                        <Button onClick={() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('username')
                            localStorage.removeItem('balance')
                            localStorage.removeItem('id')
                            localStorage.removeItem('role')
                            setUsername(null)
                            setBalance(null)
                            setIsAuth(null)
                            setUserRole(null)
                        }}>Выйти</Button>
                        {userRole === 2
                            ? <div>
                                <Button onClick={()=>setModalDeleteEvent(true)}>Убрать событие</Button>
                                <Button onClick={() => setModalAddEvent(true)}>Добавить событие</Button>
                            </div>
                            : null
                        }
                    </div>)
                    : (<div>
                        <Button onClick={() => setModalLogin(true)}>Войти</Button>
                        <Button onClick={() => setModalRegistration(true)}>Регистрация</Button>
                    </div>)
                }
                <AddEventModal visible={modalAddEvent} setVisible={setModalAddEvent}/>
                <DeleteEventModal visible={modalDeleteEvent} setVisible={setModalDeleteEvent}/>
            </header>
        </div>
    );
};

export default Header;