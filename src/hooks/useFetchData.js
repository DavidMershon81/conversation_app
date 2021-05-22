import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = ({ getUrl, postUrl }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getDataInternal = () => {
      setLoading(true);
      setError(false);
      axios.get(getUrl).then((response) => {
        setData(response.data);
        setLoading(false);
      }, (error) => {
        setLoading(false);
        setError(true);
      });
    };
    const getData = useCallback(getDataInternal, [getUrl])

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
