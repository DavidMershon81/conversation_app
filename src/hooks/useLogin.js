import { useEffect } from 'react'
import axios from 'axios';
import { useMutation } from 'react-query';

const useLogin = ({ url, setLoggedInUser }) => {
    const postData = async ({ username, password}) => {
        try {
            const res = await axios.get(url, { auth:{ "username" : username, "password" : password } });
            return res.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(postData);

    useEffect(() => {
        if(isSuccess) {
            setLoggedInUser(data.username);
        }
    }, [isSuccess, data, setLoggedInUser])

    const tryLogin = ({ username, password }) => {
        mutate({ username, password });
    }

    const errorMessage = error ? error.message : "";
    return { tryLogin, success:isSuccess, loading:isLoading, error:isError, errorMessage:errorMessage };
}

export default useLogin;
