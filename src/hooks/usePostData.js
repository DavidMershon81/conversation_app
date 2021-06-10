import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const usePostData = ({ url, authToken }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onResponseError = (error) => {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data['message']);
    };

    const postData = (newData, onResponse) => {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        const requstConfig = { 
            'headers' : {'Authorization' : authToken} 
        };
        axios.post(url, newData, requstConfig).then((response) => {
            setLoading(false);
            onResponse(response.data)
        }, onResponseError);
    }

    return { postData, loading, error, errorMessage };
}

export default usePostData
