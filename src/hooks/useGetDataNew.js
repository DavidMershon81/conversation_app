import { useQuery } from 'react-query';
import axios from 'axios';

const useGetDataNew = ({ url, params }) => {
    const fetchData = async (url, params) => {      
        console.log("fetching data from url: "+ url);
        const res = await axios.get(url, { 'params' : params });
        return res.data;
    }

    const { data, isLoading, isError, error } = useQuery(['data', url], () => fetchData(url, params));
    return { data, loading:isLoading, error:isError, errorMessage:error };
}

export default useGetDataNew
