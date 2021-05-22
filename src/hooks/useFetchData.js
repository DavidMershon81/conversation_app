import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = ({ getUrl, postUrl, getParams }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getData = useCallback(() => {
      setLoading(true);
      setError(false);
      const getRequestConfig = { params : getParams };
      axios.get(getUrl, getRequestConfig && getRequestConfig).then((response) => {
        setData(response.data);
        setLoading(false);
      }, (error) => {
        setLoading(false);
        setError(true);
      });
    }, [getUrl, getParams])

    useEffect(() => {
      getData();
    },[getData]);

    const addData = (newData) => {
      postData(newData, (responseData) => {
        setData([...data, responseData]);
      });
    };

    const postData = (newData, onResponse) => {
      setLoading(true);
      setError(false);
      axios.post(postUrl, newData).then((response) => {
        setLoading(false);
        onResponse(response.data)
      }, (error) => {
        setLoading(false);
        setError(true);
      });
    }

    return { data, getData, postData, addData, loading, error };
}

export default useFetchData
