import usePostData from  './usePostData'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const usePostDataAuth = ({ url }) => {
    const { authToken } = useContext(AppContext);
    return usePostData({ url:url, authToken:authToken });
};

export default usePostDataAuth;