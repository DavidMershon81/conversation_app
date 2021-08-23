import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import useGetDataBase from './useGetDataBase';

const useGetData = ({ url, params, logout=false }) => {
    const { setLogout } = useContext(AppContext);
    
    return useGetDataBase({ url:url, params:params, logout:logout, setLogout:setLogout });
}

export default useGetData;
