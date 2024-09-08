import './App.css';
import MainPage from "./pages/mainPage";
import {AuthContext} from "./context/AuthContext";
import {useEffect, useState} from "react";
import LoginService from "./routeService/LoginService";

function App() {

    const [isAuth, setIsAuth] = useState(localStorage.getItem('token'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [balance, setBalance] = useState(localStorage.getItem('balance'))
    const [userRole, setUserRole] = useState(localStorage.getItem('role'))
    const newInformationAboutUser = async () => {
        try {
            return await LoginService.getNewInfoAboutUser(localStorage.getItem('token'));

        } catch (error) {
            console.error('Error registration user:', error);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token') !== null){
            newInformationAboutUser().then(data => {
                if (data === null){
                    setUsername(null)
                    setBalance(null)
                    setIsAuth(null)
                    setUserRole(null)
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('balance')
                    localStorage.removeItem('role')
                    return
                }
                setUsername(data.username)
                setBalance(data.balance)
                setIsAuth(data.token)
                setUserRole(data.idRole)
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('balance', data.balance)
                localStorage.setItem('role', data.idRole)
            });
        }
    }, []);
    return (
        <div>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                username,
                setUsername,
                balance,
                setBalance,
                userRole,
                setUserRole
            }}>
                <MainPage/>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
