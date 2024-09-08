import React, {useContext, useState} from 'react';
import CustomInput from "../../Modules/CustomInput/CustomInput";
import Button from "../../Modules/Button/Button";
import CustomModal from "../../modalLogin/CustomModal";
import LoginService from "../../../routeService/LoginService";
import {AuthContext} from "../../../context/AuthContext";

const Login = ({setModalLogin, modalLogin}) => {
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const {setIsAuth} = useContext(AuthContext)
    const {setUsername} = useContext(AuthContext)
    const {setBalance} = useContext(AuthContext)
    const {setUserRole} = useContext(AuthContext)
    const [loginStatus, setLoginStatus] = useState(false)
    async function fetchLogin(){
        const user = {
            username: userLogin,
            password: userPassword
        }
        const res = await LoginService.login(user)
        if (res != null){
            setBalance(res.balance)
            setUsername(res.username)
            setIsAuth(res.token)
            setUserRole(res.idRole)
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', res.username)
            localStorage.setItem('balance', res.balance)
            localStorage.setItem('id', res.idUser)
            localStorage.setItem('role', res.idRole)
            setModalLogin(false)
            setUserLogin('')
            setUserPassword('')
        }
        else {
            setLoginStatus(true)
        }

    }

    return (
        <CustomModal visible={modalLogin} setVisible={setModalLogin}>
            <h2>Авторизация</h2>
            <CustomInput value = {userLogin} onChange={e => setUserLogin(e.target.value)} placeholder="Введите логин"/>
            <CustomInput value = {userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="Введите пароль"/>
            <Button onClick={()=>
                fetchLogin()
            }>Войти</Button>
            {loginStatus ? <p style={{marginBottom: 10, marginTop: 10}}>Некорректные данные</p> : null}
        </CustomModal>
    );
};

export default Login;