import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = ({ getUrl, postUrl, getRequestParams, authToken, requireAuth=true }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userPassAuth, setUserPassAuth] = useState(null);

    const buildRequestConfig = useCallback((params) => {
      const result = {};
      if(userPassAuth) {
        result.auth = userPassAuth;
      }
      if(authToken) {
        result.headers = { 'Authorization' : authToken };
      }
      if(params) {
        result.params = params
      }
      return result;
    }, [userPassAuth, authToken]);

    const clearLoadingErrorStates = () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
    };

    const onResponseError = (error) => {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data['message']);
    };

    const getData = useCallback(() => {
      clearLoadingErrorStates();
      const requstConfig = buildRequestConfig(getRequestParams);
      axios.get(getUrl, requstConfig).then((response) => {
        setData(response.data);
        setLoading(false);
      }, onResponseError);
    }, [getUrl, getRequestParams, buildRequestConfig])

    useEffect(() => {
      if(userPassAuth || authToken || !requireAuth) {
        getData();
      }
    },[getData, userPassAuth, authToken, requireAuth]);

    const addData = (newData) => {
      postData(newData, (responseData) => {
        setData([...data, responseData]);
      });
    };

    const postData = (newData, onResponse) => {
      clearLoadingErrorStates();
      const requstConfig = buildRequestConfig();
      axios.post(postUrl, newData, requstConfig).then((response) => {
        setLoading(false);
        onResponse(response.data)
      }, onResponseError);
    }

    return { data, getData, postData, addData, setUserPassAuth, loading, error, errorMessage };
}

export default useFetchData
