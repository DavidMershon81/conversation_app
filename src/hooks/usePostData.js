import { useEffect } from 'react'
import axios from 'axios';
import { useMutation } from 'react-query';

const usePostData = ({ url, onConfirm, confirmText }) => {
    const postData = async (dataToPost) => {
        try {
            const res = await axios.post(url, dataToPost);
            return res.data;
        }catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(postData);
    const confirmMessage = isSuccess ? confirmText : null;

    useEffect(() => {
        if(isSuccess && onConfirm) {
            onConfirm();
        }
    }, [onConfirm, isSuccess])

    const errorMessage = error ? error.message : "";
    return { post:mutate, responseData:data, loading:isLoading, error:isError, confirmMessage, errorMessage:errorMessage  };
}

export default usePostData;
