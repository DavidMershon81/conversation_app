import useGetDataBase from  './useGetDataBase';
import { useState } from 'react';

const useGetAuthData = () => {
    const [ logout, setLogout ] = useState(false);
    const { data:authData, getData:getAuthData, loading, error, errorMessage } = useGetDataBase({ 
        url:'/api/get_current_user',
        logout:logout
    });

    const loggedIn = authData != null && 'user_email' in authData;
    
    const refreshAuth = () => {
        setLogout(false);
        getAuthData();
    }
    return { authData, refreshAuth, loggedIn, setLogout, loading, error, errorMessage };
}

export default useGetAuthData;