import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useGetData = ({ url, params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onResponseError = (error) => {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data['message']);
    };

    const getData = useCallback(() => {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        axios.get(url, { 'params' : params }).then((response) => {
          setData(response.data);
          setLoading(false);
        }, onResponseError);
    }, [url, params])

    useEffect(() => {
      getData();
    },[getData]);

    return { data, getData, loading, error, errorMessage };
}

export default useGetData
