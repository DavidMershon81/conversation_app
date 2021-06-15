import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios';

const useGetData = ({ url, params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const isMounted = useRef(true);

    const onResponseError = (error) => {
      if(isMounted.current) {
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data['message']);
      }
    };

    const getData = useCallback(() => {
      if(isMounted.current) {
        setLoading(true);
        setError(false);
        setErrorMessage("");
      }
      
      axios.get(url, { 'params' : params }).then((response) => {
        if(isMounted.current) {
          setData(response.data);
          setLoading(false);
        }
        }, onResponseError);
    }, [url, params])

    useEffect(() => {
      getData();

      return () => {
        isMounted.current = false;
      };
    },[getData]);

    return { data, getData, loading, error, errorMessage };
}

export default useGetData
