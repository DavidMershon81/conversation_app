import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react'

const getDataFromApi = async (url, params, logout) => {    
    console.log('getDataFromApi() - url: ' + url);
    if(logout) {
        throw new Error('Not logged in!');
    }
    
    try {
        return (await axios.get(url, { 'params' : params })).data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

const useGetData = ({ url, params, logout=false, checkRetry = () => true }) => {
    const onRetry = (failureCount, error) => {
        //console.log("onRetry() - error.message:" + error.message);
        return checkRetry(error.message);
    }

    const { data, refetch, isLoading, isError, error } = useQuery([url, url, params, logout], () => getDataFromApi(url, params, logout), { retry:onRetry });
    const errorMessage = error ? error.message : "";
    return { data, getData:refetch, loading:isLoading, error:isError, errorMessage:errorMessage };
}

export default useGetData;
