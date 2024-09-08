import React, {useEffect, useState} from 'react';
import CustomInput from "../../Modules/CustomInput/CustomInput";
import Button from "../../Modules/Button/Button";
import CustomModal from "../../modalLogin/CustomModal";
import classes from "./Registration.module.css";
import LoginService from "../../../routeService/LoginService";
const Registration = ({modalRegistration, setModalRegistration}) => {
    const [userName, setUserName] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userCountry, setUserCountry] = useState({});
    const [countries, setCountries] = useState([{}]);
    const [registationStatus, setRegistrationStatus] = useState(false);
    const [registrationException, setRegistrationException] = useState(false)
    const fetchData = async () => {
        try {
            return await LoginService.fetchCountriesFromBackend();
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };
    const registrationUser = async () => {
        const user = {
            username: userName,
            password: userPassword,
            idCountry: userCountry['idCountry']
        };
        if (userName == null || userPassword == null){
            setRegistrationException(true);
            return;
        }
        try {
            const userResult = await LoginService.registrationUser(user);
            if (userResult) {
                setRegistrationStatus(true);
            }

        } catch (error) {
            console.error('Error registration user:', error);
        }
    }
    useEffect(() => {
        fetchData().then(data => {
            setCountries(data);
            setUserCountry(data[0]);
            setRegistrationStatus(false);
            setRegistrationException(false);
        });
    },[]);

    return (
        <CustomModal visible={modalRegistration} setVisible={setModalRegistration}>
            <h2>Регистрация</h2>
            <CustomInput value={userName} onChange={e => setUserName(e.target.value)} placeholder="Введите логин" requiredStatus={true}/>
            <CustomInput value={userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="Введите пароль" requiredStatus={true}/>
            <select className={classes.selectStyle} onChange={e => {
                const selectedCountry = countries.find(country => country.nameCountry === e.target.value);
                setUserCountry(selectedCountry)}}>
                {countries
                    ? countries.map((country) => (
                        <option key={country.idCountry} value={country.nameCountry}>{country.nameCountry}</option>))
                    : <option key={0} value='Fail'></option>
                }
            </select>
            {registationStatus ? <p style={{marginBottom: 10}}>Вы успешно зарегистрировались</p> : null}
            {registrationException ? <p style={{marginBottom: 10}}>Некорректные данные</p> : null}
            <Button onClick={() => registrationUser()}>Зарегистрироваться</Button>
        </CustomModal>
    );
};

export default Registration;