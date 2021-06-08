import useFetchData from  './useFetchData'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const useFetchDataAuth = ({ url, getRequestParams }) => {
    const { authToken } = useContext(AppContext);
    return useFetchData({ url:url, getRequestParams:getRequestParams, authToken:authToken });
};

export default useFetchDataAuth;