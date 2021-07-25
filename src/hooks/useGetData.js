import { useQuery } from 'react-query';
import axios from 'axios';

const useGetData = ({ url, queryKey, params, ignoreError, maxRetries=3, checkRetry=() => true }) => {
    const fetchData = async (url, params, ignoreError) => {    
        try {
            const res = await axios.get(url, { 'params' : params });
            return res.data;   
        } catch (error) {
            const errorMessage = error.response.data.message;
            const ignoreErrorDetected = errorMessage === ignoreError;
            //console.log("errorMessage: " + errorMessage + " | ignoreError: " + ignoreError + " | ignoreErrorDetected: " + ignoreErrorDetected);
            if(!ignoreErrorDetected) {
                throw new Error(errorMessage);
            }
        }
    }

    const onRetry = (failureCount, error) => {
        //console.log("onRetry() - failureCount:" + failureCount + " | error.message:" + error.message);
        return checkRetry(error.message) && failureCount < maxRetries;
    }

    const { data, refetch, isLoading, isError, error } = useQuery([queryKey, url, params, ignoreError], 
        () => fetchData(url, params, ignoreError), { retry:onRetry }
    );
    const errorMessage = error ? error.message : "";
    return { data, getData:refetch, loading:isLoading, error:isError, errorMessage:errorMessage };
}

export default useGetData
