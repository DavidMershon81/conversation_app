import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = ({ getUrl, postUrl, getRequestParams, initAuth=null, requireAuth=true }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [requestAuth, setRequestAuth] = useState(initAuth);

    const getData = useCallback(() => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      const getRequestConfig = { params : getRequestParams, auth : requestAuth };
      axios.get(getUrl, getRequestConfig).then((response) => {
        setData(response.data);
        setLoading(false);
      }, (error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data);
      });
    }, [getUrl, getRequestParams, requestAuth])

    useEffect(() => {
      if(requestAuth || !requireAuth)
        getData();
    },[getData, requestAuth, requireAuth]);

    const addData = (newData) => {
      postData(newData, (responseData) => {
        setData([...data, responseData]);
      });
    };

    const postData = (newData, onResponse) => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      const postRequestConfig = { auth : requestAuth };
      axios.post(postUrl, newData, postRequestConfig).then((response) => {
        setLoading(false);
        onResponse(response.data)
      }, (error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data);
      });
    }

    return { data, getData, postData, addData, setRequestAuth, loading, error, errorMessage };
}

export default useFetchData
