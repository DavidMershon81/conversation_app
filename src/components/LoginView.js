import useLogin from  '../hooks/useLogin';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';

const LoginView = () => {
    const { authToken, setAuthToken } = useContext(AppContext);
    const { triedLogin, tryLogin, loading, error, errorMessage } = useLogin({ url:'/api/login', setAuthToken:setAuthToken});  

    const submitLogin = (formData) => {
        tryLogin(formData.email, formData.password);
    };

    return (
        <section>
            <h2>Login</h2>
            { !authToken && <LoginForm onSubmit={submitLogin}/> }
            { triedLogin && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            { authToken && <p>logged in.</p>}
        </section>
    );
}

export default LoginView
