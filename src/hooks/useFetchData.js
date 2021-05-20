import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = (getUrl, addUrl) => {
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
      setLoading(true);
      setError(false);
      axios.post(addUrl, newData).then((response) => {
        setLoading(false);
        setData([...data, response.data]);
      }, (error) => {
        setLoading(false);
        setError(true);
      });
    };

    return { data, getData, addData, loading, error };
}

export default useFetchData
