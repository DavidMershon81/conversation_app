import { useEffect } from 'react'
import axios from 'axios';
import { useMutation } from 'react-query';

const usePostDataNew = ({ url, onConfirm, confirmText }) => {
    const postData = async (dataToPost) => {
        const res = await axios.post(url, dataToPost);
        return res.data;
    }
    const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(postData);
    const confirmMessage = isSuccess ? confirmText : null;

    useEffect(() => {
        if(isSuccess && onConfirm) {
            onConfirm();
        }
    }, [onConfirm, isSuccess])


    return { post:mutate, responseData:data, loading:isLoading, error:isError, confirmMessage, errorMessage:error  };
}

export default usePostDataNew;
