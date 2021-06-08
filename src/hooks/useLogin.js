import { useState } from 'react'
import axios from 'axios';

const useLogin = ({ url, setAuthToken }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [triedLogin, setTriedLogin] = useState(false);

    const tryLogin = (username,password) => {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        setTriedLogin(true);
        const requstConfig =  { auth:{ "username" : username, "password" : password } };
        axios.get(url, requstConfig).then((response) => {
            setAuthToken(response.data.token);
            setLoading(false);
        }, (error) => {
            setLoading(false);
            setError(true);
            setErrorMessage(error.response.data['message']);
      });
    };

    return { triedLogin, tryLogin, loading, error, errorMessage };
}

export default useLogin
