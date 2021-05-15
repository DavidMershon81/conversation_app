import { useState, useEffect } from 'react'
import axios from 'axios';

const useFetchData = (getUrl, addUrl) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const getData = () => {
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

      getData();
    },[getUrl]);

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

    return [ data, addData, loading, error ];
}

export default useFetchData
