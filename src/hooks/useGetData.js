import { useQuery } from 'react-query';
import axios from 'axios';

const useGetData = ({ url, params, maxRetries=3, checkRetry=() => true }) => {
    const fetchData = async (url, params) => {      
        try {
            const res = await axios.get(url, { 'params' : params });
            return res.data;   
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    const onRetry = (failureCount, error) => {
        return checkRetry(error.message) && failureCount < maxRetries;
    }

    const { data, refetch, isLoading, isError, error } = useQuery(['data', url], () => fetchData(url, params), { retry:onRetry });
    const errorMessage = error ? error.message : "";
    return { data, getData:refetch, loading:isLoading, error:isError, errorMessage:errorMessage };
}

export default useGetData
