//import usePostData from  '../hooks/usePostData';
import usePostDataNew from  '../hooks/usePostDataNew';

import RegisterUserForm from './RegisterUserForm';
import { LoadingBox } from './MiscControls';
//import axios from 'axios';
//import { useMutation } from 'react-query';


const RegisterView = () => {
    /*
    const onConfirm = () => {
        console.log("confirmed registration!")
    };

    const { post:postUser, confirmMessage, loading, error, errorMessage } = usePostData({ 
        url:'/api/users',
        onConfirm:onConfirm,
        confirmText:'Registered New Account!'
    });
    */

    /*
    const postData = async (dataToPost) => {
        const res = await axios.post('/api/users', dataToPost);
        return res.data;
    }
    const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(postData);
    const confirmMessage = isSuccess ? 'Registered New Account!' : null;
    */

    const onConfirm = () => {
        console.log("confirmed registration!")
    };

    const { post:postUser, confirmMessage, loading, error, errorMessage } = usePostDataNew({ 
        url:'/api/users',
        onConfirm:onConfirm,
        confirmText:'Registered New Account!'
    });

    return (
        <section>
            <h2>Register</h2>
            <p>Use this form to register a new account.</p>
            <RegisterUserForm onSubmit={postUser}/>
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default RegisterView
