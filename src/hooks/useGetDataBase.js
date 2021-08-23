import { useQuery } from 'react-query';
import axios from 'axios';

const getDataFromApi = async (url, params, logout) => {    
    if(logout) {
        throw new Error('Not logged in!');
    }
    
    try {
        return (await axios.get(url, { 'params' : params })).data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

const useGetDataBase = ({ url, params, logout=false, setLogout=null }) => {
    
    const checkRetry = (errorMessage) => {
        const isLoggedIn = errorMessage !== "Not logged in!";
        if(!isLoggedIn && setLogout != null) {
            setLogout(true);
        }
        return isLoggedIn;
    }

    const onRetry = (failureCount, error) => {
        return checkRetry(error.message);
    }

    const { data, refetch, isLoading, isError, error } = useQuery([url, url, params, logout], () => getDataFromApi(url, params, logout), { retry:onRetry });
    const errorMessage = error ? error.message : "";
    return { data, getData:refetch, loading:isLoading, error:isError, errorMessage:errorMessage };
}

export default useGetDataBase;
