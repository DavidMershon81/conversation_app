import { useState, useEffect } from 'react'
import useGetData from  '../hooks/useGetData';
import usePostData from  '../hooks/usePostData';
import { useQueryClient } from 'react-query';

const useLoginInfo = () => {
    const queryClient = useQueryClient();
    const [enableLogin, setEnableLogin] = useState(true);
    const { data:loginData, getData:getLoginData, loading, error, errorMessage } = useGetData({ 
        url:'/api/get_current_user',
        queryKey:['login_info'],
        ignoreError:'Not logged in!'
        //checkRetry:(errorMessage) => { return errorMessage !== "Not logged in!"; }
    });
    
    const onLogoutConfirm = () => {
        console.log("onLogoutConfirm!");
        setEnableLogin(false);
    }

    const { post:logout } = usePostData({ 
        url:'/api/logout',
        onConfirm:onLogoutConfirm
    });

    const refreshAuth = () => {
        console.log('refreshAuth() - running...');
        setEnableLogin(true);
        getLoginData();
    }

    const loggedIn = enableLogin && loginData != null && 'user_email' in loginData;
    const loginInfo = loggedIn && loginData;
    console.log("loggedIn:" + loggedIn);
    return { loginInfo, loggedIn, logout, refreshAuth, loading, error, errorMessage };
}

export default useLoginInfo;
