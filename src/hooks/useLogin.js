import { useState, useRef } from 'react'
import axios from 'axios';

const useLogin = ({ url, setLoggedInUser }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [triedLogin, setTriedLogin] = useState(false);

    const tryLogin = (username,password) => {
        const onLoginSuccess = (response) => {
            setLoggedInUser(username);
            setLoading(false);
        };

        const onLoginError = (error) => {
            setLoading(false);
            setError(true);
            setErrorMessage(error.response.data['message']);
        };

        setLoading(true);
        setError(false);
        setErrorMessage("");
        setTriedLogin(true);
        axios.get(url, { auth:{ "username" : username, "password" : password } }).then(onLoginSuccess, onLoginError);
    };

    return { triedLogin, tryLogin, loading, error, errorMessage };
}

export default useLogin
