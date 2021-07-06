import usePostData from  '../hooks/usePostData';
import RegisterUserForm from './RegisterUserForm';
import { LoadingBox } from './MiscControls';

const RegisterView = () => {
    const onConfirm = () => {
        console.log("confirmed registration!")
    };

    const { post:postUser, confirmMessage, loading, error, errorMessage } = usePostData({ 
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
