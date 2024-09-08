import axios from "axios";


export default class LoginService {
    static async login(daata) {
        try {
            const response = await axios.post('http://127.0.0.1:9090/api/auth/login', daata)
            if (response.status !== 202) {
                return null
            }
            return response.data
        } catch (e) {
            return null
        }
    }

    static async fetchCountriesFromBackend() {
        try {
            const response = await axios.get('http://127.0.0.1:9090/country/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            return null;
        }
    }

    static async registrationUser(user) {
        try {
            const response = await axios.post('http://127.0.0.1:9090/user/register', user);
            return response.data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            return null;
        }
    }

    static async getNewInfoAboutUser(token) {
        try {
            const response = await axios.get('http://127.0.0.1:9090/user/information', {
                headers: {
                    'Authorization': `${token}`
                }
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async getAllEvents() {
        try {
            const response = await axios.get('http://127.0.0.1:9090/event/all');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    static async addBetForEvent(EventInformation){
        try {
            const response = await axios.post('http://127.0.0.1:9090/event/addBet',
                EventInformation,
                {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        }
        catch (e) {
            return null;
        }
    }

    static async addEvent(EventInformation){
        try {
            const response = await axios.post('http://127.0.0.1:9090/event/addEvent',
                EventInformation,
                {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        }
        catch (e) {
            return null;
        }
    }

    static async deleteEvent(EventInformation){
        try {
            const response = await axios.post('http://127.0.0.1:9090/event/deleteEvent',
                EventInformation,
                {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        }
        catch (e) {
            return null;
        }
    }
}
