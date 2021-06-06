import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = ({ getUrl, postUrl, getRequestParams, authToken }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userPassAuth, setUserPassAuth] = useState(null);

    const getData = useCallback(() => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      const getRequestConfig = { params : getRequestParams, auth : userPassAuth, headers: { 'Authorization' : authToken } };
      axios.get(getUrl, getRequestConfig).then((response) => {
        setData(response.data);
        setLoading(false);
      }, (error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data['message']);
      });
    }, [getUrl, getRequestParams, userPassAuth])

    useEffect(() => {
      getData();
    },[getData, userPassAuth, authToken]);

    const addData = (newData) => {
      postData(newData, (responseData) => {
        setData([...data, responseData]);
      });
    };

    const postData = (newData, onResponse) => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      const postRequestConfig = { auth : userPassAuth, headers: { 'Authorization' : authToken } };
      axios.post(postUrl, newData, postRequestConfig).then((response) => {
        setLoading(false);
        onResponse(response.data)
      }, (error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data);
      });
    }

    return { data, getData, postData, addData, setUserPassAuth, loading, error, errorMessage };
}

export default useFetchData
